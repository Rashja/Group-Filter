import React, { useState } from "react";

//material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//components
import SimpleExpansionPanel from "./../Expantion/Expantion";
import Draggable from "./../Dnd/Draggable/Draggable";
import Droppable from "./../Dnd/Droppable/Droppable";

const SimpleTable = () => {
  const createData = (Name, Gender, Age, Homeland, Grade) => {
    return { Name, Gender, Age, Homeland, Grade };
  };
  /*-------------------------------initial States-----------------------------*/
  const initialRows = [
    createData("Rachel", "female", 24, "New York", 90),
    createData("Ross", "male", 27, "California", 85),
    createData("sylvanas", "female", 28, "Tokyo", 100),
    createData("Alarak", "male", 25, "Chicago", 95),
    createData("Tracer", "female", 23, "Washington DC", 90)
  ];
  const initialFilters = {
    rowsFilter: "",
    reverseFilter: ""
  };
  /*----------------------------------- States --------------------------------*/
  let [rows] = useState(initialRows);
  let [filter, setFilter] = useState(initialFilters);
  let [expantionMode, setExpantionMode] = useState(false);

  /*--------------------------------------------------------------------------------*/
  const handleMode = mode => {
    setExpantionMode(true);
    setFilter((filter = { ...initialFilters, rowsFilter: mode }));
  };
  /*--------------------------------------------------------------------------------*/
  const handleReverse = reverse => {
    setFilter((filter = { ...initialFilters, reverseFilter: reverse }));
  };
  /*--------------------------------------------------------------------------------*/
  const returnDefault = () => {
    setExpantionMode(false);
    setFilter(initialFilters);
  };
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
                    <Draggable id="Name">
                      <span>Name</span>
                    </Draggable>
                  </TableCell>
                  <TableCell>
                    <Draggable id="Gender">
                      <span>Gender</span>
                    </Draggable>
                  </TableCell>
                  <TableCell>
                    <Draggable id="Age">
                      <span>Age</span>
                    </Draggable>
                  </TableCell>
                  <TableCell>
                    <Draggable id="Homeland">
                      <span>Homeland</span>
                    </Draggable>
                  </TableCell>
                  <TableCell>
                    <Draggable id="Grade">
                      <span>Grade</span>
                    </Draggable>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.Name}</TableCell>
                    <TableCell align="left">{row.Gender}</TableCell>
                    <TableCell align="left">{row.Age}</TableCell>
                    <TableCell align="left">{row.Homeland}</TableCell>
                    <TableCell align="left">{row.Grade}</TableCell>
                  </TableRow>
                ))}
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
      <Droppable
        GetMode={mode => handleMode(mode)}
        GetReverseFilter={reverse => handleReverse(reverse)}
      />
      {expantionMode === false ? (
        defaultRender()
      ) : (
        <SimpleExpansionPanel
          rowsFilter={filter.rowsFilter}
          reverseFilter={filter.reverseFilter}
          options={rows}
          ReturnDefault={def => returnDefault(def)}
        />
      )}
    </>
  );
};

export default SimpleTable;
