import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: "1",
  // },
  gameScene: {
    margin: "auto",
    height: "800px",
    width: "1000px",
    background: theme.palette.primary.main,
  },
}));

export default function Gameboard() {
  const classes = useStyles();
  return <Box className={classes.gameScene}></Box>;
}
