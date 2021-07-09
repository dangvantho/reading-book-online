const fetchHtml = require("./helper");
module.exports = new (class {
  async getTopStory(type, cat) {
    const $ = await fetchHtml(
      `https://truyenfull.vn/ajax.php?type=top_switch&data_type=${type}&data_limit=10${cat ? '&data_cat='+cat: ''}`
    );
    const result = [];
    $(".row").map((i, el) => {
      const x = $(el);
      const topNum = x.find(".top-num").text();
      const book = x.find(".s-title a");
      const genre = [];
      x.find('a[itemprop="genre"]').map((i, el) => {
        const url = $(el);
        genre.push({
          url: url.attr("href"),
          title: url.text(),
        });
      });
      result.push({
        topNum,
        book: {
          url: book.attr("href"),
          title: book.text(),
        },
        genre,
      });
    });
    return result;
  }
})();
