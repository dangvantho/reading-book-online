const fetchHtml = require("./helper");
const axios = require("axios");

class Genre {
  async getListBook(genre, page) {
    try {
      const values = [];
      let $ = await fetchHtml(
        `https://truyenfull.vn/the-loai/${genre}/${page ? page : ""}`
      );
      const desc= $('.cat-desc').html()
      const list = $(".col-truyen-main .list.list-truyen");
      const title = list.find(".title-list h2").text();
      list.find(".row").map((i, el) => {
        const element = $(el);
        const url = element.find('a[itemprop="url"]').attr("href");
        const title = element.find('a[itemprop="url"]').text();
        const author = element.find(".author").text();
        const img = element
          .find(".col-xs-3")
          .find("div[data-image]")
          .attr("data-desk-image");
        // console.log(element.find('.col-xs-3').html())  
        let status=[]
        element.find('.label-title').map((i,el)=>{
            const classes= $(el).attr('class')
            status.push(classes.split(' ')[1].split('-')[1])
        })
        const textInfo = element.find(".text-info");
        const chapter = {
          url: textInfo.find("a").attr("href"),
          title: textInfo.text(),
        };
        if (title && url && img) {
          values.push({
            title,
            url,
            author,
            img,
            status,
            chapter,
          });
        }
      });
      return {
        title,
        desc,
        data: values,
      };
    } catch (error) {
      return { err: error };
    }
  }
}
module.exports = new Genre();
