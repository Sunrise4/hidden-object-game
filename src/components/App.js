import React from "react";
import Gameboard from "./Gameboard";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    background: theme.palette.primary.dark,
    alignItems: "center",
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
