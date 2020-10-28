import React, { useState, useRef } from "react";
import image from "../assets/gameScene.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, ClickAwayListener } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Item = styled(Box)({
  position: "absolute",
  border: "3px solid red",
  pointerEvents: "none",
});

const useStyles = makeStyles((theme) => ({
  gameContainer: {
    position: "relative",
    height: "auto",
    backgroundColor: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.light}`,
    overflow: "hidden",
  },
  gameImage: {
    display: "block",
    userSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
  },
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
  const found = "3px solid red";
  const hidden = "3px solid blue";
  const classes = useStyles();
  const [markerPosition, setMarkerPosition] = useState({ cordX: 0, cordY: 0 });
  const [markerVisibility, setMarkerVisibility] = useState("hidden");
  const [butterflyFound, setButterflyFound] = useState(false);
  const [caneFound, setCaneFound] = useState(false);
  const [catFound, setCatFound] = useState(false);
  const [marsFound, setMarsFound] = useState(false);
  const [pipeWrenchFound, setPipeWrenchFound] = useState(false);
  const butterfly = useRef();

  const placeItemMarker = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMarkerPosition({
      cordX: e.clientX - rect.left - 15,
      cordY: e.clientY - rect.top - 15,
    });
    if (markerVisibility !== "visible") {
      setMarkerVisibility("visible");
    }
  };

  const handleClickAway = () => {
    if (markerVisibility !== "hidden") {
      setMarkerVisibility("hidden");
    }
  };

  return (
    <Paper elevation={3} className={classes.gameContainer}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <img
          className={classes.gameImage}
          onClick={placeItemMarker}
          alt="game scene"
          src={image}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        />
      </ClickAwayListener>
      <Item
        ref={butterfly}
        className={classes.butterfly}
        style={{ border: butterflyFound ? found : hidden }}
        id="butterfly"
      ></Item>
      <Item
        className={classes.cane}
        style={{ border: caneFound ? found : hidden }}
        id="cane"
      ></Item>
      <Item
        className={classes.cat}
        style={{ border: catFound ? found : hidden }}
        id="cat"
      ></Item>
      <Item
        className={classes.mars}
        style={{ border: marsFound ? found : hidden }}
        id="mars"
      ></Item>
      <Item
        className={classes.pipeWrench}
        style={{ border: pipeWrenchFound ? found : hidden }}
        id="pipe wrench"
      ></Item>
      <div
        className={classes.marker}
        style={{
          left: markerPosition.cordX,
          top: markerPosition.cordY,
          visibility: markerVisibility,
        }}
        id="marker"
      ></div>
    </Paper>
  );
}
