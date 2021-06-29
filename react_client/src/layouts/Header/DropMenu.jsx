import React, { useEffect, useState } from "react";
import ListIcon from "@material-ui/icons/List";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Collapse, Paper, makeStyles } from "@material-ui/core";
import {Link} from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
  list: {
      listStyle:'none',
      margin:0,
  },
  item: {
      color:'white',
      fontWeight:600,
      display:'flex',
      padding: '0 18px',
      alignItems:'center',
      position:'relative',
      height: 44,
      '& span':{
          padding:'0 4px',
      },
      '&:hover':{
          cursor:'pointer',
          background:'#2f566d'
      }
  },
  dropMenu:{
      width:480,
      display:'flex',
      justifyContent:'space-between',
      flexWrap:'wrap',
      position:'absolute',
      top: 44,
      left:0,
      padding:'12px',
      background:'#2f566d'
  },
  link:{
      color:'#fff',
      fontWeight: 600,
      textDecoration:'none',
      padding: '4px 12px',
      '&:hover':{
          background:'#14425d',
      }
  },
}));
function DropMenu(props) {
  const classes = useStyle();
  let category = props.category || []
  const [dropDown, setDropDown]= useState(false)
  useEffect(()=>{

  },[category])
  return (
    <ul className={`${classes.list}`}>
      <li 
        className={`${classes.item}`} 
        onClick={()=>setDropDown(!dropDown)}
        style={{background: dropDown && '#2f566d'}}
       >
        <ListIcon className={classes.dropIcon} />
        <span>Thể loại</span>
        <ArrowDropDownIcon className={classes.dropIcon} />
        <Collapse in={dropDown} timeout={{appear: 1000, exit:0}} >
            <Paper elevation={4} className={classes.dropMenu}>
               {category.map(value=>(
                   <Link 
                      to={"/the-loai/" + value.href} 
                      className={classes.link} 
                      key={value.title}>{value.title}
                    </Link>
               ))}
            </Paper>
        </Collapse>
      </li>
    </ul>
  );
}

export default DropMenu;
