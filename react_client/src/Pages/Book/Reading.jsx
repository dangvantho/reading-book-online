import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "@material-ui/lab";
import {
  fetchInforOfBook,
  fetchPage,
  fetchContent,
} from "../../app/reducers/bookReducer";
import { useDispatch } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SpeedIcon from "@material-ui/icons/Speed";
import Loading_1 from "../../components/Loading_1";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {},
  chapter: {},
  iconBtn: {
    // color: "#e6791c",
    "&:hover": {
      cursor: "pointer",
    },
  },
  control: {
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $titleOfLink": {
      opacity: 1,
      cursor: "pointer",
    },
  },
  titleOfLink: {
    flexGrow: 1,
    textAlign: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    // color: "#e6791c",
    transition: "all 0.4s",
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
    },
  },
  rate: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "0 4px",
    // color: "#e6791c",
    "&:hover ul": {
      visibility: "visible",
    },
    "& ul": {
      position: "absolute",
      top: "100%",
      left: -20,
      background: "#000",
      opacity: 0.7,
      color: "#fff",
      fontSize: 14,
      padding: "6px 8px",
      listStyle: "none",
      visibility: "hidden",
      transition: "all 0.4s ",
    },

    "& ul li:hover": {
      color: "#ccc",
    },
  },
  listChapter: {
    background: "#f5f5f6",
    height: 320,
    overflow: "auto",
  },
  linkItem: {
    padding: "0 10px",
    marginTop: 10,
    paddingBottom: 10,
    borderBottom: "1px dashed #ccc",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&:hover": {
      cursor: "pointer",
      color: "#c77800",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.2)",
    zIndex: 99,
  },
}));

function Reading(props) {
  const classes = useStyle();
  const { links, maxPage, name, content } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  function handleChangePage(e, page) {
    setLoading(true)
    console.log('page',page, loading)
    setChapter(0);
    setPage(page);
    dispatch(
      fetchPage({
        link: name,
        page,
      })
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const audio = useRef();
  const [src, setSrc] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [chapter, setChapter] = useState(0);
  const [loading, setLoading] = useState(false);
  function handleNexTChapter() {
    if (chapter + 1 >= links.length) {
      if (page === maxPage) return;
      setPage(page + 1);
      handleChangePage("", page + 1);
    }
    setChapter(chapter + 1);
  }
  function handlePreviousChapter() {
    if (chapter === 0) {
      if (page === 1) return;
      setPage(page - 1);
      handleChangePage("e", page - 1);
      return;
    }
    setChapter(chapter - 1);
  }
  function getTitleOfLink() {
    const link = links.find((value, index) => index == chapter);
    return link ? link.title : "";
  }
  function handlePlaying() {
    // dispatch(fetchContent());
  }
  async function handleChangeChapter(chapter) {
    setChapter(chapter);
    setPlaying(true);
    let link = links[chapter];
    console.log(links, link, chapter);
    if (link) {
      dispatch(fetchContent(link.url));
    }
  }
  function speechText(text = "", speech = 1) {
    return axios
      .post("https://texttospeechapi.wideo.co/api/wideo-text-to-speech", {
        data: { text, speech, voice: "vi-VN-Standard-A" },
      })
      .then(async (res) => {
        return res.data.result.url;
      });
  }
  function handlePauseAudio() {
    setPlaying(false);
    audio.current.pause();
  }
  async function handleRemuseAudio() {
    setPlaying(true);
    if (content.length === 0 && links[chapter]) {
      console.log("loading playing", loading);
      setLoading(true);
      dispatch(fetchContent(links[chapter].url));
      return;
    }
    audio.current.play();
  }
  async function handleReading(text) {
    let values = await Promise.allSettled(
      text.map((value) => speechText(value))
    );
    console.log("Loading: ", loading);
    const result = [];
    values.forEach((value) => {
      if (value.status === "fulfilled") {
        result.push(value.value);
      }
    });
    setSrc(result);
    setLoading(false);
  }
  useEffect(() => {
    let link = links[chapter];
    if (link && playing) {
      (async function () {
        setLoading(true);
        dispatch(fetchContent(link.url));
      })();
    }
  }, [chapter, links]);
  useEffect(() => {
    if (content.length > 0 && playing) handleReading(content);
  }, [content]);
  useEffect(() => {
    if (audio.current.src) {
      audio.current.src = "/";
    }
    let currentVoice = 0;
    const length = src.length;
    audio.current.src = src[currentVoice];
    audio.current.playbackRate = rate;
    let newRate = rate || 1;
    audio.current.play();
    console.log(src, loading);
    audio.current.onended = function () {
      try {
        if (src.length === currentVoice + 1) {
          console.log("end");
          handleNexTChapter();
          return;
        }
        currentVoice++;
        console.log(src.length, currentVoice);
        audio.current.src = src[currentVoice];
        audio.current.playbackRate = newRate;
        audio.current.play();
      } catch (error) {
        throw new Error(error);
      }
    };
    audio.current.onratechange = function (e) {
      newRate = audio.current.playbackRate;
    };
  }, [src]);
  useEffect(() => {
    audio.current.pause();
    audio.current.playbackRate = rate;
    audio.current.play();
  }, [rate]);
  useEffect(()=>{
    setLoading(false)
    console.log('page',page, loading)
  },[page])
  return (
    <div>
      <Box position="relative">
        {loading && <Box className={classes.modal}><Loading_1/></Box>}
        <Box
          bgcolor="#cfd8dc"
          display="flex"
          alignItems="center"
          padding="8px"
          className={classes.control}
        >
          <Box display="flex" alignItems="center">
            <SkipPreviousIcon
              onClick={handlePreviousChapter}
              className={classes.iconBtn}
            />
            {playing ? (
              <PauseCircleOutlineIcon
                className={classes.iconBtn}
                onClick={handlePauseAudio}
              />
            ) : (
              <PlayCircleOutlineIcon
                className={classes.iconBtn}
                onClick={handleRemuseAudio}
              />
            )}
            <SkipNextIcon
              onClick={handleNexTChapter}
              className={classes.iconBtn}
            />
          </Box>
          <p className={classes.titleOfLink}>{getTitleOfLink()}</p>
          <Box className={classes.rate}>
            <Box lineHeight="20px" display="flex" alignItems="center">
              <SpeedIcon />
              {/* <Box ml='2px'>{rate}</Box> */}
            </Box>
            <ul style={{ listStyle: "none" }}>
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5].map((value) => (
                <li key={value} onClick={() => setRate(value)}>
                  {value}
                </li>
              ))}
            </ul>
          </Box>
        </Box>
        <Box className={classes.listChapter}>
          {links.map((value, index) => (
            <p
              key={value.title}
              className={classes.linkItem}
              onClick={() => handleChangeChapter(index, value.url)}
            >
              {value.title}
            </p>
          ))}
          {maxPage > 0 && (
            <Pagination
              count={maxPage}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </Box>
      </Box>

      <audio src="" ref={audio}></audio>
    </div>
  );
}

export default Reading;
