import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ignore noise thrown by third-party browser extensions (e.g. MetaMask inpage.js) in iframe previews.
const isExtensionError = (value: unknown): boolean => {
  const text =
    typeof value === 'string'
      ? value
      : value && typeof value === 'object'
        ? `${(value as { message?: string }).message ?? ''} ${(value as { stack?: string }).stack ?? ''}`
        : '';
  return (
    text.includes('chrome-extension://') ||
    text.includes('moz-extension://') ||
    text.includes('safari-extension://') ||
    text.includes('Failed to connect to MetaMask')
  );
};

window.addEventListener(
  'error',
  (event) => {
    if (
      isExtensionError(event.filename) ||
      isExtensionError(event.message) ||
      isExtensionError(event.error)
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);

window.addEventListener(
  'unhandledrejection',
  (event) => {
    if (isExtensionError(event.reason)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);

createRoot(document.getElementById('root')!).render(<App />);
