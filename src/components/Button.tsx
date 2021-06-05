import * as React from "react";
import { Button } from "@material-ui/core";

type props = {
  type: string;
  url: string;
};

export const Btn: React.FC<props> = ({ url, type }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, () => {
      chrome.tabs.update(
        {
          url: url,
        },
        (tab) => {
          //send a msg to background script
          chrome.runtime.sendMessage({ ...tab, type: type });
        }
      );
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
