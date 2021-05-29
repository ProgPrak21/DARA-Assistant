import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Btn } from "./components/Button";
import { StatusInfo } from "./components/StatusInfo";
import { RequestInfo } from "./components/RequestInfo";
import { DownloadInfo } from "./components/DownloadInfo";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <Grid container spacing={3}>
          <Grid style={{ textAlign: "left" }} item xs={6}>
            <Btn type={"request"} />
          </Grid>
          <Grid item xs={6}>
            <RequestInfo />
          </Grid>
          <Grid style={{ textAlign: "left" }} item xs={6}>
            <Btn type={"check"} />
          </Grid>
          <Grid item xs={6}>
            <StatusInfo />
          </Grid>
          <Grid style={{ textAlign: "left" }} item xs={6}>
            <Btn type={"download"} />
          </Grid>
          <Grid item xs={6}>
            <DownloadInfo />
          </Grid>
        </Grid>
      </body>
    </div>
  );
};

export default App;
