import React from "react";
import TabSimpleTablele from "./Table/Table";
import Grid from "@material-ui/core/Grid";
const App = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={9}>
        <TabSimpleTablele />
      </Grid>
    </Grid>
  );
};
export default App;
