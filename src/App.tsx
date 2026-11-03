import { useMemo, useState, type CSSProperties } from 'react';
import { Badge, BrandMark, Button, Card, ProgressBar } from './ui-kit';
import { courses } from './courses/registry';
import type { CourseLesson, CourseModule } from './courses/types';

function countLabel(
  count: number,
  forms: [singular: string, paucal: string, plural: string],
) {
  const remainder100 = count % 100;
  const remainder10 = count % 10;
  const formIndex =
    remainder100 >= 11 && remainder100 <= 14
      ? 2
      : remainder10 === 1
        ? 0
        : remainder10 >= 2 && remainder10 <= 4
          ? 1
          : 2;
  return `${count} ${forms[formIndex]}`;
}

/** Отображает каталог направлений и универсальный интерфейс прохождения уроков. */
export default function App() {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedByCourse, setCompletedByCourse] = useState<
    Record<string, string[]>
  >({});
  const [search, setSearch] = useState('');

  const activeCourse = courses.find((course) => course.id === activeCourseId);
  const lesson = activeCourse?.lessons.find(
    (item) => item.id === activeLessonId,
  );
  const completed = activeCourse
    ? (completedByCourse[activeCourse.id] ?? [])
    : [];
  const progress = activeCourse?.lessons.length
    ? Math.round((completed.length / activeCourse.lessons.length) * 100)
    : 0;
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('ru');
    return courses.filter(
      (course) =>
        !query ||
        `${course.title} ${course.description} ${course.category}`
          .toLocaleLowerCase('ru')
          .includes(query),
    );
  }, [search]);

  function openCourse(course: CourseModule) {
    setActiveCourseId(course.id);
    setActiveLessonId(course.lessons[0]?.id ?? null);
    setSearch('');
  }

  function markComplete(course: CourseModule, currentLesson: CourseLesson) {
    setCompletedByCourse((previous) => {
      const courseCompleted = previous[course.id] ?? [];
      if (courseCompleted.includes(currentLesson.id)) return previous;
      return {
        ...previous,
        [course.id]: [...courseCompleted, currentLesson.id],
      };
    });
  }

  function openCatalog() {
    setActiveCourseId(null);
    setActiveLessonId(null);
  }

  return (
    <div className="platform-shell">
      <aside className="platform-sidebar">
        <a
          className="platform-brand"
          href="#"
          aria-label="Учись шире — на главную"
          onClick={(event) => {
            event.preventDefault();
            openCatalog();
          }}
        >
          <span className="platform-brand-mark">
            <BrandMark />
          </span>
          <span>
            учись<span className="platform-brand-accent">.</span>
          </span>
        </a>

        <Button
          variant="unstyled"
          className={`catalog-nav-link ${!activeCourse ? 'active' : ''}`}
          onClick={openCatalog}
        >
          <span>⌂</span> Каталог тем
        </Button>

        <div className="platform-sidebar-label">НАПРАВЛЕНИЯ</div>
        <nav className="topic-nav" aria-label="Направления обучения">
          {courses.map((course) => (
            <button
              className={`topic-nav-link ${activeCourse?.id === course.id ? 'active' : ''}`}
              key={course.id}
              onClick={() => openCourse(course)}
              type="button"
            >
              <span
                className="topic-nav-icon"
                style={{
                  backgroundColor: `${course.color}18`,
                  color: course.color,
                }}
              >
                {course.icon}
              </span>
              <span>{course.title}</span>
              <small>{course.lessons.length}</small>
            </button>
          ))}
        </nav>

        {activeCourse && (
          <>
            <div className="platform-sidebar-label curriculum-label">
              ПРОГРАММА
            </div>
            <nav className="curriculum-nav" aria-label="Уроки курса">
              {activeCourse.sections.map((section) => {
                const sectionLessons = activeCourse.lessons.filter(
                  (item) => item.sectionId === section.id,
                );
                return (
                  <div className="curriculum-section" key={section.id}>
                    <div className="curriculum-heading">
                      <span>{section.marker}</span>
                      <span>{section.title}</span>
                      <small>{sectionLessons.length}</small>
                    </div>
                    {sectionLessons.map((item) => (
                      <button
                        className={`curriculum-lesson ${activeLessonId === item.id ? 'active' : ''}`}
                        key={item.id}
                        onClick={() => setActiveLessonId(item.id)}
                        type="button"
                      >
                        <span
                          className={`curriculum-number ${completed.includes(item.id) ? 'done' : ''}`}
                        >
                          {completed.includes(item.id) ? '✓' : ''}
                        </span>
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </nav>
          </>
        )}

        <div className="platform-sidebar-bottom">
          <span className="platform-sidebar-bottom-icon">✳</span>
          <span>
            <strong>Учись в своём темпе</strong>
            <small>Небольшой шаг каждый день</small>
          </span>
        </div>
      </aside>

      <main className="platform-main">
        <header className="platform-topbar">
          <div className="platform-breadcrumbs">
            <button onClick={openCatalog} type="button">
              Все направления
            </button>
            {activeCourse && (
              <>
                <span>/</span>
                <strong>{activeCourse.title}</strong>
              </>
            )}
          </div>
          {activeCourse && (
            <div className="platform-progress">
              <span>
                {completed.length} из {activeCourse.lessons.length} уроков
              </span>
              <ProgressBar value={progress} label="Прогресс курса" />
            </div>
          )}
        </header>

        {!activeCourse ? (
          <section className="catalog-page">
            <div className="catalog-eyebrow">
              <span /> ПРОСТРАНСТВО ДЛЯ НОВЫХ ЗНАНИЙ
            </div>
            <h1>
              Учись тому,
              <br />
              что интересно<span>.</span>
            </h1>
            <p className="catalog-intro">
              Выбирай направление, открывай новые темы и двигайся вперёд в
              удобном темпе.
            </p>

            <div className="catalog-section-header">
              <div>
                <h2>Все направления</h2>
                <p>Найди тему для следующего шага</p>
              </div>
              <label className="catalog-search">
                <span aria-hidden="true">⌕</span>
                <input
                  aria-label="Поиск направления"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Найти тему"
                  type="search"
                  value={search}
                />
              </label>
            </div>

            {filteredCourses.length ? (
              <div className="catalog-grid">
                {filteredCourses.map((course) => {
                  const courseCompleted = completedByCourse[course.id] ?? [];
                  const courseProgress = course.lessons.length
                    ? Math.round(
                        (courseCompleted.length / course.lessons.length) * 100,
                      )
                    : 0;
                  return (
                    <button
                      className="course-card"
                      key={course.id}
                      onClick={() => openCourse(course)}
                      style={
                        { '--course-color': course.color } as CSSProperties
                      }
                      type="button"
                    >
                      <div className="course-card-top">
                        <span className="course-card-icon">{course.icon}</span>
                        <Badge tone="neutral">{course.category}</Badge>
                      </div>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="course-card-bottom">
                        <span>
                          {countLabel(course.sections.length, [
                            'раздел',
                            'раздела',
                            'разделов',
                          ])}{' '}
                          ·{' '}
                          {countLabel(course.lessons.length, [
                            'урок',
                            'урока',
                            'уроков',
                          ])}
                        </span>
                        <span className="course-card-arrow">↗</span>
                      </div>
                      {courseProgress > 0 && (
                        <div className="course-card-progress">
                          <span style={{ width: `${courseProgress}%` }} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="catalog-empty">
                По запросу «{search}» ничего не найдено. Попробуй другое
                название.
              </div>
            )}

            <div className="catalog-note">
              <span>✦</span>
              <p>
                <strong>Здесь найдётся место любой теме.</strong> Новые
                направления и разделы подключаются отдельными модулями.
              </p>
            </div>
          </section>
        ) : lesson ? (
          <div className="course-page">
            <section className="lesson-content">
              <div className="lesson-overline">
                <span>
                  УРОК{' '}
                  {String(
                    activeCourse.lessons.findIndex(
                      (item) => item.id === lesson.id,
                    ) + 1,
                  ).padStart(2, '0')}
                </span>
                <i />
                {
                  activeCourse.sections.find(
                    (section) => section.id === lesson.sectionId,
                  )?.level
                }{' '}
                · {lesson.subtitle}
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
                {lesson.details && (
                  <ul className="lesson-details">
                    {lesson.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
                <div className="example-query">
                  <span className="example-prompt">{activeCourse.title}</span>
                  <pre>
                    <code>{lesson.example}</code>
                  </pre>
                </div>
                {lesson.exampleOutput && (
                  <div className="example-output">
                    <span>Результат</span>
                    <pre>{lesson.exampleOutput}</pre>
                  </div>
                )}
                {lesson.exampleExplanation && (
                  <div className="lesson-walkthrough">
                    <strong>Как это работает</strong>
                    <p>{lesson.exampleExplanation}</p>
                  </div>
                )}
              </Card>

              {lesson.practiceSteps && (
                <Card className="lesson-practice">
                  <div className="lesson-practice-heading">
                    <span>↗</span>
                    <div>
                      <strong>Попробуй самостоятельно</strong>
                      <small>Практика в своей Docker-среде</small>
                    </div>
                  </div>
                  <ol>
                    {lesson.practiceSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {lesson.expectedResult && (
                    <p className="lesson-practice-result">
                      <strong>Проверь себя:</strong> {lesson.expectedResult}
                    </p>
                  )}
                </Card>
              )}

              <div className="challenge-heading">
                <span className="challenge-icon">↗</span>
                <div>
                  <strong>
                    {lesson.mode === 'practice'
                      ? 'Твоя очередь'
                      : 'Закрепи тему'}
                  </strong>
                  <span>
                    {lesson.mode === 'practice'
                      ? `Практика · около ${lesson.minutes} минут`
                      : `Материал · ${lesson.minutes} минут`}
                  </span>
                </div>
                {completed.includes(lesson.id) && (
                  <Badge tone="success" className="completed-badge">
                    ✓ Пройдено
                  </Badge>
                )}
              </div>
              <p className="challenge-text">{lesson.challenge}</p>

              {activeCourse.Activity ? (
                <activeCourse.Activity
                  key={lesson.id}
                  lessonId={lesson.id}
                  onComplete={() => markComplete(activeCourse, lesson)}
                />
              ) : (
                <Card className="reading-example">
                  <div className="editor-topline">
                    <div className="editor-tab">
                      <span className="tiny-dot" /> Пример
                    </div>
                    <span className="editor-language">МАТЕРИАЛ</span>
                  </div>
                  <pre>{lesson.example}</pre>
                  <div className="reading-actions">
                    {!completed.includes(lesson.id) ? (
                      <Button
                        variant="primary"
                        onClick={() => markComplete(activeCourse, lesson)}
                      >
                        Отметить пройденным <span>✓</span>
                      </Button>
                    ) : (
                      <span className="reading-complete">
                        Урок отмечен как пройденный ✓
                      </span>
                    )}
                  </div>
                </Card>
              )}

              <div className="lesson-bottom">
                <span>
                  {completed.includes(lesson.id)
                    ? 'Урок пройден — так держать!'
                    : 'Можно возвращаться к уроку в любое время'}
                </span>
                {activeCourse.lessons[
                  activeCourse.lessons.findIndex(
                    (item) => item.id === lesson.id,
                  ) + 1
                ] && (
                  <Button
                    variant="text"
                    onClick={() => {
                      const nextIndex =
                        activeCourse.lessons.findIndex(
                          (item) => item.id === lesson.id,
                        ) + 1;
                      setActiveLessonId(activeCourse.lessons[nextIndex].id);
                    }}
                  >
                    Следующий урок <span>→</span>
                  </Button>
                )}
              </div>
            </section>

            <aside className="course-aside">
              {activeCourse.Aside ? (
                <activeCourse.Aside />
              ) : (
                <Card className="course-aside-card">
                  <div className="course-aside-title">
                    <span
                      className="course-aside-icon"
                      style={{
                        backgroundColor: `${activeCourse.color}18`,
                        color: activeCourse.color,
                      }}
                    >
                      {activeCourse.icon}
                    </span>
                    <strong>О направлении</strong>
                  </div>
                  <p>{activeCourse.description}</p>
                  <div className="course-aside-stat">
                    <span>Разделов</span>
                    <strong>{activeCourse.sections.length}</strong>
                  </div>
                  <div className="course-aside-stat">
                    <span>Уроков пройдено</span>
                    <strong>
                      {completed.length} / {activeCourse.lessons.length}
                    </strong>
                  </div>
                  <ProgressBar
                    className="aside-progress"
                    label={`Прогресс курса ${activeCourse.title}`}
                    value={progress}
                  />
                </Card>
              )}
              <Card className="next-step-card">
                <span>✦ МАЛЕНЬКИЙ ШАГ</span>
                <h3>Знания складываются в большой путь.</h3>
                <p>
                  Проходи уроки в своём темпе и возвращайся к пройденным темам.
                </p>
              </Card>
            </aside>
          </div>
        ) : (
          <div className="course-empty">
            <h1>Пока нет уроков</h1>
            <p>Добавь уроки в программу этого направления.</p>
          </div>
        )}
      </main>
    </div>
  );
}
