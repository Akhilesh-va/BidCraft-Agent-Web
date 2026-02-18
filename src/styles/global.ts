import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { min-height: 100%; margin: 0; padding: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: linear-gradient(180deg,#f7f8fb 0%, #ffffff 40%); color: #0f172a; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  /* Desktop-friendly container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
`;
