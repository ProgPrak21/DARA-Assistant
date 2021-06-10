import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Popup } from "./components/Popup";

const App = () => {  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <Popup/>
      </body>
    </div>
  );
};

export default App;
