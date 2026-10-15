export type QueryResult = {
  columns: string[];
  rows: Array<Record<string, string | number>>;
  error?: string;
};

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  city: string;
};

type Projection =
  | { kind: 'column'; column: keyof Employee; label: string }
  | { kind: 'aggregate'; fn: 'COUNT' | 'SUM' | 'AVG' | 'MIN' | 'MAX'; column: keyof Employee | '*'; label: string };

const employees: Employee[] = [
  { id: 1, name: 'Анна Смирнова', role: 'Frontend-разработчик', department: 'Engineering', salary: 125000, city: 'Москва' },
  { id: 2, name: 'Михаил Иванов', role: 'Product Designer', department: 'Design', salary: 98000, city: 'Санкт-Петербург' },
  { id: 3, name: 'Алексей Петров', role: 'Backend-разработчик', department: 'Engineering', salary: 142000, city: 'Москва' },
  { id: 4, name: 'Мария Кузнецова', role: 'Аналитик', department: 'Analytics', salary: 105000, city: 'Казань' },
  { id: 5, name: 'Артём Волков', role: 'QA-инженер', department: 'Engineering', salary: 91000, city: 'Москва' },
  { id: 6, name: 'Елена Морозова', role: 'Product Manager', department: 'Product', salary: 135000, city: 'Санкт-Петербург' },
  { id: 7, name: 'Ольга Соколова', role: 'UX-исследователь', department: 'Design', salary: 89000, city: 'Москва' },
  { id: 8, name: 'Дмитрий Орлов', role: 'Data Engineer', department: 'Analytics', salary: 118000, city: 'Казань' },
];

const employeeColumns = ['id', 'name', 'role', 'department', 'salary', 'city'] as const;

function isEmployeeColumn(value: string): value is keyof Employee {
  return employeeColumns.some((column) => column === value);
}

function parseProjection(expression: string): Projection | null {
  const aggregate = expression.match(
    /^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(\*|[a-z_]+)\s*\)(?:\s+AS\s+([a-z_]+))?$/i,
  );

  if (aggregate) {
    const [, rawFunction, rawColumn, alias] = aggregate;
    const fn = rawFunction.toUpperCase() as 'COUNT' | 'SUM' | 'AVG' | 'MIN' | 'MAX';
    const column = rawColumn.toLowerCase();
    if (column !== '*' && !isEmployeeColumn(column)) return null;
    if (column === '*' && fn !== 'COUNT') return null;

    return {
      kind: 'aggregate',
      fn,
      column: column === '*' ? '*' : column,
      label: (alias ?? `${fn.toLowerCase()}_${column === '*' ? 'all' : column}`).toLowerCase(),
    };
  }

  const columnMatch = expression.match(/^([a-z_]+)(?:\s+AS\s+([a-z_]+))?$/i);
  if (!columnMatch) return null;
  const [, rawColumn, alias] = columnMatch;
  const column = rawColumn.toLowerCase();
  if (!isEmployeeColumn(column)) return null;
  return { kind: 'column', column, label: (alias ?? column).toLowerCase() };
}

function compareValues(left: string | number, right: string | number): number {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left).localeCompare(String(right), 'ru');
}

function parseCondition(condition: string): ((employee: Employee) => boolean) | null {
  const inMatch = condition.match(/^([a-z_]+)\s+IN\s*\((.+)\)$/i);
  if (inMatch) {
    const [, rawColumn, rawValues] = inMatch;
    const column = rawColumn.toLowerCase();
    if (!isEmployeeColumn(column)) return null;
    const values = rawValues.split(',').map((value) => value.trim().replace(/^(['"])(.*)\1$/, '$2').toLowerCase());
    if (!values.length) return null;
    return (employee) => values.includes(String(employee[column]).toLowerCase());
  }

  const match = condition.match(/^([a-z_]+)\s*(=|>=|<=|>|<|LIKE)\s*(.+)$/i);
  if (!match) return null;
  const [, rawColumn, operator, rawValue] = match;
  const column = rawColumn.toLowerCase();
  if (!isEmployeeColumn(column)) return null;
  const value = rawValue.trim().replace(/^(['"])(.*)\1$/, '$2');

  return (employee) => {
    const actual = employee[column];
    if (operator.toUpperCase() === 'LIKE') {
      const pattern = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.');
      return new RegExp(`^${pattern}$`, 'i').test(String(actual));
    }

    const actualNumber = Number(actual);
    const valueNumber = Number(value);
    const left: string | number = value !== '' && Number.isFinite(valueNumber) && Number.isFinite(actualNumber)
      ? actualNumber
      : String(actual).toLowerCase();
    const right: string | number = typeof left === 'number' ? valueNumber : value.toLowerCase();
    const comparison = compareValues(left, right);

    switch (operator) {
      case '=': return comparison === 0;
      case '>': return comparison > 0;
      case '<': return comparison < 0;
      case '>=': return comparison >= 0;
      case '<=': return comparison <= 0;
      default: return false;
    }
  };
}

function aggregateValue(projection: Extract<Projection, { kind: 'aggregate' }>, rows: Employee[]): number {
  const column = projection.column;
  if (projection.fn === 'COUNT') {
    if (column === '*') return rows.length;
    return rows.filter((row) => row[column] !== null).length;
  }
  if (column === '*') return 0;
  const values = rows
    .map((row) => row[column])
    .filter((value): value is number => typeof value === 'number');
  if (values.length === 0) return 0;
  switch (projection.fn) {
    case 'SUM': return values.reduce((sum, value) => sum + value, 0);
    case 'AVG': return values.reduce((sum, value) => sum + value, 0) / values.length;
    case 'MIN': return Math.min(...values);
    case 'MAX': return Math.max(...values);
    default: return 0;
  }
}

function evaluateHaving(
  expression: string,
  projections: Projection[],
  rows: Employee[],
  result: Record<string, string | number>,
): boolean | null {
  const match = expression.match(/^(.+?)\s*(=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)$/);
  if (!match) return null;
  const [, rawTarget, operator, rawValue] = match;
  const target = rawTarget.trim().toLowerCase();
  const aggregate = projections.find(
    (projection): projection is Extract<Projection, { kind: 'aggregate' }> =>
      projection.kind === 'aggregate' &&
      (`${projection.fn}(${projection.column})`.toLowerCase() === target || projection.label === target),
  );
  const value = aggregate ? aggregateValue(aggregate, rows) : result[target];
  if (typeof value !== 'number') return null;
  const threshold = Number(rawValue);
  switch (operator) {
    case '=': return value === threshold;
    case '>': return value > threshold;
    case '<': return value < threshold;
    case '>=': return value >= threshold;
    case '<=': return value <= threshold;
    default: return false;
  }
}

function error(message: string): QueryResult {
  return { columns: [], rows: [], error: message };
}

export function runQuery(input: string): QueryResult {
  const query = input.trim().replace(/;+\s*$/, '');
  const match = query.match(
    /^SELECT\s+(DISTINCT\s+)?(.+?)\s+FROM\s+employees(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+([a-z_]+))?(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+([a-z_]+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/i,
  );
  if (!match) {
    return error('Не удалось разобрать запрос. Поддерживаются SELECT, WHERE, GROUP BY, HAVING, ORDER BY и LIMIT для employees.');
  }

  const [, distinctFlag, rawSelection, whereClause, rawGroupColumn, havingClause, rawOrderColumn, orderDirection, limitValue] = match;
  const selection = rawSelection.trim();
  const selectedAll = selection === '*';
  const parsedProjections = selectedAll
    ? employeeColumns.map((column): Projection => ({ kind: 'column', column, label: column }))
    : selection.split(',').map((item) => parseProjection(item.trim()));
  const validProjections = parsedProjections.filter((projection): projection is Projection => projection !== null);
  if (validProjections.length !== parsedProjections.length) {
    return error(`Неизвестное выражение SELECT. Доступны столбцы: ${employeeColumns.join(', ')} и агрегатные функции COUNT, SUM, AVG, MIN, MAX.`);
  }

  let groupColumn: keyof Employee | undefined;
  if (rawGroupColumn) {
    const candidate = rawGroupColumn.toLowerCase();
    if (!isEmployeeColumn(candidate)) return error(`Неизвестный столбец для группировки: ${rawGroupColumn}.`);
    groupColumn = candidate;
  }
  if (groupColumn && validProjections.some((projection) => projection.kind === 'column' && projection.column !== groupColumn)) {
    return error('В SELECT можно использовать только столбец GROUP BY и агрегатные функции.');
  }
  const hasAggregate = validProjections.some((projection) => projection.kind === 'aggregate');
  if (hasAggregate && validProjections.some((projection) => projection.kind === 'column') && !groupColumn) {
    return error('Добавь GROUP BY для выбранных обычных столбцов.');
  }
  if (havingClause && !groupColumn && !hasAggregate) return error('HAVING используется с GROUP BY или агрегатными функциями.');

  let filtered = [...employees];
  if (whereClause) {
    const alternatives = whereClause.split(/\s+OR\s+/i);
    const predicates = alternatives.map((alternative) => {
      const conditions = alternative.split(/\s+AND\s+/i).map(parseCondition);
      return conditions.every((condition) => condition !== null)
        ? (employee: Employee) => conditions.every((condition) => condition?.(employee) ?? false)
        : null;
    });
    if (predicates.some((predicate) => predicate === null)) {
      return error('Проверь условие WHERE. Поддерживаются сравнения, LIKE, IN, AND и OR.');
    }
    filtered = filtered.filter((employee) => predicates.some((predicate) => predicate?.(employee) ?? false));
  }

  const shouldAggregate = Boolean(groupColumn || hasAggregate);
  let resultRows: Array<Record<string, string | number>>;
  if (shouldAggregate) {
    const groups = new Map<string, Employee[]>();
    if (groupColumn) {
      filtered.forEach((employee) => {
        const key = String(employee[groupColumn]);
        groups.set(key, [...(groups.get(key) ?? []), employee]);
      });
    } else {
      groups.set('all', filtered);
    }
    resultRows = [...groups.values()].map((group) => {
      const result: Record<string, string | number> = {};
      validProjections.forEach((projection) => {
        result[projection.label] = projection.kind === 'aggregate'
          ? aggregateValue(projection, group)
          : group[0]?.[projection.column] ?? '';
      });
      return result;
    });

    if (havingClause) {
      const retainedGroups = resultRows.filter((row, index) => {
        const matches = evaluateHaving(havingClause, validProjections, [...groups.values()][index], row);
        return matches ?? false;
      });
      if (retainedGroups.length !== resultRows.length && resultRows.some((row, index) =>
        evaluateHaving(havingClause, validProjections, [...groups.values()][index], row) === null,
      )) {
        return error('Проверь HAVING: сравни агрегат или его псевдоним с числом.');
      }
      resultRows = retainedGroups;
    }
  } else {
    resultRows = filtered.map((employee) => {
      const result: Record<string, string | number> = {};
      validProjections.forEach((projection) => {
        if (projection.kind === 'column') result[projection.label] = employee[projection.column];
      });
      return result;
    });
  }

  if (distinctFlag) {
    const seen = new Set<string>();
    resultRows = resultRows.filter((row) => {
      const key = JSON.stringify(row);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (rawOrderColumn) {
    const orderColumn = rawOrderColumn.toLowerCase();
    const projection = validProjections.find((item) => item.label === orderColumn);
    const employeeColumn = isEmployeeColumn(orderColumn) ? orderColumn : undefined;
    const resultKey = projection?.label ?? employeeColumn;
    if (!resultKey) return error(`Неизвестный столбец для сортировки: ${rawOrderColumn}.`);
    if (shouldAggregate && !resultRows.every((row) => resultKey in row)) {
      return error('При группировке ORDER BY должен использовать столбец из SELECT.');
    }
    const direction = orderDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    resultRows.sort((left, right) => {
      const comparison = compareValues(left[resultKey] ?? '', right[resultKey] ?? '');
      return comparison * direction;
    });
  }

  if (limitValue) resultRows = resultRows.slice(0, Number(limitValue));
  return {
    columns: validProjections.map((projection) => projection.label),
    rows: resultRows,
  };
}
