import { AppBar, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import "./App.css";
import { Popup } from "./components/Popup";

const App = () => {  
  return (
    <div className="App">
      <header>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            DARA - Assistant
          </Typography>
        </Toolbar>
      </AppBar>
        {/*
        <img src="./icon-128.png" className="App-logo" alt="logo" />
        <span>DARA Data Request Assistant</span>
        */}
      </header>
      <body className="App-body">
        <Popup/>
      </body>
    </div>
  );
};

export default App;
