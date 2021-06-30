import React, { useEffect } from "react";
import { Box, Grid, makeStyles, Hidden } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { fetchNewBooks } from "../../app/reducers/listBookReducer";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {},
  row: {
    fontSize: 15,
    borderBottom: "1px dashed #ccc",
    padding: "8px 0",
  },
  titleNew:{
      fontSize: 20,
      fontWeight: 400,
      textTransform:'uppercase',
      margin: '8px 0',
      paddingBottom: 6,
      borderBottom: '1px solid #4e4e4e'
  },
  select:{
      height: 32,
      outline:' none',
      fontSize: 16,
      textTransform:'uppercase',
      "&::-webkit-scrollbar":{
          display:'none'
      },
  },
  link:{
      textDecoration:'none',
      color:'#4E4E4E',
      fontWeight:500,
      paddingLeft: 8,
      overflow:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
      width: '100%'
  },
  genre:{
      borderLeft:'1px dashed #ccc',
      borderRight:'1px dashed #ccc',
      paddingLeft: 8,
  },
  navbar:{
      background:'#ecf0f1',
      border:'1px solid #D9E1E4',
      padding:'10px 14px',
    //   margin:'10px 0',
  },
  title:{
      borderBottom:'1px solid #ccc',
      marginBottom: 12,
      paddingBottom: 8,
      '&:before':{
          content:"'Thể loại truyện'",
          fontSize: 20,
          fontWeight: 500,
      paddingBottom: 8,
      textTransform:'uppercase',
          borderBottom:'1px solid #4E4E4E',
      },  
  },
  navLink:{
      paddingLeft: 12,
      textDecoration:'none',
      color:'#4E4E4E',
      fontWeight: 500,
      paddingBottom: 12,
      display:'block',
      transition: '0.3s',
      "&:hover":{
          cursor:'pointer',
          textDecoration:'underline',
      },
  },
}));

function NewBox(props) {
  const classes = useStyle();
  const { categories, books } = props;
  const dispatch = useDispatch();
  function handleChangeSelect(e) {
    const value = e.target.value;
    console.log(value);
    dispatch(fetchNewBooks(value));
  }
  function getUrl(link) {
    const split = link.split("/");
    return split[split.length - 2];
  }
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchNewBooks("all"));
    }
  }, []);
  return (
    <Box ml="8px" overflow='hidden'>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <h3 className={classes.titleNew}>Truyện mới cập nhật</h3>
        <select onChange={handleChangeSelect} className={classes.select}>
          <option value="all">Tất cả</option>
          {categories.map((value, index) => (
            <option value={index + 1} key={value.title}>
              {value.title}
            </option>
          ))}
        </select>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} style={{ borderTop: "1px dashed #ccc" }}>
          {books.map((value) => (
            <Grid container spacing={0} className={classes.row}>
              <Grid item xs={9} sm={5} className={classes.titleBook}>
                <Link 
                  className={classes.link}
                  to={`/doc-truyen/${getUrl(value.url)}`}>
                  {value.title}
                </Link>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={0} sm={5} md={3} className={classes.genre}>
                  {value.genre.map((genre, index) => (
                    <Link
                    className={classes.link}
                      key={genre.title}
                      to={`/the-loai/${getUrl(genre.url)}`}
                    >
                      {value.genre.length === index
                        ? genre.title
                        : `${genre.title},`}
                    </Link>
                  ))}
                </Grid>
              </Hidden>
              <Grid item xs={3} sm={2}>
                <Link
                  className={classes.link}
                  to={`/doc-truyen/${getUrl(value.url)}/${getUrl(
                    value.chapter.url
                  )}`}
                >
                  {value.chapter.number}
                </Link>
              </Grid>
              <Hidden smDown>
                <Grid item xs={0} md={2} style={{borderLeft:'1px dashed #ccc'}}>
                  <Box textAlign="center">{value.updateAt}</Box>
                </Grid>
              </Hidden>
            </Grid>
          ))}
        </Grid>
        <Hidden smDown>
          <Grid item xs={0} md={3}>
            <Box className={classes.navbar}>
            <div className={classes.title}>
            </div>
            <Grid container>
                {categories.map(value=>(
                    <Grid item xs={6}>
                        <Link 
                          to={`/the-loai/${getUrl(value.url)}`}
                          className={classes.navLink}
                        >
                            {value.title}
                        </Link>
                    </Grid>
                ))}
            </Grid>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
}
const mapSateToProps = (state) => ({
  books: state.listBook.newBook,
  categories: state.category,
});
export default connect(mapSateToProps, null)(NewBox);
