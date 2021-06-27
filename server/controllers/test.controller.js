const home= require('../api/home')
const novel= require('../api/novel')


class testController{
    async home(req,res){
        const data= await home()
        res.json(data)
    }
}
 module.exports= new testController