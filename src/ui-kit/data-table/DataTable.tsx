import './data-table.css';

/** Свойства таблицы, строки которой содержат строковые или числовые значения. */
type DataTableProps<Row extends Record<string, string | number>> = {
  /** Ключи отображаемых столбцов и заголовки таблицы. */
  columns: string[];
  /** Строки данных для отображения. */
  rows: Row[];
  /** Дополнительные CSS-классы таблицы. */
  className?: string;
  /** Возвращает стабильный React-ключ строки; по умолчанию используется индекс. */
  getRowKey?: (row: Row, index: number) => string | number;
};

/** Отображает типизированные строки данных в HTML-таблице. */
export function DataTable<Row extends Record<string, string | number>>({
  columns,
  rows,
  className = '',
  getRowKey,
}: DataTableProps<Row>) {
  return (
    <table className={`ui-data-table ${className}`.trim()}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={getRowKey?.(row, index) ?? index}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
