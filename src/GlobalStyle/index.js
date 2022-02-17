import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
      scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Prompt', sans-serif;
    transition: all 0.25s linear;
    overflow-x: hidden;
  }

  button {
    font-family: 'Prompt', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-weight: 600;
  }

  h2 {
    font-weight: 600;
  }

  .fixed {
    position: fixed !important;
    top: 0;
    z-index: 120;
    background: rgba( 255, 255, 255, 0.30 );
    box-shadow: 0 5px 20px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px ) ;
    -webkit-transition: all 0.3s ease !important;
    transition: all 0.3s ease !important;
    height: 120px !important;
/*     
    @media only screen and (max-width: 1100px) {
      height: 100px !important;
      -webkit-transition: all 0.1s ease !important;
      transition: all 0.1s ease !important;
      position: fixed !important;
    } */
  }

  .non-fixed {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    height: 100px;
    /* @media only screen and (max-width: 1100px) {
      -webkit-transition: all 0.1s ease;
      transition: all 0.1s ease;
      height: 80px;
    } */
  }

`;
