import * as React from "react";
import { Entry } from "./Entry";
import { NoSupport } from "./NoSupport";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';
import LinkIcon from '@material-ui/icons/Link';
import FindInPageIcon from '@material-ui/icons/FindInPage';

let connector: any = {};

export const Popup = () => {

  const [actions, setActions] = React.useState<Array<string>>([]);
  const [description, setDescription] = React.useState<string>("");
  const [support, setSupport] = React.useState<boolean>(true);
  const [response, setResponse] = React.useState<string>("");


  if (Object.keys(connector).length === 0) {
    chrome.runtime.sendMessage({ getConnector: true });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.connector) {
        connector = message.connector;
        setActions(connector.actions);
        setDescription(connector.description);
        chrome.runtime.onMessage.removeListener(message);
      } else if (message.notSupported) {
        setSupport(false);
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

        {response &&
          <Grid item xs={12} className="Grid-item">
            <Typography align='justify'>
              {response}
            </Typography>
          </Grid>
        }

        {description &&
          <Grid item xs={12} className="Grid-item">
            <Typography variant='caption' align='justify'>
              {description}
            </Typography>
          </Grid>
        }

        {actions &&
          actions.map((action) =>
            <Entry action={action} />
          )
        }

        {!support &&
          <NoSupport />
        }

        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>

        <Grid item xs={12} style={{textAlign: "left"}}>

        {connector.requestUrl &&
            <Button
              style={{
                //textTransform: "none"
              }}
              variant='text'
              size='small'
              href={connector.requestUrl}
              target="_blank"
              startIcon={<LinkIcon />}
            >
              Data Request Page
            </Button>}

          <Button
            style={{
              //textTransform: "none"
            }}
            variant='text'
            size='small'
            href="https://dara-tuberlin.netlify.app/"
            target="_blank"
            title="Open the DARA analysing tool. There you can submit previously requested data to gain further insights."
            startIcon={<LinkIcon />}
          >
            Analyse Tool
          </Button>

          {/*<Typography variant='caption'>
            Open the DARA analysing tool.
          </Typography>*/}
        </Grid>
      </Grid>
    </>
  );
};