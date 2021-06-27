const cheerio= require('cheerio')
const axios= require('axios')
const fetchHtml= require('./helper')

module.exports= {
    async getTitle(url){
        let $= await fetchHtml(url)
        let text= $('.desc-text.desc-text-full').text()
        return text
    }
}