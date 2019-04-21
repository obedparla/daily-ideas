import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";
import { Firebase, withFirebase } from "./Firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle } from "styled-components";

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
      main: "#FFB630",
    },
    secondary: {
      main: "#41C9BC",
    },
    // error: will use the default color
  },
});

ReactDOM.render(
  <withFirebase.Provider value={new Firebase()}>
    <MuiThemeProvider theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </withFirebase.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
