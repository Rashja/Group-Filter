import React, { useState, useEffect } from "react";
//material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Data
import initialRows from './TableTreeMenuApi';

const TreeTable = () => {
  /*----------------------------------- States --------------------------------*/
  let [rows,setRows] = useState([]);
  let [child,setChild] = useState([]);
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
  const handleChild = (id) => {
      if(child.includes(id)){
        setChild(child=child.filter(filterRow=>
            id !== filterRow
        ))
      }else{
        setChild([...child,id])
      }
  }
  /*--------------------------------------------------------------------------------*/
  const renderNested = (rows) => {
    return(
        <>
            {rows.map(row=>
                <>
                    <TableRow onClick={(e)=>handleChild(row.id)} >
                        <TableCell id={row.id} align="left">{row.Name}</TableCell>
                        <TableCell id={row.id} align="left">{row.Gender}</TableCell>
                        <TableCell id={row.id} align="left">{row.Age}</TableCell>
                        <TableCell id={row.id} align="left">{row.Homeland}</TableCell>
                        <TableCell id={row.id} align="left">{row.Grade}</TableCell>
                    </TableRow>
                     { row.children && row.children.length && child.indexOf(row.id) !==-1?
                       (
                         <TableRow>
                           <TableCell Colspan="5">
                             {renderTable(row.children)}
                           </TableCell>
                         </TableRow>
                       ) : null
                     }
                 </>
            )}
      </>
    )
 }
  /*-----------------------------------Table--------------------------------*/
  const renderTable = rows => {
    return(
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
          {renderNested(rows)}
        </TableBody>
      </Table>
      </Paper>

    )
  }
  /*-----------------------------------Default Render--------------------------------*/
  const defaultRender = () => {
    return (
      <div className="panel">
        <header className="panel-heading">User Information</header>
        <div className="panel-body">
            {renderTable(rows)}
        </div>
      </div>
    );
  };
  /*----------------------------------------------------------------------------------*/
  return (
    <>{defaultRender()}</>
  );
};

export default TreeTable;
