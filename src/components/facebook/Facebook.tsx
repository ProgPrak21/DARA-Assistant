import * as React from "react";
import { Btn } from "../facebook/Button";
import { RequestInfo } from "../facebook/RequestInfo";
import { StatusInfo } from "../facebook/StatusInfo";
import { DownloadInfo } from "../facebook/DownloadInfo";
import { Grid } from "@material-ui/core";

export const Facebook = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          FACEBOOK
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Btn type={"request"} />
        </Grid>
        <Grid item xs={6}>
          <RequestInfo />
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Btn type={"check"} />
        </Grid>
        <Grid item xs={6}>
          <StatusInfo />
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
