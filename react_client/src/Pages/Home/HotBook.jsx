import { Box, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { fetchHotBooks } from "../../app/reducers/listBookReducer";
import images from '../../assets/images.png'

const useStyle = makeStyles((theme) => ({
  root: {},
  title: {
    textTransform: "uppercase",
    fontSize: 20,
    // color: "#4E4E4E",
    fontWeight: 400,
    paddingBottom: 8,
    borderBottom: "1px solid #000",
    margin: "12px 0",
  },
  select: {
    height: 32,
    fontSize: 16,
    textTransform: "uppercase",
    outline: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  link: {
    display: "block",
    position: "relative",
    width: "100%",
    height: "100%",
    "& span": {
      position: "absolute",
      bottom: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      textDecoration: "none",
      textTransform: "uppercase",
      width: "100%",
      textAlign: "center",
      padding: "4px 0",
      fontSize: 11,
    },
  },
  imgBook: {
    width: "100%",
    objectFit: "cover",
  },
  imgLoading:{
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 40,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
    '& img':{
      maxWidth: 50,
      objectFit:'contain',
    },
    '& span':{
      position:'absolute',
      width: '50%',
      left: 0,
      height: '100%',
      background:'#fff',
      opacity: 0.2,
      animation: 'linearEffect 1s ease-in infinite',
      zIndex: 9,
    },
  },
  titleLoading:{
    position:'absolute',
    bottom: 0,
    height: 40,
    width: '100%',
    borderTop: '1px solid #ccc',
    overflow:'hidden'
  },
  linearLoading:{
    position:'absolute',
    top: 10,
    left: 10,
    width: '60%',
    maxWidth: 'calc(100% - 20px)',
    height: 8,
    background: '#f1f1e8',
    overflow:'hidden',
    borderRadius: 5,
    '&::after':{
      content:'""',
      background:'#e8e8e3',
      width: '50%',
      height: 8,
      position:'absolute',
      left: 0,
      animation:'$myEffect 0.8s ease-in infinite',
      borderRadius: 5,
    },
  },
  "@keyframes myEffect": {
    "0%": {
      left: 0
    },
    // "50%": {
    //   right: 0,
    // },
    "100%": {
      left: '100%',
    }
  },
}));

function HotBook(props) {
  const { books, categories, loading } = props;
  const classes = useStyle();
  const dispatch = useDispatch();
  const [id, setId] = useState("all");
  function handleSelect(e) {
    let id = e.target.value;
    setId(id);
    dispatch(fetchHotBooks(id));
  }
  function getUrl(link) {
    try {
      const split = link.split("/");
      return split[split.length - 2];
    } catch (error) {
      console.log(link);
      throw new Error(error);
    }
  }
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchHotBooks("all"));
      console.log("tesst");
    }
  }, []);
  return (
    <Box ml="8px" overflow="hidden">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 className={classes.title}>Truyện hot</h3>
        <select value={id} onChange={handleSelect} className={classes.select}>
          <option value="all">Tất cả</option>
          {categories.map((value, index) => (
            <option value={value.index} key={value.title}>
              {value.title}
            </option>
          ))}
        </select>
      </Box>
      <Grid container spacing={3} style={{ height: "auto" }}>
        {!loading
          ? books.map((value) => (
              <Grid item xs={4} sm={2} key={value.title}>
                <Link
                  to={`/doc-truyen/${getUrl(value.url)}`}
                  className={classes.link}
                >
                  <img
                    src={value.img}
                    alt={value.title}
                    className={classes.imgBook}
                  />
                  <span>{value.title}</span>
                </Link>
              </Grid>
            ))
          : new Array(16).fill(0).map((value, index) => (
              <Grid item xs={4} sm={2} key={index}>
                <Box width="100%" paddingTop="120%" position="relative" border='1px solid #ccc' bgcolor='#fff'>
                  <Box className= {classes.imgLoading}>
                    <img src={images} alt=""/>
                    <span></span>
                  </Box>
                  <p className={classes.titleLoading} >
                    <span className={classes.linearLoading}></span>
                  </p>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
const mapSateToProps = (state) => ({
  books: state.listBook.hot,
  categories: state.category.data,
  loading: state.listBook.loading,
  err: state.listBook.err,
});
export default connect(mapSateToProps, null)(HotBook);
