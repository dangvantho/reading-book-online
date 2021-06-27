const morgan= require('morgan')
const cheerio= require('cheerio')
const axios= require('axios')
const fetchHtml= require('./helper')
module.exports= async function getBook() {
    let $
    let value=[]
    $= await fetchHtml('https://truyenfull.vn/')
    $(".index-intro > .item").map((i, el)=>{
        let x = $(el).find('a')
        value.push({
            url: x.attr('href'),
            img: x.find('img').attr('src'),
            title: x.find('h3').text()
        })
    })
    return value
}

