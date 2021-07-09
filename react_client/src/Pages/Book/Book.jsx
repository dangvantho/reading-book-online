import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { fetchInforOfBook } from "../../app/reducers/bookReducer";
import { Grid, makeStyles, Box, Hidden } from "@material-ui/core";
import Wrapper from "../../layouts/Wrapper";
import Reading from "./Reading";
import bg from "../../assets/bg.jpg";
import LeftNavBar from "../../components/LeftNavBar";

const useStyle = makeStyles((theme) => ({
  root: {},
  img: {
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    maxWidth: 300,
    maxHeight: 400,
  },
  h1:{
    color:'#4e4e4e',
    fontSize: 24,
    textAlign:'center',
    fontWeight: 600,
    paddingBottom: 12
  },
  h3: {
    fontSize: 14,
    fontWeight: 500,
    paddingRight: 6,
  },
  infoLink: {
    fontSize: 14,
    color: "blue",
    paddingRight: 4,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  source: {
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    // color: 'blue'
  },
  desc: {
    textIndent: 18,
    lineHeight: 1.5,
    fontSize: 16,
    paddingBottom: 20,
  },
}));

function Book(props) {
  const classes = useStyle();
  const { maxPage, links, desc, info, content, title } = props.book;
  const { name } = useParams();
  const dispatch = useDispatch();
  // let title;
  useEffect(() => {}, []);
  useEffect(() => {
    dispatch(fetchInforOfBook(name));
  }, [name]);
  return (
    <Wrapper body={true} bgcolor={`url(${bg}) top center repeat-x #F4F4F4`}>
      <Box ml="8px" mt={4} overflow="hidden" minHeight="450px" pb="40px">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Hidden smUp>
                  <h1 className={classes.h1}>{title}</h1>
                </Hidden>
                <Box display="flex" justifyContent="center" width="100%">
                  <img
                    className={classes.img}
                    src={info.img}
                    alt={`Ảnh ${name}`}
                  />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" mt="12px">
                    <h3 className={classes.h3}>Tác giả</h3>
                    <Link
                      className={classes.infoLink}
                      to={`/author/${info.author.url}`}
                    >
                      {info.author.title}
                    </Link>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    mt="12px"
                    flexWrap="wrap"
                  >
                    <h3 className={classes.h3}>Thể loại</h3>
                    {info.genre.map((value) => (
                      <Link
                        className={classes.infoLink}
                        to={`/the-loai/${value.url}`}
                        key={value.title}
                      >
                        {value.title} ,
                      </Link>
                    ))}
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    mt="12px"
                    flexWrap="wrap"
                  >
                    <h3 className={classes.h3}>Nguồn</h3>
                    <span className={classes.source}>{info.source}</span>
                  </Box>
                  <Box display="flex" alignItems="center" mt="12px">
                    <h3 className={classes.h3}>Trạng thái</h3>
                    <span
                      className={classes.status}
                      style={{ color: info.status ? "blue" : "" }}
                    >
                      {info.status || "Full"}
                    </span>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Hidden xsDown>
                  <h1 className={classes.h1}>{title}</h1>
                </Hidden>
                <div className={classes.desc}>{desc}</div>
                <Reading
                  links={links}
                  maxPage={maxPage}
                  name={name}
                  content={content}
                />
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item xs={4}>
              <LeftNavBar title={'Truyện đang hot'} />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  book: state.book,
});

export default connect(mapStateToProps, null)(Book);
