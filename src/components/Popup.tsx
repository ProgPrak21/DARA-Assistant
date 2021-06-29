import * as React from "react";
import { Entry } from "./Entry";
import { DefaultInfo } from "./DefaultInfo";
import { Button, Divider, Grid, Typography } from "@material-ui/core";

export const Popup = () => {

  const [actions, setActions] = React.useState<Array<string>>([]);
  const [hostname, setHostname] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [response, setResponse] = React.useState<string | undefined>("");


  if (!actions.length) {
    chrome.runtime.sendMessage({ getActions: true });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.actions) {
        setActions(message.actions);
        setDescription(message.description);
        chrome.runtime.onMessage.removeListener(message);
      } else if (message.hostname) {
        setHostname(message.hostname);
        chrome.runtime.onMessage.removeListener(message);
      } else if (message.actionResponse) {
        setResponse(message.actionResponse);
        chrome.runtime.onMessage.removeListener(message);
      }
    });
  }

  return (
    <>
      <Grid container spacing={2}>
        {description &&
          <Grid item xs={12} className="Grid-item">
            <Typography variant='caption' align='justify'>
              {description}
            </Typography>
          </Grid>
        }

        {
          actions.length ?
            <>
              {actions.map((action) =>
                <Entry action={action} />
              )}
            </>
            : <DefaultInfo hostname={hostname} />
        }

        {response &&
          <Grid item xs={12} className="Grid-item">
            <Typography variant='caption' align='justify'>
              {response}
            </Typography>
          </Grid>
        }

        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        
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
            Click ANALYSE to open the DARA analysing tool. There you can submit previously requested data to gain further insights.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};