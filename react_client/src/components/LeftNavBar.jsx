import React, { useEffect, useState } from "react";
import { fetchHotStory } from "../app/reducers/hotStoryReducer";
import { connect, useDispatch } from "react-redux";
import { Box, Grid, makeStyles, Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  root: {
    overflowX:'hidden'
  },
  title:{
    color:'#797979',
    lineHeight: '40px',
    fontSize: 20,
    borderBottom:'1px solid #c5bfbf ',
    '& h3':{
      fontWeight: 500,
      borderBottom:'1px solid #4e4e4e',
      display:'inline-block',
      textTransform:'uppercase'
    }
  },
  type: {
    textAlign: "center",
    lineHeight: "30px",
    border: "1px solid #aaa",
    margin: "6px 10px 0",
    padding: "0 14px",
    borderRadius: 14,
    fontSize: 12,
    textTransform: "uppercase",
    transition: "0.3s",
    "&:hover": {
      opacity: 0.9,
      background: "#4e4e4e",
      cursor: "pointer",
      color: "#fff",
    },
  },
  active: {
    background: "#4e4e4e",
    color: "#fff",
    opacity: 0.9,
  },
  avatar:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      paddingRight: 8
  },
  topNumber:{
      background:'transparent',
      border:'1px solid #cbcbcb',
      width: 30,
      height: 30,
      color: '#4e4e4e',
      fontSize: 15,
      fontWeight: 500,
      textShadow:'0 0 2px #4e4e4e'
  },
  link:{
      color: '#000',
      fontSize: 13,
      textDecoration:'none',
      display:'block',
      paddingRight: 4,
      "&:hover":{
          cursor:'pointer',
          textDecoration:'underline'
      },
      lineHeight: 1.2,
  },
  linkTitle:{
      fontSize: 15,
      color:'#083767',
      fontWeight: 600,
      overflow:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
  }
}));

function LeftNavBar(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { hotStories, title, cat } = props;
  const { type, data } = hotStories;
  const [loading, setLoading] = useState(false);
  function getLink(link){
      const split= link.split('/')
      return split[split.length-2]
  }
  function getColor(color){
    switch(color){
      case '1': 
      case 1:
         return '#e74c3c'
      case '2':
      case 2:
        return '#5eb949'
      case '3':
      case 3:
        return '#5cabb8'       
      default:
        return 0  
    }
  }
  async function handleFetchHotStory(type) {
    if (hotStories.type === "type") return;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!timeout) return;
      setLoading(false);
      clearTimeout(timeout);
    }, 4000);
    await dispatch(fetchHotStory({type, cat}));
    if (timeout) {
      console.log("time out ....");
      clearTimeout(timeout);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (type || data.length === 0) {
      dispatch(fetchHotStory({type, cat}));
    }
  }, []);
  useEffect(()=>{
    dispatch(fetchHotStory({cat}))
  },[cat])
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h3> {title} </h3>
      </div>
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Box
          className={`${classes.type} ${type === "day" ? classes.active : ""}`}
          onClick={() => handleFetchHotStory("day")}
        >
          Ngày
        </Box>
        <Box
          className={`${classes.type} ${
            type === "month" ? classes.active : ""
          }`}
          onClick={() => handleFetchHotStory("month")}
        >
          Tháng
        </Box>
        <Box
          className={`${classes.type} ${type === "all" ? classes.active : ""}`}
          onClick={() => handleFetchHotStory("all")}
        >
          All time
        </Box>
      </Box>
      <Box>
            {data.map(value=>(
                <Box display='flex' mt='8px' borderBottom='1px dashed #ccc' pb='8px' ml={3}>
                    <Box  className={classes.avatar}>
                        <Avatar 
                        className={classes.topNumber}
                        style={{color: getColor(value.topNum)===0 ? '#4e4e4e': '#fff', background: getColor(value.topNum) }}
                        >
                          {value.topNum}
                        </Avatar>
                    </Box>
                    <Box>
                        <Link 
                        className={`${classes.link} ${classes.linkTitle}`} 
                        key={value.title} 
                        to={`/doc-truyen/${getLink(value.book.url)}`}
                        title={value.book.title}
                        >
                            {value.book.title}
                        </Link>
                        <Box textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' display='flex'>
                            {value.genre.map((item,index)=>(
                                <Link className={classes.link} key={item.title} to={`/the-loai/${getLink(item.url)}`}>
                                    {index === value.genre.length -1 ? item.title: `${item.title},`}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    </div>
  );
}
const mapStateToProps = (state) => ({
  hotStories: state.hotStories,
});
export default connect(mapStateToProps, null)(LeftNavBar);
