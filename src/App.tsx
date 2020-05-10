import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { useTheme } from './hooks/theme';
import Routes from './routes';

import GlobalStyle from './styles/global';
import { lightTheme, darkTheme } from './styles/theme';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
