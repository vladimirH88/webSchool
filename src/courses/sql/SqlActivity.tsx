import { useState } from 'react';
import { runQuery } from '../../sql/runQuery';
import type { QueryResult } from '../../sql/runQuery';
import { lessons as sqlLessons } from '../../lessons';
import type { CourseActivityProps } from '../types';
import { Button, Card, DataTable } from '../../ui-kit';

const sourceLessons = new Map(
  sqlLessons.map((lesson, index) => [`sql-${index + 1}`, lesson]),
);

export function SqlActivity({ lessonId, onComplete }: CourseActivityProps) {
  const lesson = sourceLessons.get(lessonId);
  const [query, setQuery] = useState(lesson?.query ?? '');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [showHint, setShowHint] = useState(false);

  if (!lesson || lesson.mode !== 'practice') {
    return (
      <Card className="reading-example">
        <div className="editor-topline">
          <div className="editor-tab">
            <span className="tiny-dot" /> Материал урока
          </div>
          <span className="editor-language">ТЕОРИЯ</span>
        </div>
        <pre>{lesson?.example}</pre>
        <div className="reading-actions">
          <Button
            variant="secondary"
            onClick={() => setShowHint((visible) => !visible)}
          >
            ✦ {showHint ? 'Скрыть подсказку' : 'Подсказка'}
          </Button>
          <Button variant="primary" onClick={onComplete}>
            Отметить пройденным <span>✓</span>
          </Button>
        </div>
        {showHint && <p className="sql-hint">{lesson?.tip}</p>}
      </Card>
    );
  }

  const expected = runQuery(lesson.solution);
  const isCorrect =
    result !== null &&
    !result.error &&
    JSON.stringify(result) === JSON.stringify(expected);

  function executeQuery() {
    const nextResult = runQuery(query);
    setResult(nextResult);
    if (
      !nextResult.error &&
      JSON.stringify(nextResult) === JSON.stringify(expected)
    ) {
      onComplete();
    }
  }

  return (
    <>
      <Card className="editor-card">
        <div className="editor-topline">
          <div className="editor-tab">
            <span className="tiny-dot" /> Запрос.sql
          </div>
          <span className="editor-language">SQL</span>
        </div>
        <div className="editor-body">
          <div className="line-numbers" aria-hidden="true">
            {query.split('\n').map((_, index) => (
              <span key={index}>{String(index + 1).padStart(2, '0')}</span>
            ))}
          </div>
          <textarea
            aria-label="SQL-запрос"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setResult(null);
            }}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                executeQuery();
              }
              if (event.key === 'Tab') {
                event.preventDefault();
                const target = event.currentTarget;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                setQuery(`${query.slice(0, start)}  ${query.slice(end)}`);
                requestAnimationFrame(() =>
                  target.setSelectionRange(start + 2, start + 2),
                );
              }
            }}
          />
        </div>
        <div className="editor-footer">
          <span>
            <span className="status-indicator" /> Учебная база данных
          </span>
          <span>
            ⌘ ↵ <span className="shortcut-label">запустить</span>
          </span>
        </div>
      </Card>
      <div className="action-row">
        <Button
          variant="secondary"
          onClick={() => setShowHint((visible) => !visible)}
        >
          ✦ {showHint ? 'Скрыть подсказку' : 'Подсказка'}
        </Button>
        <Button variant="primary" onClick={executeQuery}>
          Запустить запрос <span>↗</span>
        </Button>
      </div>
      {showHint && <p className="sql-hint">{lesson.tip}</p>}
      {result && (
        <Card
          className={`result-panel ${result.error ? 'has-error' : isCorrect ? 'is-correct' : ''}`}
        >
          <div className="result-heading">
            <div>
              <span className="result-icon">
                {result.error ? '!' : isCorrect ? '✓' : '↳'}
              </span>
              <strong>
                {result.error
                  ? 'Проверь запрос'
                  : isCorrect
                    ? 'Отлично, верно!'
                    : 'Запрос выполнен'}
              </strong>
            </div>
            {!result.error && <span>{result.rows.length} строк</span>}
          </div>
          {result.error ? (
            <p className="error-message">{result.error}</p>
          ) : result.rows.length === 0 ? (
            <p className="empty-result">
              Запрос выполнен, но ничего не найдено.
            </p>
          ) : (
            <div className="result-table-wrap">
              <DataTable
                className="result-table"
                columns={result.columns}
                rows={result.rows}
              />
            </div>
          )}
        </Card>
      )}
    </>
  );
}
