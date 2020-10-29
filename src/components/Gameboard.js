import React, { useState, useRef, useEffect, useCallback } from "react";
import image from "../assets/gameScene.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  ClickAwayListener,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

let Item = styled(Box)({
  position: "absolute",
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
    position: "absolute",
    pointerEvents: "none",
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
  formControl: {
    position: "absolute",
    top: 50,
    left: 50,
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Gameboard() {
  const found = "3px solid red";
  const hidden = "3px solid blue";
  const classes = useStyles();
  const [markerPosition, setMarkerPosition] = useState({ cordX: 0, cordY: 0 });
  const [markerVisibility, setMarkerVisibility] = useState("visible");
  const [butterflyFound, setButterflyFound] = useState(false);
  const [caneFound, setCaneFound] = useState(false);
  const [catFound, setCatFound] = useState(false);
  const [marsFound, setMarsFound] = useState(false);
  const [pipeWrenchFound, setPipeWrenchFound] = useState(false);
  const [itemSelection, setItemSelection] = useState("butterfly");
  const butterfly = useRef();
  const cane = useRef();
  const cat = useRef();
  const mars = useRef();
  const pipeWrench = useRef();
  const marker = useRef();

  const overlaps = (function () {
    function getPositions(elem) {
      var width = parseFloat(
        getComputedStyle(elem, null).width.replace("px", "")
      );
      var height = parseFloat(
        getComputedStyle(elem, null).height.replace("px", "")
      );
      return [
        [elem.offsetLeft, elem.offsetLeft + width],
        [elem.offsetTop, elem.offsetTop + height],
      ];
    }

    function comparePositions(p1, p2) {
      var r1 = p1[0] < p2[0] ? p1 : p2;
      var r2 = p1[0] < p2[0] ? p2 : p1;
      return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (a, b) {
      var pos1 = getPositions(a),
        pos2 = getPositions(b);
      return (
        comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1])
      );
    };
  })();

  const placeItemMarker = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newPosition = {
      cordX: e.clientX - rect.left - 15,
      cordY: e.clientY - rect.top - 15,
    };
    if (
      markerPosition.cordX !== newPosition.cordX ||
      markerPosition.cordY !== newPosition.cordY
    ) {
      setMarkerPosition(newPosition);
    }
    if (markerVisibility !== "visible") {
      setMarkerVisibility("visible");
    }
  };

  const handleClickAway = () => {
    if (markerVisibility !== "hidden") {
      setMarkerVisibility("hidden");
    }
  };

  const checkForOverlaps = useCallback(() => {
    if (
      overlaps(marker.current, butterfly.current) &&
      itemSelection === butterfly.current.id &&
      !butterflyFound
    ) {
      setButterflyFound(true);
    } else if (
      overlaps(marker.current, cane.current) &&
      itemSelection === cane.current.id &&
      !caneFound
    ) {
      setCaneFound(true);
    } else if (
      overlaps(marker.current, cat.current) &&
      itemSelection === cat.current.id &&
      !catFound
    ) {
      setCatFound(true);
    } else if (
      overlaps(marker.current, mars.current) &&
      itemSelection === mars.current.id &&
      !marsFound
    ) {
      setMarsFound(true);
    } else if (
      overlaps(marker.current, pipeWrench.current) &&
      itemSelection === pipeWrench.current.id &&
      !pipeWrenchFound
    ) {
      setPipeWrenchFound(true);
    }
  }, [
    butterflyFound,
    catFound,
    caneFound,
    marsFound,
    pipeWrenchFound,
    itemSelection,
    overlaps,
  ]);

  useEffect(() => {
    checkForOverlaps();
  }, [markerPosition, checkForOverlaps]);

  const handleSelectorChange = (e) => {
    setItemSelection(e.target.value);
  };

  return (
    <Paper elevation={3} className={classes.gameContainer}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <img
          className={classes.gameImage}
          alt="game scene"
          src={image}
          onMouseDown={(e) => {
            e.preventDefault();
            placeItemMarker(e);
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
        ref={cane}
        className={classes.cane}
        style={{ border: caneFound ? found : hidden }}
        id="cane"
      ></Item>
      <Item
        ref={cat}
        className={classes.cat}
        style={{ border: catFound ? found : hidden }}
        id="cat"
      ></Item>
      <Item
        ref={mars}
        className={classes.mars}
        style={{ border: marsFound ? found : hidden }}
        id="mars"
      ></Item>
      <Item
        ref={pipeWrench}
        className={classes.pipeWrench}
        style={{ border: pipeWrenchFound ? found : hidden }}
        id="pipe wrench"
      ></Item>
      <Box
        ref={marker}
        className={classes.marker}
        style={{
          left: markerPosition.cordX,
          top: markerPosition.cordY,
          visibility: markerVisibility,
        }}
        id="marker"
      ></Box>
      <FormControl className={classes.formControl}>
        <Select
          id="item selector"
          value={itemSelection}
          onChange={handleSelectorChange}
          className={classes.selectEmpty}
        >
          <MenuItem value={"butterfly"}>Butterfly</MenuItem>
          <MenuItem value={"cane"}>Cane</MenuItem>
          <MenuItem value={"cat"}>Cat</MenuItem>
          <MenuItem value={"mars"}>Mars</MenuItem>
          <MenuItem value={"pipe wrench"}>Pipe Wrench</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
