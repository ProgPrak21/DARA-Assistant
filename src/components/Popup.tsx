import * as React from "react";
import { Btn } from "./Button";
import { RequestInfo } from "./RequestInfo";
import { DownloadInfo } from "./DownloadInfo";
import { Grid } from "@material-ui/core";

export const Popup = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          DARA
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Btn type={"request"} />
        </Grid>
        <Grid item xs={6}>
          <RequestInfo />
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Btn type={"download"} />
        </Grid>
        <Grid item xs={6}>
          <DownloadInfo />
        </Grid>
      </Grid>
    </>
  );
};