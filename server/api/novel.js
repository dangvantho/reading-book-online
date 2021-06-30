const cheerio= require('cheerio')
const axios= require('axios')
const fetchHtml= require('./helper')

module.exports= {
    async getTitle(url){
        try {
            let $= await fetchHtml(`https://truyenfull.vn/${url}`)
        let text= $('.desc-text').text()
        return text
        } catch (error) {
            throw new Error(error)
        }
    },
    async getMaxPage(url){
        let $= await fetchHtml(`https://truyenfull.vn/${url}`)
        let value=[]
        let pagination= $('.pagination li a').map((i,el)=>{
            let x= $(el)
            value.push(x.attr('href'))
        })
        const len= value.length
        let link= value[len-2].split('/')
        let page= link[link.length - 2].split('-')[1]-0
        return page
    },
    async getPageLink(url, page){
        let $= await fetchHtml(`https://truyenfull.vn/${url}/trang-${page}/#list-chapter`)
        let value=[]
        let listChapter= $('.list-chapter a')
        listChapter.map((i,el)=>{
            let x= $(el)
            value.push({
                url: x.attr('href'),
                title: x.text()
            })
        })
        return value
    },
    async getContentChapter(url, chapter){
        let $= await fetchHtml(`https://truyenfull.vn/${url}/${chapter}`)
        let content= $('#chapter-c').html()
        const data= content.split('<br>').filter(value=> !!value && !value.includes('p>') && !value.includes('<div'))
        return data
    }
}