import * as React from "react";
import { Entry } from "./Entry";
import { NoSupport } from "./NoSupport";
import { Button, capitalize, Divider, Grid, Typography } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';

let connector: any = {};

export const Popup = () => {
  const [actions, setActions] = React.useState<Array<string>>([]);
  const [description, setDescription] = React.useState<string>("");
  const [support, setSupport] = React.useState<boolean>(true);
  const [response, setResponse] = React.useState<string>("");

  React.useEffect(() => {
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
  }, []);

  const onClick = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('overview.html'), active: true });
  };

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

        {support &&
          <>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "left" }}>

              {connector.requestUrl &&
                <Button
                  variant='text'
                  style={{
                    textTransform: "none"
                  }}
                  size='small'
                  href={connector.requestUrl}
                  target="_blank"
                  startIcon={<LinkIcon />}
                >
                  {capitalize(connector.name)} Request Page
                </Button>}

              <Button
                variant='text'
                style={{
                  textTransform: "none"
                }}
                size='small'
                onClick={onClick}
                title=""
                startIcon={<LinkIcon />}
              >
                Supported Companies
              </Button>
            </Grid>
          </>
        }
      </Grid>
    </>
  );
};