import * as React from "react";
import { Button } from "@material-ui/core";

type props = {
  type: string;
};

export const Btn: React.FC<props> = ({ type }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, () => {
      chrome.tabs.update(
        {
          url: "https://www.facebook.com/dyi/?referrer=yfi_settings",
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
