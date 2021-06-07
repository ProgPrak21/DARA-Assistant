import * as React from "react";
import { Button } from "@material-ui/core";
import { buildConfig } from '../connectors/.';

type props = {
  type: string;
};

async function getRequestUrl(url:string) {
  const connectors = await buildConfig();
  const { hostname } = new URL(url);
  console.log(connectors);
  const connector = connectors.find(connector => hostname.includes(connector.hostname));
  return connector.requestUrl
}

export const Btn: React.FC<props> = ({ type }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      const url = tab.url ? await getRequestUrl(tab.url) : false;
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
