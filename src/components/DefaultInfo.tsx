import * as React from "react";
import { Button, Grid } from "@material-ui/core";
import { capitalize } from "@material-ui/core";
import { Typography } from "@material-ui/core";

type props = {
  hostname: string;
};

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

// TODO: Update Links for Github and Available Connector overview.

export const DefaultInfo = ({ hostname }: props) => {

  const onClick = () => {
    chrome.tabs.create({ url: chrome.extension.getURL('overview.html'), active: true });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography> <Emoji label="sad" symbol="😔" /> the current page is not supported. </Typography>
      </Grid>

      <Grid item xs={12}>

        <Button
          style={{
            //textTransform: "none"
          }}
          variant='contained'
          size='small'
          color="primary"
          onClick={onClick}
          fullWidth={true}
        >
          View Supported Pages
        </Button>
      </Grid>

      <Grid item xs={12} className="Grid-item">
        <Typography variant='caption' align='justify'>
          DARA is a community effort, if you think this page supports browser based data access requests,
          please consider <a className="App-link" target="_blank" href="https://github.com/ProgPrak21/react-ts-extension"> contributing</a>.
        </Typography>
      </Grid>
    </>
  );
};


