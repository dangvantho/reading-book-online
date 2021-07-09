import React, { useState } from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from "@material-ui/icons/Home";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 99,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "flex-end",
  },
  list: {
    listStyle: "none",
    marginTop: 20,
  },
  item: {
    padding: "10px 12px",
  },
  navLink: {
    fontSize: 18,
    textDecoration: "none",
    color: "#fff",
    transition: "0.3s",
    opacity: 0.7,
    "&:hover": {
      cursor: "pointer",
      opacity: 1,
    },
  },
  closeItem: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#fff",
    opacity: 0.7,
    transition: "0.3s",
    "&:hover": {
      cursor: "pointer",
      opacity: 1,
    },
  },
  category: {
    overflow: "auto",
    height: "100vh",
    animation:'category 2s linear',
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  link: {
    padding: "0 12px",
    paddingBottom: 16,
    textDecoration: "none",
    color: "#fff",
    opacity: 0.7,
    transition: "0.3s",
    display: "block",
    "&:hover": {
      cursor: "pointer",
      opacity: 1,
    },
  },
}));

function Submenu(props) {
  const classes = useStyle();
  const { categories, onClose } = props;
  const [listLink, setListLink] = useState(false);
  function handleClose() {
    setListLink(false);
    onClose();
  }
  return (
    <Box className={classes.root}>
      <Box
        width="180px"
        position="relative"
        style={{
          background: "linear-gradient(to bottom right, #14425d , #0673b3)",
          animation: "modal 0.4s ease-in-out",
        }}
      >
        <HighlightOffIcon onClick={handleClose} className={classes.closeItem} />
        <ul className={classes.list}>
          <li className={classes.item} onClick={handleClose}>
            <Link to="/" className={classes.navLink}>
              <Box display="flex" alignItems="center">
                <HomeIcon />
                <span style={{ paddingLeft: 6 }}>Trang chủ</span>
              </Box>
            </Link>
          </li>
          <li className={classes.item} onClick={()=>setListLink(!listLink)}>
            <Box display="flex" alignItems="center" className={classes.navLink}>
              <ListIcon />
              <span style={{ paddingLeft: 6 }}>Thể loại</span>
            </Box>
          </li>
          {listLink && (
            <li className={classes.category}>
              <ul className={classes.list}>
                {categories.map((value) => (
                  <li key={value.title} onClick={handleClose}>
                    <Link
                      to={"/the-loai/" + value.href}
                      className={classes.link}
                      key={value.title}
                    >
                      {value.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </Box>
    </Box>
  );
}

const mapSateToProps = (state) => ({
  categories: state.category.data,
});
export default connect(mapSateToProps, null)(Submenu);
