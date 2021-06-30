const home= require('../api/home')
const novel= require('../api/novel')


class homeController{
    async home(req,res){
        const data= await home.getBook()
        res.json({data})
    }
    async category(req,res){
        const data= await home.category()
        res.json({data})
    }
    async hotBook(req,res){
        const {id}= req.query
        const data= await home.hotBook(id || 'all')
        res.json({data})
    }
    async newBook(req, res){
        const {id}= req.query 
        const data= await home.newBook(id || 'all')
        res.json({data})
    }
}
 module.exports= new homeController