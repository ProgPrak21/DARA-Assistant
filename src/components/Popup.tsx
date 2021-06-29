import * as React from "react";
import { Entry } from "./Entry";
import { DefaultInfo } from "./DefaultInfo";
import { Button, Grid, Typography } from "@material-ui/core";



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
        {actions.length
          ? <> {actions.map((action) =>
            <Entry action={action} />
          )} </>
          : <DefaultInfo hostname={hostname} />}
        
        <Grid item xs={12}>
        <Button
            style={{
              //textTransform: "none"
            }}
            variant='outlined'
            size='small'
            href="https://dara-tuberlin.netlify.app/"
            target="_blank"
            fullWidth={true}
          >
            Analyse
          </Button>
        </Grid>

        <Grid item xs={12} className="Grid-item">
          <Typography variant='caption' align='justify'>
            Open the DARA analysing tool, to gain further insight in your requested data.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};