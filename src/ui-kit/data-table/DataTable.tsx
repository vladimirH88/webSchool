import './data-table.css';

type DataTableProps<Row extends Record<string, string | number>> = {
  columns: string[];
  rows: Row[];
  className?: string;
  getRowKey?: (row: Row, index: number) => string | number;
};

export function DataTable<Row extends Record<string, string | number>>({
  columns,
  rows,
  className = '',
  getRowKey,
}: DataTableProps<Row>) {
  return (
    <table className={`ui-data-table ${className}`.trim()}>
      <thead>
        <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={getRowKey?.(row, index) ?? index}>
            {columns.map((column) => <td key={column}>{row[column]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
