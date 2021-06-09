import * as React from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";


type props = {
    type: string;
};

export const Entry = ({ type }: props) => {
    const [status, setStatus] = React.useState<string | undefined>("");
    const onClick = () => {
        chrome.runtime.sendMessage({ type: type });
        chrome.runtime.onMessage.addListener(function onMessage(message){
            if (message.requestState){
              chrome.runtime.onMessage.removeListener(onMessage);
              setStatus(message.requestState);
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
                        {type}
                    </Button>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div>
                    {status
                        ? status
                        : `Click ${type} to ${type} your data when they are ready!`}
                </div>
            </Grid>
        </>
    );
};


