import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Popup } from "./components/Popup";


const App = () => {
  let [actions, setActions] = React.useState<Array<string>>([]);
  if (!actions.length){
    chrome.runtime.sendMessage({ backgroundInfo: true });
    chrome.runtime.onMessage.addListener(function onMessage(message) {
      if (message.actions) {
        chrome.runtime.onMessage.removeListener(onMessage);
        setActions(message.actions);
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <Popup actions={actions} />
      </body>
    </div>
  );
};

export default App;
