import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import NotesPage from './components/NotesPage';
import { NotesProvider } from './hooks/useNotes';

/**
 * Root App component that wires providers and the main NotesPage.
 * Includes a simple light/dark theme toggle persisted to localStorage.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore persistence failures
    }
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const themeLabel = useMemo(
    () => (theme === 'light' ? '🌙 Dark' : '☀️ Light'),
    [theme]
  );

  return (
    <div className="App">
      <header className="topbar">
        <div className="container">
          <div className="brand">
            <span className="brand-dot" aria-hidden>●</span>
            <h1 className="brand-title">Notes</h1>
          </div>
          <div className="topbar-actions">
            <button
              className="btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {themeLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <NotesProvider>
          <NotesPage />
        </NotesProvider>
      </main>

      <footer className="footer">
        <div className="container">
          <span className="muted">Personal Notes Manager • React</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
