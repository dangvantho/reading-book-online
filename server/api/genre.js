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
      let maxPage=1
      $('.pagination li').map((i,el)=>{
        const spanClass=$(el).find('span')
        if(!spanClass.attr('class')) return
        if(spanClass.attr('class').includes('arrow')){
          const link= $(el).find('a').attr('href')
          const split= link.split('/')
          const page= split[split.length-2]
          maxPage= page.split('-')[1]
        }
      })
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
        maxPage,
      };
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
  async getTopStory(type, cat) {
    const $ = await fetchHtml(
      `https://truyenfull.vn/ajax.php?type=top_switch&data_type=${type}&data_limit=10&data_cat=${cat}`
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
}
module.exports = new Genre();
