import React, { useEffect, useState } from "react";
import ListIcon from "@material-ui/icons/List";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Collapse, Paper, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    margin: 0,
  },
  item: {
    color: "white",
    fontWeight: 600,
    display: "flex",
    padding: "0 18px",
    alignItems: "center",
    height: 44,
    "& span": {
      padding: "0 4px",
    },
    "&:hover": {
      cursor: "pointer",
      background: "#2f566d",
    },
  },
  collapse: {
    position: "absolute",
    top: 44,
    left: 220,
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      left: 20,
    },
  },
  dropMenu: {
    width: 480,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "12px",
    background: "#2f566d",
  },
  link: {
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    display:'block',
    padding: "6px 12px",
    transition:'0.4s',
    "&:hover": {
      background: "#14425d",
    },
  },
}));
function DropMenu(props) {
  const classes = useStyle();
  let category = props.category || [];
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {}, [category]);
  return (
    <ul className={`${classes.list}`}>
      <li
        className={`${classes.item}`}
        onClick={() => setDropDown(!dropDown)}
        style={{ background: dropDown && "#2f566d" }}
      >
        <ListIcon className={classes.dropIcon} />
        <span>Thể loại</span>
        <ArrowDropDownIcon className={classes.dropIcon} />
        <Collapse
          in={dropDown}
          timeout={{ appear: 1000, exit: 0 }}
          className={classes.collapse}
        >
          <Grid container spacing={0} className={classes.dropMenu}>
            {category.map((value) => (
              <Grid item xs={4} key={value.title}>
                <Link
                  to={"/the-loai/" + value.href}
                  className={classes.link}
                  key={value.title}
                >
                  {value.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </li>
    </ul>
  );
}

export default DropMenu;
