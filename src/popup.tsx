import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./popup.css";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

var mountNode = document.getElementById("popup");
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  , mountNode
);
