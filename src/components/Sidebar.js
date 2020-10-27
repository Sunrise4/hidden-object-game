import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    alignSelf: "stretch",
    height: "auto",
    width: "200px",
    background: theme.palette.primary.light,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Paper variant="outlined" elevation={3} className={classes.paper}>
      test
    </Paper>
  );
}
