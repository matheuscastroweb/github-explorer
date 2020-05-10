import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import { ThemeProvider as Theme } from 'styled-components';

import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextData {
  theme: string;
  toogleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const themeStorage = localStorage.getItem('@GithubExplorer:theme');

    if (themeStorage) {
      return themeStorage;
    }
    return 'dark';
  });

  useEffect(() => {
    const themeStorage = localStorage.getItem('@GithubExplorer:theme');
    if (themeStorage) {
      setTheme(themeStorage);
    } else {
      setTheme('dark');
    }
  }, [theme]);

  const toogleTheme = useCallback(() => {
    if (theme === 'light') {
      localStorage.setItem('@GithubExplorer:theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('@GithubExplorer:theme', 'light');
      setTheme('light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      <Theme theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
}

export { ThemeProvider, useTheme };
