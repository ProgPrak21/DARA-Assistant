import { AppBar, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import * as React from "react";
import "./App.css";
import { Popup } from "./components/Popup";

const App = () => {
  const onClick = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('overview.html'), active: true });
  };

  return (
    <div className="App">
      <header>
        <AppBar position="static">
          <Toolbar variant="regular">
            <Grid
              justify="space-between"
              container
            >
              <Grid item>
                <Typography variant="h6" color="inherit" noWrap>
                  DARA Assistant
                </Typography>
              </Grid>
              <Grid item>
                {/*<IconButton
                  onClick={onClick}
                  color="inherit"
                  size="small"
                >
                  <AppsIcon />
                </IconButton>*/}
                <IconButton
                  href="https://dara-tuberlin.netlify.app/"
                  target="_blank"
                  color="inherit"
                  edge="end"
                  size="small"
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/*
        <img src="./icon-128.png" className="App-logo" alt="logo" />
        <span>DARA Data Request Assistant</span>
        */}
      </header>
      <body className="App-body">
        <Popup />
      </body>
    </div>
  );
};

export default App;
