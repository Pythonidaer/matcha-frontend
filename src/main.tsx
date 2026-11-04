import { createRoot } from 'react-dom/client';
import { App } from './App';
import './reset.css';
import './style.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('The page is missing its React root element.');
}

createRoot(rootElement).render(<App />);
