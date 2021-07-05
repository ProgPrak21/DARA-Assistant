import * as React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const Emoji = (prop: { label: string | undefined; symbol: any; }) => (
  <span
    className="emoji"
    role="img"
    aria-label={prop.label ? prop.label : ""}
    aria-hidden={prop.label ? "false" : "true"}
  >
    {prop.symbol}
  </span>
)

export const NoSupport = () => {
  const onClick = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('overview.html'), active: true });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography> <Emoji label="sad" symbol="😔" /> the current page is not supported. </Typography>
      </Grid>

      <Grid item xs={12} className="Grid-item">
        <Button
          variant='contained'
          size='small'
          color="primary"
          onClick={onClick}
          fullWidth={true}
        >
          Supported Companies
        </Button>
      </Grid>

      <Grid item xs={12} className="Grid-item">
        <Typography variant='caption' align='justify'>
          DARA is a community effort, if you think this page supports browser based data access requests,
          please consider <a className="App-link" target="_blank" href="https://github.com/ProgPrak21/DARA-Assistant"> contributing</a>.
        </Typography>
      </Grid>
    </>
  );
};