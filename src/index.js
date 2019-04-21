import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";
import { Firebase, withFirebase } from "./Firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle } from "styled-components";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

// Fixes the specificity of styled-components vs material-ui
// https://material-ui.com/customization/css-in-js/#css-injection-order
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const GlobalStyle = createGlobalStyle`
  a{
    text-decoration: none;
    
    &:visited{
      color: inherit;
    }
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5a15c5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#27C515",
      contrastText: "#fff",
    },
    // error: will use the default color
  },
});

ReactDOM.render(
  <withFirebase.Provider value={new Firebase()}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </JssProvider>
  </withFirebase.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
