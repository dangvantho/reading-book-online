import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
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
});

function Wrapper(props) {
  const { bgcolor, children } = props;
  const classes = useStyle();
  return (
    <Box bgcolor={bgcolor} className={classes.root}>
      <Box className={classes.container}>
          {children}
      </Box>
    </Box>
  );
}

export default Wrapper;
