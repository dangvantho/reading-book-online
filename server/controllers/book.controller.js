const novel = require("../api/novel");
const axios = require("axios");
function speechText(text = "", speech = 1) {
  return axios
    .post("https://texttospeechapi.wideo.co/api/wideo-text-to-speech", {
      data: { text, speech, voice: "vi-VN-Standard-A" },
    })
    .then(async (res) => {
      return res.data.result.url;
    });
}
class bookController {
  async index(req, res) {
    const { link } = req.params;
    const data = await Promise.all([
      novel.getDesc(link),
      novel.getMaxPage(link),
      novel.getPageLink(link, 1),
    ]);
    const [title, maxPage, links] = data;
    const { desc, info } = title;
    res.json({
      data: {
        desc,
        info,
        maxPage,
        links,
        title: title.title,
      },
    });
  }
  async getPageChapter(req, res) {
    const { page } = req.query;
    const { link } = req.params;
    const data = await novel.getPageLink(link, page || 1);
    res.json({
      data,
    });
  }
  async contentChapter(req, res) {
    const { link, chapter } = req.params;
    const content = await novel.getContentChapter(link, chapter);
    const text = content.split(".").filter((value) => value != "");
    let values = await Promise.allSettled(
      text.map((value) => speechText(value))
    );
    // console.log("Loading: ", loading);
    const result = [];
    values.forEach((value) => {
      if (value.status === "fulfilled") {
        result.push(value.value);
      }
    });
    console.log("get content book done");
    res.json({data: result});
  }
}

module.exports = new bookController();
