import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ThemeProviderApp } from './hooks/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProviderApp>
      <App />
    </ThemeProviderApp>
  </React.StrictMode>,
  document.getElementById('root'),
);
