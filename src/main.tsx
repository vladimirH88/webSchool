import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { appName } from './appConfig';
import './style.css';

document.title = `${appName} — онлайн-платформа для обучения`;

/** Находит корневой элемент приложения и монтирует React-интерфейс. */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
