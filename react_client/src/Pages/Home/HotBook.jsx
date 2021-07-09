import { Box, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { fetchHotBooks } from "../../app/reducers/listBookReducer";

const useStyle = makeStyles((theme) => ({
  root: {},
  title: {
    textTransform: "uppercase",
    fontSize: 20,
    // color: "#4E4E4E",
    fontWeight: 400,
    paddingBottom: 8,
    borderBottom: "1px solid #000",
    margin:'12px 0'
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
    width:'100%',
    height:'100%',
    "& span": {
      position: "absolute",
      bottom: 0,
      left:0,
      background:'rgba(0, 0, 0, 0.6)',
      color:'#fff',
      textDecoration:'none',
      textTransform:'uppercase',
      width:'100%',
      textAlign:'center',
      padding:'4px 0',
      fontSize: 11,
    },
  },
  imgBook: {
      width: '100%',
      objectFit:'cover',
  },
}));

function HotBook(props) {
  const { books, categories } = props;
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
      console.log(link)
      throw new Error(error)
    }
  }
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchHotBooks("all"));
      console.log("tesst");
    }
  }, []);
  return (
    <Box ml="8px" overflow='hidden'>
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
      <Grid container spacing={3} style={{height:'auto'}}>
        {books.map((value) => (
          <Grid item xs={4} sm={2}  key={value.title}>
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
        ))}
      </Grid>
    </Box>
  );
}
const mapSateToProps = (state) => ({
  books: state.listBook.hot,
  categories: state.category.data,
});
export default connect(mapSateToProps, null)(HotBook);
