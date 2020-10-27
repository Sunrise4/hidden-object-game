import React from "react";
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
import { CheckCircleIcon } from "@material-ui/icons";
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
  itemList: {
    color: theme.palette.text.secondary,
    fontSize: 24,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.container}>
      <Paper className={classes.timer}>Time: 0:00</Paper>
      <Box>
        <List>
          {itemList.map((item, index) => (
            <ListItem className={classes.itemList} key={index}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
