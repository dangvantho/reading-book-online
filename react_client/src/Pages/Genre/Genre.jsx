import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Box, Grid, Hidden, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Wrapper from "../../layouts/Wrapper";
import LeftNavbar from "../../components/LeftNavBar";
import { Pagination } from "@material-ui/lab";
import bg from "../../assets/bg.jpg";
import { fetchGenreBooks } from "../../app/reducers/genreReducer";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CreateIcon from "@material-ui/icons/Create";
import images from '../../assets/images.png'
import ImageLoading from "../../components/ImageLoading";
import ContentLoading from "../../components/ContentLoading";
// import { fetchHotStory } from "../../app/reducers/hotStoryReducer";

const useStyle = makeStyles(function (theme) {
  console.log(arguments);
  return {
    root: {},
    titleGenre: {
      marginBottom: 20,
      textTransform: "uppercase",
      borderBottom: "1px solid #bfbdbd",
      // maxWidth: 400,
      "& h2": {
        display: "inline-block",
        fontSize: 20,
        fontWeight: 500,
        borderBottom: "1px solid #4e4e4e",
      },
    },
    row: {
      marginBottom: 6,
      borderBottom: "1px dashed #4e4e4e",
    },
    contentBook: {
      paddingLeft: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    contentLink: {
      textDecoration: "none",
      color: "#4e4e4e",
      fontSize: 18,
      fontWeight: "bold",
      paddingBotom: 8,
      display: "block",
      maxWidth: "80%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    icon: {
      fontSize: 24,
      paddingRight: 6,
      color: "#4e4e4e",
    },
    statusStory: {
      padding: "1px 3px",
      fontSize: 13,
      marginLeft: 5,
      textTransform: "uppercase",
    },
    full: {
      color: "#86AD86",
      border: "1px solid #86AD86",
    },
    new: {
      color: "#8EB3FD",
      border: "1px solid #8EB3FD",
    },
    hot: {
      color: "#FD8383",
      border: "1px solid #FD8383",
    },
    chapter: {
      color: "#31708f",
      textDecoration: "none",
      fontSize: 13,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    img: {
      width: "100%",
      height: 80,
      objectFit: "cover",
      objectPosition: "top center",
      overflow: "hidden",
    },
    navbar: {
      background: "#ecf0f1",
      border: "1px solid #D9E1E4",
      padding: "10px 14px",
      marginBottom: 18,
    },
    title: {
      borderBottom: "1px solid #ccc",
      marginBottom: 12,
      paddingBottom: 8,
      "&:before": {
        content: "'Thể loại truyện'",
        fontSize: 20,
        fontWeight: 500,
        paddingBottom: 8,
        textTransform: "uppercase",
        borderBottom: "1px solid #4E4E4E",
      },
    },
    navLink: {
      paddingLeft: 12,
      textDecoration: "none",
      color: "#4E4E4E",
      fontWeight: 500,
      paddingBottom: 12,
      display: "block",
      transition: "0.3s",
      "&:hover": {
        cursor: "pointer",
        textDecoration: "underline",
      },
    },
    rowLoading:{
      background:'#fff',
      margin: 0,
      padding: 6,
    },
    imgBoxLoading:{
      maxHeight: 54,
      overflow:'hidden',
      marginBottom: 8,
      display:'flex',
      justifyContent:'center',
    },

  };
});

function Genre(props) {
  const classes = useStyle();
  const { categories, genre } = props;
  const desc = useRef();
  const { category } = useParams();
  const dispatch = useDispatch();
  const [cat, setCat] = useState({});
  const [page, setPage] = useState(1);
  function handleChangePage(e, currentPage) {
    setPage(currentPage);
  }
  function getLink(url) {
    try {
      const links = url.split("/");
      return links[links.length - 2];
    } catch (error) {
      return "";
    }
  }
  function getLinkChapter(url) {
    try {
      const links = url.split("/");
      const len = links.length;
      return `${links[len - 3]}/${links[len - 2]}`;
    } catch (error) {
      return "";
    }
  }
  useEffect(() => {
    let tam = categories.find((value) => value.href === category);
    if (tam) {
      setCat(tam);
      dispatch(fetchGenreBooks({ genre: tam.href, page: `trang-${page}` }));
      // dispatch(fetchHotStory({ cat: tam.index}))
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [category, categories, page]);
  useEffect(() => {
    if (desc.current) {
      desc.current.innerHTML = genre.desc;
      console.log(genre.desc);
    }
  }, [genre.desc]);
  return (
    <Wrapper body={true} bgcolor={`url(${bg}) top center repeat-x #F4F4F4`}>
      <Box ml="8px" overflow="hidden" pb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className={classes.titleGenre}>
              <h2>{genre.title}</h2>
            </div>
            {!genre.loading ?genre.data.map((item) => (
              <Grid
                container
                className={classes.row}
                spacing={0}
                key={item.title}
              >
                <Grid item xs={2} md={3}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className={classes.img}
                  />
                </Grid>
                <Grid item xs={8} md={6} className={classes.contentBook}>
                  <Box display="flex" alignItems="center" flexWrap="wrap">
                    <LibraryBooksIcon className={classes.icon} />
                    <Link
                      className={classes.contentLink}
                      to={`/doc-truyen/${getLink(item.url)}`}
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                    {item.status.map((value) => (
                      <Box
                        key={value}
                        className={`${classes.statusStory} ${
                          value === "new"
                            ? classes.new
                            : value === "hot"
                            ? classes.hot
                            : classes.full
                        }`}
                      >
                        {value}
                      </Box>
                    ))}
                  </Box>
                  <Box display="flex" alignItems="center" pt="4px">
                    <CreateIcon className={classes.icon} />
                    {item.author}
                  </Box>
                </Grid>
                <Grid item xs={2} md={3}>
                  <Link
                    to={`/doc-truyen/${getLinkChapter(item.chapter.url)}`}
                    className={classes.chapter}
                  >
                    {item.chapter.title}
                  </Link>
                </Grid>
              </Grid>
            )) : 
            new Array(16).fill(0).map((value, index)=>(
              <Grid container key={index} className={`${classes.row} ${classes.rowLoading}`}>
                <Grid item xs={3} className={classes.imgBoxLoading}>
                  <ImageLoading/>
                </Grid>
                <Grid item xs={9} >
                  <ContentLoading/>
                </Grid>
              </Grid>
            ))
            }
            {genre.maxPage && genre.maxPage >= 2 && (
              <Box mt={3}>
                <Pagination
                  count={genre.maxPage-0}
                  page={page}
                  onChange={handleChangePage}
                />
              </Box>
            )}
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Box className={classes.navbar} ref={desc}></Box>
              <Box className={classes.navbar}>
                <div className={classes.title}></div>
                <Grid container>
                  {categories.map((value) => (
                    <Grid item xs={6}>
                      <Link
                        to={`/the-loai/${getLink(value.url)}`}
                        className={classes.navLink}
                      >
                        {value.title}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box>
                <LeftNavbar title={`${genre.title} Hot`} cat={cat.index} />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Wrapper>
  );
}
const mapSateToProps = (state) => ({
  categories: state.category.data,
  genre: state.genre,
  //   hotStories: state.hotStories
});
export default connect(mapSateToProps, null)(Genre);
