import React, { useEffect, useRef } from "react";
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
    fontSize: 28,
  },
  checkCircle: {
    color: theme.palette.primary.main,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const interval = useRef(null);
  const { started, newTime, time } = props;

  useEffect(() => {
    if (started) {
      interval.current = setInterval(() => {
        newTime(time);
      }, 1000);

      return () => {
        clearInterval(interval.current);
      };
    }
  }, [started, newTime, time]);

  useEffect(() => {
    if (props.finished) {
      clearInterval(interval.current);
    }
  }, [props.finished]);

  return (
    <Paper elevation={3} className={classes.container}>
      <Paper className={classes.timer}>Time: {props.time}</Paper>
      <Box>
        <List>
          {itemList.map((item, index) => (
            <ListItem key={index}>
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
