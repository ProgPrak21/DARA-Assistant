import * as React from "react";
import { Entry } from "./Entry";
import { DefaultInfo } from "./DefaultInfo";
import { Grid } from "@material-ui/core";



export const Popup = () => {

  const [actions, setActions] = React.useState<Array<string>>([]);
  const [hostname, setHostname] = React.useState<string>("");

  if (!actions.length) {
    chrome.runtime.sendMessage({ getActions: true });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.actions) {
        setActions(message.actions);
        chrome.runtime.onMessage.removeListener(message);
      } else if (message.hostname) {
        setHostname(message.hostname);
        chrome.runtime.onMessage.removeListener(message);
      }
    });
  }

  return (
    <>
      <Grid container spacing={2}>
      <Grid item xs={12} className="App-header">
        <span>DARA Data Request Assistant</span>
      </Grid>
        {actions.length
          ? <> {actions.map((action: any) => <Entry action={action} />)} </>
          : <DefaultInfo hostname={hostname} />}
      </Grid>
    </>
  );
};