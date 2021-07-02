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
  const { bgcolor, children, body } = props;
  const classes = useStyle();
  return (
    <Box style={{ background: bgcolor }} className={classes.root}>
      <Box className={classes.container}>
        {body && (
          <Box ml='8px'  mt={3} mb={2} >
            <Box bgcolor="#fff" width="100%" height="30px"/>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
}

export default Wrapper;
