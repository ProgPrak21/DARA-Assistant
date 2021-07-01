import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { description } from "../connectors/amazon";

type props = {
  action: string;
};

export const Entry = ({ action }: props) => {
  const [status, setStatus] = React.useState<string | undefined>("");
  const onClick = () => {
    chrome.runtime.sendMessage({ action: action });
    chrome.runtime.onMessage.addListener(function onMessage(message) {
      if (message.actionResponse) {
        setStatus(message.actionResponse);
        chrome.runtime.onMessage.removeListener(onMessage);
      }
    });
  };

  return (
    <>
      <Grid item xs={12} className="Grid-item">
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          fullWidth={true}
        >
          {action}
        </Button>
      </Grid>
      <Grid item xs={12} className="Grid-item">
        <Typography variant='caption' align='justify'>
          {'Click ' + action.toUpperCase() + ' to ' + action + ' your data. You may need to login first.'}
        </Typography>
      </Grid>
    </>
  );
};


