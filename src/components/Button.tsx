import * as React from "react";
import { Button } from "@material-ui/core";
import { buildConfig } from '../connectors/.';

type props = {
  type: string;
};

export const Btn: React.FC<props> = ({ type }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.runtime.sendMessage({ ...tab, type: type });
    });
  };

  return (
    <div className="buttonContainer">
      <Button
        style={{ width: 100, height: 35 }}
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {type}
      </Button>
    </div>
  );
};
