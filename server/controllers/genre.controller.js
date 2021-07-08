const Genre = require("../api/genre");

class genreController{
  async index(req, res) {
    try {
        const { genre, page }= req.query
        const data= await Genre.getListBook( genre, page)
        res.json({ data })
    } catch (error) {
        res.json({ err: error })
    }
  }
  async hotCategory(req,res){
      try {
          
      } catch (error) {
          
      }
  }
}
module.exports= new genreController
