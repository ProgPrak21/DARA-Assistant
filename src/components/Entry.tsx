import * as React from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";


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
            <Grid style={{ textAlign: "left" }} item xs={6}>
                <div className="buttonContainer">
                    <Button
                        style={{ width: 100, height: 35 }}
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                    >
                        {action}
                    </Button>
                </div>
            </Grid>
            <Grid item xs={6} className="Grid-item">
                <span>
                    {status
                        ? status
                        : `Click ${action} to ${action} your data.`}
                </span>
            </Grid>
        </>
    );
};


