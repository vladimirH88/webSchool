import { Card, DataTable } from '../../ui-kit';

const employees = [
  { name: 'Анна Смирнова', department: 'Engineering' },
  { name: 'Михаил Иванов', department: 'Design' },
  { name: 'Алексей Петров', department: 'Engineering' },
];

export function SqlAside() {
  return (
    <Card className="course-aside-card">
      <div className="course-aside-title">
        <span>▦</span>
        <strong>Демо-таблица</strong>
      </div>
      <div className="course-aside-label">employees · 8 строк</div>
      <ul className="schema-list">
        <li>
          <code>id</code>
          <span>integer</span>
        </li>
        <li>
          <code>name</code>
          <span>varchar</span>
        </li>
        <li>
          <code>role</code>
          <span>varchar</span>
        </li>
        <li>
          <code>department</code>
          <span>varchar</span>
        </li>
        <li>
          <code>salary</code>
          <span>integer</span>
        </li>
        <li>
          <code>city</code>
          <span>varchar</span>
        </li>
      </ul>
      <DataTable columns={['name', 'department']} rows={employees} />
    </Card>
  );
}
