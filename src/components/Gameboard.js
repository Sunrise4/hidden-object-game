import React, { useState, useRef, useEffect, useCallback } from "react";
import { itemList } from "../constants/itemList";
import image from "../assets/gameScene.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  ClickAwayListener,
  FormControl,
  MenuItem,
  Select,
  Button,
  List,
  ListItem,
  ListItemText,
  Grow,
  Input,
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
  button: {
    height: 60,
    width: 120,
    fontSize: 32,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
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
    minWidth: 120,
    background: "rgba(255,255,255,.9)",
  },
  scoreboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.primary.light,
    padding: 20,
    margin: "auto",
    height: 600,
    width: 400,
    fontSize: 32,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highScoreContainer: {
    position: "absolute",
    height: 200,
    width: 200,
    margin: "auto",
    padding: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highScoreInput: {
    // margin: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&& Button": {
      border: theme.palette.primary.main,
    },
  },
}));

export default function Gameboard(props) {
  const found = "3px solid green";
  const hidden = "none";
  const classes = useStyles();
  const [markerPosition, setMarkerPosition] = useState({ cordX: 0, cordY: 0 });
  const [markerVisibility, setMarkerVisibility] = useState("hidden");
  const [itemSelectPosition, setItemSelectPosition] = useState({
    cordX: 0,
    cordY: 0,
  });
  const [itemSelection, setItemSelection] = useState("butterfly");
  const butterfly = useRef();
  const cane = useRef();
  const cat = useRef();
  const mars = useRef();
  const pipeWrench = useRef();
  const marker = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [highScoreList, setHighScoreList] = useState([
    { nickname: "test", time: "235" },
  ]);

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
      !props.foundItems.includes("butterfly")
    ) {
      props.onItemFound("butterfly");
    } else if (
      overlaps(marker.current, cane.current) &&
      itemSelection === cane.current.id &&
      !props.foundItems.includes("cane")
    ) {
      props.onItemFound("cane");
    } else if (
      overlaps(marker.current, cat.current) &&
      itemSelection === cat.current.id &&
      !props.foundItems.includes("cat")
    ) {
      props.onItemFound("cat");
    } else if (
      overlaps(marker.current, mars.current) &&
      itemSelection === mars.current.id &&
      !props.foundItems.includes("mars")
    ) {
      props.onItemFound("mars");
    } else if (
      overlaps(marker.current, pipeWrench.current) &&
      itemSelection === pipeWrench.current.id &&
      !props.foundItems.includes("pipe wrench")
    ) {
      props.onItemFound("pipe wrench");
    }
  }, [itemSelection, overlaps, props]);
  useEffect(() => {
    setItemSelectPosition({
      cordX: markerPosition.cordX,
      cordY: markerPosition.cordY + 40,
    });
  }, [markerPosition]);

  useEffect(() => {
    checkForOverlaps();
  }, [markerPosition, checkForOverlaps]);

  const handleSelectorChange = (e) => {
    setItemSelection(e.target.value);
  };

  useEffect(() => {
    highScoreList.sort((a, b) => (a.time > b.time ? 1 : -1));
  }, [highScoreList]);

  const scoreboard = (
    <Box
      className={classes.scoreboard}
      style={{ visibility: props.finished ? "visible" : "hidden" }}
    >
      <Box>Highscores:</Box>
      <List>
        {highScoreList.map((entry) => (
          <ListItem>
            <ListItemText
              primary={`${entry.nickname} : ${entry.time}`}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    console.log(props.foundItems.length, itemList.length);
    if (props.foundItems.length === itemList.length) {
      props.onGameFinish();
    }
  });

  const checkHighscore =
    props.finished &&
    (highScoreList.length < 5 || props.time < highScoreList[4].time);
  // if (props.finished) {
  //   if (highScoreList.length < 5){
  //     setHighScoreList([...highScoreList, ])
  //   } (props.time < highScoreList[4].time) {

  // }
  // retur

  const submitHighScore = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  console.log(checkHighscore);
  return (
    <Paper elevation={3} className={classes.gameContainer}>
      <Box style={{ visibility: props.started ? "visible" : "hidden" }}>
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
          style={{
            border: props.foundItems.includes("butterfly") ? found : hidden,
          }}
          id="butterfly"
        ></Item>
        <Item
          ref={cane}
          className={classes.cane}
          style={{ border: props.foundItems.includes("cane") ? found : hidden }}
          id="cane"
        ></Item>
        <Item
          ref={cat}
          className={classes.cat}
          style={{ border: props.foundItems.includes("cat") ? found : hidden }}
          id="cat"
        ></Item>
        <Item
          ref={mars}
          className={classes.mars}
          style={{ border: props.foundItems.includes("mars") ? found : hidden }}
          id="mars"
        ></Item>
        <Item
          ref={pipeWrench}
          className={classes.pipeWrench}
          style={{
            border: props.foundItems.includes("pipe wrench") ? found : hidden,
          }}
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
        <FormControl
          className={classes.formControl}
          style={{
            left: itemSelectPosition.cordX,
            top: itemSelectPosition.cordY,
            visibility: markerVisibility,
          }}
        >
          <Select
            id="item selector"
            value={itemSelection}
            onChange={handleSelectorChange}
          >
            <MenuItem value={"butterfly"}>Butterfly</MenuItem>
            <MenuItem value={"cane"}>Cane</MenuItem>
            <MenuItem value={"cat"}>Cat</MenuItem>
            <MenuItem value={"mars"}>Mars</MenuItem>
            <MenuItem value={"pipe wrench"}>Pipe Wrench</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        className={classes.button}
        style={{ visibility: props.started ? "hidden" : "visible" }}
        onClick={props.onGameStart}
      >
        START
      </Button>
      <Grow in={checkHighscore && !submitted}>
        <Paper elevation={3} className={classes.highScoreContainer}>
          <form className={classes.highScoreInput} onSubmit={submitHighScore}>
            <Box>New Highscore!</Box>
            <Box color="primary">Time: {props.time} seconds</Box>
            <Input placeholder="Nickname" required />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </Grow>
      {scoreboard && submitted}
      {/* <Highscore /> */}
    </Paper>
  );
}
