import React, { useState } from "react";

//material-ui
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

//Components
import TabSimpleTablele from "./Table/Table";
import TreeTable from './TableTreeMenu/TableTreeMenu';

const App = () => {
  const [mode,SetMode]=useState(false);
  const handleMode = () =>{
    SetMode(!mode)
  }
  return (
    <>
      <div className='button-change-title' >
        <Button onClick={handleMode} variant="contained" color="secondary">
          {mode ? 'Table Tree' : 'Group Filter'}
        </Button>
      </div>
      {mode ? 
        <TreeTable /> :
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={9}>
            <TabSimpleTablele />
          </Grid>
        </Grid>
      }
    </>
  );
};
export default App;
