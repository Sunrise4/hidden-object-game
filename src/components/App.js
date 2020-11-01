import React, { useState } from "react";
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
  const [foundItems, setFoundItems] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const onItemFound = (value) => {
    setFoundItems([...foundItems, value]);
  };

  const onGameStart = () => {
    setStarted(true);
  };

  const onGameFinish = () => {
    setFinished(true);
  };
  return (
    <div className={classes.root}>
      <Gameboard
        foundItems={foundItems}
        onItemFound={onItemFound}
        started={started}
        onGameStart={onGameStart}
        onGameFinish={onGameFinish}
        finished={finished}
      />
      <Sidebar finished={finished} foundItems={foundItems} started={started} />
    </div>
  );
}

export default App;
