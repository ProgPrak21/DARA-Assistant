import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "./components/Button";
import { StatusInfo } from "./components/StatusInfo";
import { RequestInfo } from "./components/RequestInfo";
import { DownloadInfo } from "./components/DownloadInfo";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type={"request"} />
        <RequestInfo />
        <Button type={"check"} />
        <StatusInfo />
        <Button type={"download"} />
        <DownloadInfo />
      </header>
    </div>
  );
};

export default App;
