const morgan= require('morgan')
const cheerio= require('cheerio')
const axios= require('axios')
const fetchHtml= require('./helper')
module.exports= {
    async getBook() {
        let $
        let value=[]
        $= await fetchHtml('https://truyenfull.vn/')
        $(".index-intro > .item").map((i, el)=>{
            let x = $(el).find('a')
            let img= x.find('img')
            value.push({
                url: x.attr('href'),
                img: img.attr('src').includes('.gif') ? img.attr('lazysrc'): img.attr('src'),
                title: x.find('h3').text(),
            })
        })
        return value
    },
    async category(){
        let $, value=[];
        $= await fetchHtml('https://truyenfull.vn/')
        $('.dropdown-menu.multi-column  ul')
        .find('a').map((i, el)=>{
            value.push({
                url: $(el).attr('href'),
                title:$(el).text()
            })
        })
        return value
    },
    async hotBook(id){
        let $, value=[];
        $= await fetchHtml(`https://truyenfull.vn/ajax.php?type=hot_select&id=${id}`)
        $('body .item').map((i, el)=>{
            let x = $(el).find('a')
            let img= x.find('img')
            value.push({
                url: x.attr('href'),
                img: img.attr('src').includes('.gif') ? img.attr('lazysrc'): img.attr('src'),
                title: x.find('h3').text(),
            })
        })
        return value
    },
    async selectBook(){},
}

