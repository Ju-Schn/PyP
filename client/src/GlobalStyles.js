import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  
}

:root {
  --toastify-color-info: #3498db;
  --toastify-color-success: #60bf81;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: #d92b04;
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-toast-width: 350px;
  --toastify-font-family: inherit;

  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #223240;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #f4e9c9;

}

body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  color: #223240;
}

h1, h2, h3, h4, h5, h6 {
  padding: 0px;
  margin: 0px;
}

input, label, textarea {
  font-size: 1em;
  font-family: inherit;
}

button {
  font-size: 1em;
  border: none;
  background: transparent;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

}`;
