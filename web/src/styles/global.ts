import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,body, #__next {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;

    color: #fff;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background:${({ theme }) => theme.colors.background};
  }

  @media (max-width: 1440px) {
    html {
      font-size: 80%;
    }
  }

  @media (max-width: 1024px) {
    html {
      font-size: 70%;
    }
  }

  @media (max-width: 800px) {
    html {
      font-size: 60%;
    }
  }

  @media (min-width: 1950px) {
    html {
      font-size: 110%;
    }
  }
`;
