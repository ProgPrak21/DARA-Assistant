import * as React from "react";
import * as ReactDOM from "react-dom";
import CardGrid from "./CardGrid";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

var mountNode = document.getElementById("overview");
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CardGrid />
  </ThemeProvider>
  , mountNode
);
