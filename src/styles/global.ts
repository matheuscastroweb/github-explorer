import { createGlobalStyle } from 'styled-components';

interface Theme {
  theme: {
    body: string;
    background: string;
  };
}
export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  transition: background-color 0.25s linear;
}

body {
  background: url(${({ theme }: Theme) => theme.background}) no-repeat 70% top ;
  background-color: ${({ theme }: Theme) => theme.body};
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 16px Roboto, sans-serif;
}

#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

button {
  cursor: pointer;
}

`;
