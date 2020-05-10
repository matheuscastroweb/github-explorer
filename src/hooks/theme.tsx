import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

interface ThemeContextData {
  theme: string;
  toogleTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProviderApp: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const themeStorage = localStorage.getItem('@GithubExplorer:theme');

    if (themeStorage) {
      return themeStorage;
    } else return 'light';
  });

  useEffect(() => {
    const themeStorage = localStorage.getItem('@GithubExplorer:theme');
    if (themeStorage) {
      setTheme(themeStorage);
    } else {
      setTheme('light');
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
      {children}
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

export { ThemeProviderApp, useTheme };
