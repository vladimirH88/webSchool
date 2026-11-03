import { useState } from 'react';
import { lessons } from './lessons';
import { courseLevels, type Lesson } from './lessons/types';
import type { QueryResult } from './sql/runQuery';
import { runQuery } from './sql/runQuery';
import {
  Badge,
  BrandMark,
  Button,
  Card,
  DataTable,
  ProgressBar,
} from './ui-kit';

export default function App() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [query, setQuery] = useState(lessons[0].query);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const lesson: Lesson = lessons[activeLesson];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const isCorrect =
    result && !result.error
      ? JSON.stringify(result) === JSON.stringify(runQuery(lesson.solution))
      : false;

  function selectLesson(index: number) {
    setActiveLesson(index);
    setQuery(lessons[index].query);
    setResult(null);
    setShowHint(false);
  }

  function executeQuery() {
    const nextResult = runQuery(query);
    setResult(nextResult);
    if (
      !nextResult.error &&
      JSON.stringify(nextResult) === JSON.stringify(runQuery(lesson.solution))
    ) {
      setCompleted((previous) =>
        previous.includes(activeLesson)
          ? previous
          : [...previous, activeLesson],
      );
    }
  }

  function completeLesson() {
    setCompleted((previous) =>
      previous.includes(activeLesson) ? previous : [...previous, activeLesson],
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="SQLook — на главную">
          <span className="brand-mark">
            <BrandMark />
          </span>
          <span>
            sq<span className="brand-accent">look</span>
          </span>
        </a>
        <div className="course-label">ТВОЙ ТРЕК</div>
        <div className="course-card">
          <div className="course-icon">⌘</div>
          <div>
            <strong>SQL с нуля</strong>
            <span>Полная программа · 7 уровней</span>
          </div>
          <span className="course-chevron">⌄</span>
        </div>

        <div className="sidebar-section-title">
          <span>УРОВНИ КУРСА</span>
          <span className="section-count">
            {String(lessons.length).padStart(2, '0')}
          </span>
        </div>
        <nav className="lesson-nav" aria-label="Уроки">
          {courseLevels.map((courseLevel) => {
            const levelLessons = lessons
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => item.section === courseLevel.id);
            return (
              <div className="course-level" key={courseLevel.id}>
                <div className="course-level-heading">
                  <span>
                    {courseLevel.marker} УРОВЕНЬ {courseLevel.id}:{' '}
                    {courseLevel.title}
                  </span>
                  <small>{levelLessons.length}</small>
                </div>
                {levelLessons.map(({ item, index }) => (
                  <Button
                    variant="unstyled"
                    className={`lesson-link ${activeLesson === index ? 'active' : ''}`}
                    key={item.title}
                    onClick={() => selectLesson(index)}
                  >
                    <span
                      className={`lesson-number ${completed.includes(index) ? 'done' : ''}`}
                    >
                      {completed.includes(index)
                        ? '✓'
                        : String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="lesson-link-text">
                      <span>{item.title}</span>
                      <small>{item.subtitle}</small>
                    </span>
                    {activeLesson === index && <span className="active-dot" />}
                  </Button>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-icon">✳</div>
            <div>
              <strong>Шаг за шагом</strong>
              <span>От простого к сложному</span>
            </div>
          </div>
          <div className="profile-button">
            <span className="avatar">S</span>
            <span className="profile-name">
              <strong>SQLook</strong>
              <small>Твой тренажёр</small>
            </span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Мои курсы</span>
            <i>/</i>
            <strong>SQL с нуля</strong>
          </div>
          <div className="topbar-right">
            <div className="progress-label">
              <span>Прогресс курса</span>
              <strong>
                {completed.length} из {lessons.length} уроков
              </strong>
            </div>
            <ProgressBar
              value={progress}
              label="Прогресс курса"
              className="course-progress"
            />
            <span
              className="help-button"
              aria-label={`Уровень: ${lesson.level}`}
            >
              ?
            </span>
          </div>
        </header>

        <div className="workspace">
          <section className="lesson-content">
            <div className="lesson-overline">
              <span>УРОК {String(activeLesson + 1).padStart(2, '0')}</span>
              <i />
              {lesson.level} · {lesson.subtitle}
            </div>
            <h1>
              {lesson.title}
              <span className="title-period">.</span>
            </h1>
            <p className="lesson-description">{lesson.description}</p>

            <Card className="concept-card">
              <div className="concept-heading">
                <span className="concept-icon">✳</span>
                <div>
                  <strong>Коротко о главном</strong>
                  <span>Разберёмся на примере</span>
                </div>
              </div>
              <p>{lesson.concept}</p>
              <div className="example-query">
                <span className="example-prompt">SQL</span>
                <code>{lesson.example}</code>
              </div>
            </Card>

            <div className="challenge-heading">
              <span className="challenge-icon">↗</span>
              <div>
                <strong>
                  {lesson.mode === 'practice' ? 'Твоя очередь' : 'Закрепи тему'}
                </strong>
                <span>
                  {lesson.mode === 'practice'
                    ? 'Практика · около 2 минут'
                    : 'Материал · теоретическая тема'}
                </span>
              </div>
              {completed.includes(activeLesson) && (
                <Badge tone="success" className="completed-badge">
                  ✓ Пройдено
                </Badge>
              )}
            </div>
            <p className="challenge-text">{lesson.challenge}</p>

            {lesson.mode === 'practice' ? (
              <>
                <Card className="editor-card">
                  <div className="editor-topline">
                    <div className="editor-tab">
                      <span className="tiny-dot" /> Запрос.sql{' '}
                      <span className="unsaved-dot" />
                    </div>
                    <span className="editor-language">SQL</span>
                  </div>
                  <div className="editor-body">
                    <div className="line-numbers" aria-hidden="true">
                      {query.split('\n').map((_, index) => (
                        <span key={index}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
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
                        if (
                          (event.metaKey || event.ctrlKey) &&
                          event.key === 'Enter'
                        )
                          executeQuery();
                        if (event.key === 'Tab') {
                          event.preventDefault();
                          const target = event.currentTarget;
                          const start = target.selectionStart;
                          const end = target.selectionEnd;
                          setQuery(
                            `${query.slice(0, start)}  ${query.slice(end)}`,
                          );
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
                    <span>✦</span> {showHint ? 'Скрыть подсказку' : 'Подсказка'}
                  </Button>
                  <Button variant="primary" onClick={executeQuery}>
                    Запустить запрос <span>↗</span>
                  </Button>
                </div>
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
                        Запрос выполнен, но ничего не найдено. Проверь условие.
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
            ) : (
              <Card className="reading-example">
                <div className="editor-topline">
                  <div className="editor-tab">
                    <span className="tiny-dot" /> Пример SQL
                  </div>
                  <span className="editor-language">ТЕОРИЯ</span>
                </div>
                <pre>{lesson.example}</pre>
                <div className="reading-actions">
                  <Button
                    variant="secondary"
                    onClick={() => setShowHint((visible) => !visible)}
                  >
                    <span>✦</span> {showHint ? 'Скрыть подсказку' : 'Подсказка'}
                  </Button>
                  {!completed.includes(activeLesson) && (
                    <Button variant="primary" onClick={completeLesson}>
                      Отметить тему пройденной <span>✓</span>
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {showHint && (
              <Card className="hint-panel">
                <span>✦</span>
                <p>{lesson.tip}</p>
              </Card>
            )}

            <div className="lesson-bottom">
              <span>
                {completed.includes(activeLesson)
                  ? 'Урок пройден — так держать!'
                  : 'Можно возвращаться к уроку в любое время'}
              </span>
              {activeLesson < lessons.length - 1 && (
                <Button
                  variant="text"
                  onClick={() => selectLesson(activeLesson + 1)}
                >
                  Следующий урок <span>→</span>
                </Button>
              )}
            </div>
          </section>

          <aside className="right-panel">
            <Card className="data-panel">
              <div className="panel-title">
                <div>
                  <span className="table-icon">▦</span>
                  <strong>Таблица данных</strong>
                </div>
                <span className="row-count">8 строк</span>
              </div>
              <div className="table-name">
                <span className="table-green-dot" /> employees
              </div>
              <div className="schema-list">
                <div>
                  <span className="schema-type">#</span>
                  <code>id</code>
                  <small>integer</small>
                </div>
                <div>
                  <span className="schema-type string">Aa</span>
                  <code>name</code>
                  <small>varchar</small>
                </div>
                <div>
                  <span className="schema-type string">Aa</span>
                  <code>role</code>
                  <small>varchar</small>
                </div>
                <div>
                  <span className="schema-type string">Aa</span>
                  <code>department</code>
                  <small>varchar</small>
                </div>
                <div>
                  <span className="schema-type number">123</span>
                  <code>salary</code>
                  <small>integer</small>
                </div>
                <div>
                  <span className="schema-type string">Aa</span>
                  <code>city</code>
                  <small>varchar</small>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowPreview((visible) => !visible)}
              >
                {showPreview ? 'Скрыть предпросмотр' : 'Предпросмотр таблицы'}{' '}
                <span>{showPreview ? '⌃' : '⌄'}</span>
              </Button>
              {showPreview && (
                <div className="table-preview">
                  <DataTable
                    columns={['name', 'department']}
                    rows={[
                      { name: 'Анна Смирнова', department: 'Engineering' },
                      { name: 'Михаил Иванов', department: 'Design' },
                      { name: 'Алексей Петров', department: 'Engineering' },
                      { name: 'Мария Кузнецова', department: 'Analytics' },
                    ]}
                    getRowKey={(row) => row.name}
                  />
                </div>
              )}
            </Card>
            <Card className="learn-card">
              <div className="learn-card-top">
                <span>✦</span>
                <small>НА ЗАМЕТКУ</small>
              </div>
              <h3>
                SQL — это диалог
                <br />с твоими данными
              </h3>
              <p>
                Ты задаёшь вопрос на языке запросов, а база данных находит
                ответ. Просто и по делу.
              </p>
              <div className="learn-doodle" aria-hidden="true">
                <span>SELECT</span>
                <i>↗</i>
                <b>data</b>
              </div>
            </Card>
            <div className="keyboard-tip">
              <span className="keyboard-icon">⌨</span>
              <p>
                Быстрый запуск
                <br />
                <kbd>⌘</kbd> <kbd>↵</kbd>
                <span>нажми, чтобы выполнить запрос</span>
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
