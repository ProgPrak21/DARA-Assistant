import * as React from "react";

type props = {
  type: string;
};

export const Button: React.FC<props> = ({ type }) => {
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
      <button onClick={onClick}>{type}</button>
    </div>
  );
};
