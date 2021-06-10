import * as React from "react";
import { Entry } from "./Entry";
import { Grid } from "@material-ui/core";



export const Popup = () => {

  let [actions, setActions] = React.useState<Array<string>>([]);

  if (!actions.length) {
    chrome.runtime.sendMessage({ getActions: true });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.actions) {
        setActions(message.actions);
        chrome.runtime.onMessage.removeListener(message);
      }
    });
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          DARA Data Request Assistant
        </Grid>
        {actions
          ? <> {actions.map((action: any) => <Entry action={action} />)} </>
          : <div>'Pending'</div>}
      </Grid>
    </>
  );
};