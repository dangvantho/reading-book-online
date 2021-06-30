const novel= require('../api/novel')
class bookController{
    async index(req,res){
        const {link}= req.params
        const data=await Promise.all([novel.getTitle(link),novel.getMaxPage(link),novel.getPageLink(link,1)])
        const [title, maxPage, links]= data
        res.json({
            data: {
                title, maxPage, links
            }
        })
    }
    async getPageChapter(req,res){
        const {page}= req.query
        const {link}= req.params
        const data= await novel.getPageLink(link, page || 1 )
        res.json({
            data
        })
    }
    async contentChapter(req,res){
        const {link, chapter}= req.params
        const content= await novel.getContentChapter(link, chapter)
        res.json({
            data: content
        })
    }
}

module.exports= new bookController