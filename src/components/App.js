import React from "react";
import Gameboard from "./Gameboard";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    marginTop: "60px",
    height: "800px",
    minWidth: "100vw",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Gameboard />
      <Sidebar />
    </div>
  );
}

export default App;
