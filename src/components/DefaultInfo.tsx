import * as React from "react";
import { Grid } from "@material-ui/core";

type props = {
    hostname: string;
};

// TODO: Update Links for Github and Available Connector overview.

export const DefaultInfo = ({ hostname }: props) => {

    const onClick = () => {
        chrome.tabs.create({url: chrome.extension.getURL('overview.html'), active: true});
    };

    return (
        <>
            <Grid item xs={12}>
                <p>
                    We currently don't support automated requests on {hostname}.
                    You may send an email based request via <a className="App-link" target="_blank" href="https://www.mydatadoneright.eu/cy/request/type">My Data Done Right</a>.
                </p>
                <p>
                    A list of <a className="App-link" onClick={onClick}>available companies</a>.
                </p>
                <p>
                    DARA is a community effort, if you think this page supports browser based data access requests, 
                    please consider contributing a connector at <a className="App-link" target="_blank" href="https://github.com/ProgPrak21/react-ts-extension">Github</a>.
                </p>
            </Grid>
        </>
    );
};


