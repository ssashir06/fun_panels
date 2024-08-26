import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0.5em 0;
}

p {
  margin: 0.5em 0;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}

.left-side-menu {
  padding: 0;
  width: 220px;
}

.main-content {
  margin-left: 220px; /* Adjust this value based on the width of the sidebar */
  padding: 0;
}
`;

export default GlobalStyle;