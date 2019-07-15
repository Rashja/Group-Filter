import React, { PureComponent } from "react";

// material-ui
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

// components
import Draggable from "./../Dnd/Draggable/Draggable";

// lodash
const _ = require("lodash");

class SimpleExpansionPanel extends PureComponent {
  /*-------------------------------------------states------------------------------------- */
  state = {
    options: {},
    rowsFilter: "",
    nextOptions: {},
    keyRows: [],
    reverseFilter: ""
  };
  /*-------------------------------------------Life Cycles--------------------------------- */
  static getDerivedStateFromProps(props, state) {
    let { rowsFilter, reverseFilter } = props;

    let keyRows;
    keyRows = [...state.keyRows, rowsFilter];
    if (reverseFilter !== state.reverseFilter) {
      keyRows = state.keyRows.filter(item => item !== reverseFilter);
    }
    if (
      rowsFilter !== state.rowsFilter ||
      reverseFilter !== state.reverseFilter
    ) {
      return {
        keyRows: keyRows,
        rowsFilter: props.rowsFilter
      };
    }

    return null;
  }
  /*--------------------------------------Create Nest Obj----------------------------------- */
  handleNest = (seq, keys) => {
    if (!keys.length) return seq;
    var first = keys[0];
    var rest = keys.slice(1);
    return _.mapValues(_.groupBy(seq, first), value => {
      return this.handleNest(value, rest);
    });
  };
  /*-----------------------------------------Render Table----------------------------------- */
  renderTable = infoes => {
    let { keyRows } = this.state;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {keyRows.includes("Name") === false && (
                <TableCell>
                  <Draggable id="Name">
                    <span>Name</span>
                  </Draggable>
                </TableCell>
              )}
              {keyRows.includes("Gender") === false && (
                <TableCell>
                  <Draggable id="Gender">
                    <span>Gender</span>
                  </Draggable>
                </TableCell>
              )}
              {keyRows.includes("Age") === false && (
                <TableCell>
                  <Draggable id="Age">
                    <span>Age</span>
                  </Draggable>
                </TableCell>
              )}
              {keyRows.includes("Homeland") === false && (
                <TableCell>
                  <Draggable id="Homeland">
                    <span>Homeland</span>
                  </Draggable>
                </TableCell>
              )}
              {keyRows.includes("Grade") === false && (
                <TableCell>
                  <Draggable id="Grade">
                    <span>Grade</span>
                  </Draggable>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {infoes.map((info, index) => (
              <TableRow key={index}>
                {keyRows.includes("Name") === false && (
                  <TableCell align="left">{info.Name}</TableCell>
                )}
                {keyRows.includes("Gender") === false && (
                  <TableCell align="left">{info.Gender}</TableCell>
                )}
                {keyRows.includes("Age") === false && (
                  <TableCell align="left">{info.Age}</TableCell>
                )}
                {keyRows.includes("Homeland") === false && (
                  <TableCell align="left">{info.Homeland}</TableCell>
                )}
                {keyRows.includes("Grade") === false && (
                  <TableCell align="left">{info.Grade}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };
  /*-----------------------------------------Render Nested Table-------------------------------- */
  renderNested = nestOptions => {
    return Object.keys(nestOptions).map((title, index) => {
      if (
        typeof nestOptions === "object" &&
        Array.isArray(nestOptions[title])
      ) {
        return (
          <ExpansionPanel style={{ background: "#fafafa" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component={"span"}>{title}</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Grid item xs={12}>
                <Typography component={"span"}>
                  {this.renderTable(nestOptions[title])}
                </Typography>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      } else {
        return (
          <ExpansionPanel key={index} style={{ background: "#fafafa" }}>
            <ExpansionPanelSummary
              key={index}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component={"span"} key={index}>
                {title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails key={index}>
              <Grid item xs={12}>
                <Typography component={"span"} key={index}>
                  {this.renderNested(nestOptions[title])}
                </Typography>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
    });
  };
  /*------------------------------------------Render-------------------------------------- */
  render() {
    let { options, ReturnDefault } = this.props;
    let { keyRows } = this.state;
    let nestOptions = this.handleNest(options, keyRows);
    return (
      <div>
        {keyRows.length > 0
          ? this.renderNested(nestOptions)
          : ReturnDefault(keyRows)}
      </div>
    );
  }
}

export default SimpleExpansionPanel;