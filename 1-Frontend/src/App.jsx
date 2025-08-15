import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { LanguageProvider } from './context/LanguageContext';
import { useViewportHeight } from './hooks/useViewportHeight';

function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
