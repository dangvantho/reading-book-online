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
    async newBook(id){
        let $= await fetchHtml(`https://truyenfull.vn/ajax.php?type=new_select&id=${id}`)
        let value=[] 
        $('.row').map((i,el)=>{
            let x= $(el)
            let link= x.find('h3 a')
            let genre=[] 
            x.find('a[itemprop="genre"]').map((i,el)=>{
                let x= $(el)
                genre.push({
                    url: x.attr('href'),
                    title: x.text()
                })
            })
            let chapter= x.find('.text-info a')
            let updateAt= x.find('.col-time')
            console.log(link.attr('href'), link.text(),genre,  chapter.text(), updateAt.text())
            value.push({
                url: link.attr('href'),
                title: link.text(),
                genre,
                chapter: {
                    url: chapter.attr('href'),
                    number: chapter.text()
                },
                updateAt: updateAt.text()
            })
        })
        return value
    },
}

