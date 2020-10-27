import React from "react";
import image from "../assets/gameScene.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    // margin: "auto",
    height: "auto",
    backgroundColor: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.light}`,
  },
  gameImage: { display: "block" },
}));

export default function Gameboard() {
  const classes = useStyles();

  // const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  return (
    <Paper elevation={3} className={classes.gameContainer}>
      <img className={classes.gameImage} alt="game scene" src={image} />
    </Paper>
  );
}
