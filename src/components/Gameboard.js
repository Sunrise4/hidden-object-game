import React, { useState } from "react";
import image from "../assets/gameScene.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { styled } from "@material-ui/core/styles";

const Item = styled(Box)({
  position: "absolute",
  border: "3px solid red",
  pointerEvents: "none",
});

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    // margin: "auto",
    position: "relative",
    height: "auto",
    backgroundColor: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.light}`,
    overflow: "hidden",
  },
  gameImage: { display: "block" },
  butterfly: {
    top: 395,
    left: 345,
    height: 55,
    width: 56,
  },
  cane: {
    top: 275,
    left: 686,
    height: 202,
    width: 45,
    transform: "rotate(5deg)",
  },
  cat: {
    top: 222,
    left: 310,
    height: 52,
    width: 60,
  },
  mars: {
    top: 192,
    left: 548,
    height: 60,
    width: 58,
  },
  pipeWrench: {
    top: 596,
    left: 495,
    height: 45,
    width: 142,
    transform: "rotate(-10deg)",
  },
  marker: {
    position: "absolute",
    height: 30,
    width: 30,
    top: 0,
    left: 0,
    borderRadius: "50%",
    border: "2px dashed black",
    background: "rgba(255,255,255,.2)",
    boxShadow: "0px 0px 6px 4px lightblue",
    visibility: "visible",
    pointerEvents: "none",
  },
}));

export default function Gameboard() {
  const classes = useStyles();
  const [markerPosition, setMarkerPosition] = useState({ cordX: 0, cordY: 0 });

  const placeItemMarker = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMarkerPosition({
      cordX: e.clientX - rect.left - 15,
      cordY: e.clientY - rect.top - 15,
    });
  };

  // const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
  return (
    <Paper elevation={3} className={classes.gameContainer}>
      <img
        className={classes.gameImage}
        onClick={placeItemMarker}
        alt="game scene"
        src={image}
      />
      <div
        className={classes.marker}
        style={{ left: markerPosition.cordX, top: markerPosition.cordY }}
        id="marker"
      ></div>
      <Item className={classes.butterfly} id="butterfly"></Item>
      <Item className={classes.cane} id="cane"></Item>
      <Item className={classes.cat} id="cat"></Item>
      <Item className={classes.mars} id="mars"></Item>
      {/* <div className={classes.pipeWrench} id="pipe wrench"></div> */}
      <Item className={classes.pipeWrench} id="pipe wrench"></Item>
    </Paper>
  );
}
