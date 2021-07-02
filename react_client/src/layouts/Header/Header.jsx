import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchCategory } from "../../app/reducers/category";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, Box, Hidden } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../../assets/logo.png";
import DropMenu from "./DropMenu";
import Submenu from "./Submenu";
import Wrapper from "../Wrapper";
import MenuBookIcon from '@material-ui/icons/MenuBook';


Header.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: "#14425d",
    overflowX: "hidden",
    paddingRight: 8,
  },
  container: {
    display: "block",
    width: "100%",
    maxWidth: 1100,
    //   [theme.breakpoints.down('sm')]:{
    //       padding: '0 24px',
    //   },
    //   [theme.breakpoints.down('xs')]:{
    //       padding:'0 12px',
    //   }
  },
  logo: {
    overflow: "hidden",
    width: 196,
    height: 36,
    background: `url(${logo}) no-repeat 0 0`,
  },
  form: {
    position: "relative",
  },
  input: {
    padding: "6px 12px",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#ccc",
    "&:hover": {
      cursor: "pointer",
    },
  },
  subMenu:{
    fontSize: 36,
    color: '#fff',
    opacity: 0.8,
    transition:'0.4s',
    '&:hover':{
      opacity: 0.6,
      cursor:'pointer'
    },
  },
}));

function Header(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [modal, setModal]= useState(false)
  const { category } = props;
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  return (
    <Wrapper bgcolor="#14425d">
      <Box display="flex" justifyContent="space-between">
        <Link to="/" className={classes.logo}></Link>
        <Hidden xsDown>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
          >
            <DropMenu category={category} />
            <div className={classes.form}>
              <input
                type="text"
                placeholder="Tìm kiếm truyện"
                className={classes.input}
              />
              <SearchIcon className={classes.searchIcon} />
            </div>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box 
           height='44px' 
           display='flex' 
           alignItems='center'
           onClick={()=>setModal(!modal)}
          >
            <MenuBookIcon className={classes.subMenu}/>
          </Box>
          {
            modal && <Submenu 
            onClose={()=>setModal(!modal)}
            close={modal}
          />
          }
        </Hidden>
      </Box>
    </Wrapper>
  );
}
const mapSateToProps = (state) => ({
  category: state.category,
});
export default connect(mapSateToProps, null)(Header);
