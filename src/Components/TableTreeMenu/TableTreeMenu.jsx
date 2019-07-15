import React, { useState, useEffect } from "react";

//material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

//Data
import initialRows from './TableTreeMenuApi';

const TreeTable = () => {
  /*----------------------------------- States --------------------------------*/
  let [rows,setRows] = useState([]);
  /*----------------------------------- Effect --------------------------------*/
  useEffect(()=>{
    setRows(getNestedChildren(initialRows,undefined))
  },[])
  /*--------------------------------------------------------------------------------*/
  const getNestedChildren= (arr, parent) => {
    let out = []
     for(let i in arr) {
         if(arr[i].parentId == parent) {
             let children = getNestedChildren(arr, arr[i].id)
 
             if(children.length) {
                 arr[i].children = children
             }
             out.push(arr[i])
         }
     }
     return out
 }
  /*--------------------------------------------------------------------------------*/
 const renderNested = (row,index) => {
    return(
      <>
        {row.children === undefined ?
          <TableRow key={index}>
            <TableCell align="left">{row.Name}</TableCell>
            <TableCell align="left">{row.Gender}</TableCell>
            <TableCell align="left">{row.Age}</TableCell>
            <TableCell align="left">{row.Homeland}</TableCell>
            <TableCell align="left">{row.Grade}</TableCell>
          </TableRow>
          :
          <>
              <ExpansionPanel key={index} style={{ background: "#fafafa" }}>
                <ExpansionPanelSummary
                  key={index}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                <Typography component={"span"} key={index}>
                  <TableRow key={index}>
                    <TableCell align="left">{row.Name}</TableCell>
                    <TableCell align="left">{row.Gender}</TableCell>
                    <TableCell align="left">{row.Age}</TableCell>
                    <TableCell align="left">{row.Homeland}</TableCell>
                    <TableCell align="left">{row.Grade}</TableCell>
                  </TableRow>
                </Typography>
                </ExpansionPanelSummary>
              {row.children.map((child,index) =>
                <ExpansionPanelDetails key={index}>
                  <Grid item xs={12}>
                    <Typography component={"span"} key={index}>
                      {renderNested(child)}
                    </Typography>
                  </Grid>
                </ExpansionPanelDetails>
                )}
              </ExpansionPanel>
          </>
        }
    </>
    )
 }
  /*-----------------------------------Default Render--------------------------------*/
  const defaultRender = () => {
    return (
      <div className="panel">
        <header className="panel-heading">User Information</header>
        <div className="panel-body">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                      <span>Name</span>
                  </TableCell>
                  <TableCell>
                      <span>Gender</span>
                  </TableCell>
                  <TableCell>
                      <span>Age</span>
                  </TableCell>
                  <TableCell>
                      <span>Homeland</span>
                  </TableCell>
                  <TableCell>
                      <span>Grade</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) =>
                  renderNested(row,index) 
                  )
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  };
  /*----------------------------------------------------------------------------------*/
  return (
    <>
      {defaultRender()}
    </>
  );
};

export default TreeTable;
