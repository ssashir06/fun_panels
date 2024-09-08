import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;

    // Disable text selection
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE 10+/Edge */
    user-select: none; /* Standard syntax */
  }
`;

export default GlobalStyle;