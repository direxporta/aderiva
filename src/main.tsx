import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './grunge.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('ADeriva: root element was not found.');
}

window.addEventListener('error', (event) => {
  console.error('ADeriva runtime error:', event.error || event.message);
  rootElement.innerHTML = `<div style="min-height:100vh;display:grid;place-items:center;padding:40px;font-family:Arial,sans-serif"><div><h1 style="margin:0 0 12px">ADeriva</h1><p style="margin:0 0 8px">The app could not start.</p><p style="margin:0;color:#777;font-size:13px">${String(event.error?.message || event.message || 'Unknown runtime error').replace(/[&<>\"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c] || c))}</p></div></div>`;
});

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
