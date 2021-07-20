import * as React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

export const Entry = ({ action }: { action: string }) => {
  const onClick = () => {
    if (action === 'download') {
      chrome.permissions.request({
        permissions: ['downloads']
      }, function (granted) {
        // The callback argument will be true if the user granted the permissions.
        if (granted) {
          chrome.runtime.sendMessage({ action: action });
        } else {
          chrome.runtime.sendMessage({ actionResponse: "No sufficient permissions to download." });
        }
      });
    } else {
      chrome.runtime.sendMessage({ action: action });
    }
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
          {'Click ' + action.toUpperCase() + ' to let DARA ' + action + ' your data for you. You may need to login first.'}
        </Typography>
      </Grid>
    </>
  );
};