import React, { useState, useEffect, useRef } from "react";
import { itemList } from "../constants/itemList";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    width: "400px",
    background: theme.palette.primary.light,
  },
  timer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${theme.palette.text.primary}`,
    padding: "20px",
    background: theme.palette.primary.light,
    fontSize: 24,
  },
  listItemText: {
    // color: theme.palette.text.secondary,
    fontSize: 28,
  },
  checkCircle: {
    color: theme.palette.primary.main,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    console.log("test");
    if (props.started) {
      interval.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => {
        clearInterval(interval.current);
      };
    }
  }, [props.started]);

  useEffect(() => {
    if (props.finished) {
      clearInterval(interval.current);
    }
  }, [props.finished]);

  return (
    <Paper elevation={3} className={classes.container}>
      <Paper className={classes.timer}>Time: {time}</Paper>
      <Box>
        <List>
          {itemList.map((item, index) => (
            <ListItem
              // className={classes.itemList}
              // style={{ fill: "green" }}
              key={index}
            >
              <ListItemIcon>
                {props.foundItems.includes(item) ? (
                  <CheckCircle className={classes.checkCircle} />
                ) : (
                  <HelpIcon />
                )}
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                style={{
                  color: props.foundItems.includes(item) ? "darkblue" : "#222",
                }}
                color="primary"
                primary={item.charAt(0).toUpperCase() + item.slice(1)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
