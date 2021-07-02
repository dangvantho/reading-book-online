const cheerio = require("cheerio");
const axios = require("axios");
const fetchHtml = require("./helper");

module.exports = {
  async getDesc(url) {
    try {
      let $ = await fetchHtml(`https://truyenfull.vn/${url}`);
      let desc = $(".desc-text").text();
      let info = $(".info");
      const img= $('.books img')
      let genre = [];
      info.find('a[itemprop="genre"]').map((i, el) => {
        let x = $(el);
        genre.push({
          url: x.attr("href"),
          title: x.text(),
        });
      });
      const author = info.find('a[itemprop="author"]');
      return {
        desc,
        info: {
          genre,
          author: {
            url: author.attr("href"),
            title: author.text(),
          },
          source: info.find(".source").text(),
          status: info.find("span.text-primary").text(),
          img: img.attr('src')
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  async getMaxPage(url) {
    let $ = await fetchHtml(`https://truyenfull.vn/${url}`);
    let value = [];
    let pagination = $(".pagination li a").map((i, el) => {
      let x = $(el);
      value.push(x.attr("href"));
    });
    if (value.length === 0) {
      return 0;
    }
    const len = value.length;
    console.log(value[len - 2]);
    let link = value[len - 2].split("/");
    let page = link[link.length - 2].split("-")[1] - 0;
    return page;
  },
  async getPageLink(url, page) {
    let $ = await fetchHtml(
      `https://truyenfull.vn/${url}/trang-${page}/#list-chapter`
    );
    let value = [];
    let listChapter = $(".list-chapter a");
    listChapter.map((i, el) => {
      let x = $(el);
      value.push({
        url: x.attr("href"),
        title: x.text(),
      });
    });
    return value;
  },
  async getContentChapter(url, chapter) {
    let $ = await fetchHtml(`https://truyenfull.vn/${url}/${chapter}`);
    let content = $("#chapter-c").text();
    return content
  },
};
