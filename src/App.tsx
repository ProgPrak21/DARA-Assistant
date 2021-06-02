import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Facebook } from "./components/facebook/Facebook";

const App = () => {
  const [url, setUrl] = React.useState<string>("");

  //Get current URL
  React.useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        setUrl(url ?? "");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        {url.includes("facebook") && <Facebook />}
      </body>
    </div>
  );
};

export default App;
