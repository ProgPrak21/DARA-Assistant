import * as React from "react";
import { Entry } from "./Entry";
import { Grid } from "@material-ui/core";

type props = {
  actions: Array<string>;
};

export const Popup = ({ actions }: props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          DARA Data Request Assistant
        </Grid>
        {actions
          ? <> { actions.map((action:any) => <Entry type={action}/> ) } </>
          : <div>'Pending'</div>}
      </Grid>
    </>
  );
};