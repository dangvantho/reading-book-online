const Genre = require("../api/genre");

class genreController{
  async index(req, res) {
    try {
        const { genre, page }= req.query
        const data= await Genre.getListBook( genre, page)
        // console.log(page)
        res.json({ data })
    } catch (error) {
      console.log(error)
        res.status(400).json({err: error})
    }
  }
  async hotCategory(req,res){
      try {
        const { type, cat} = req.query
          const data= await Genre.getTopStory(type || 'day', cat)
          // console.log(data)
          res.json({ data })
      } catch (error) {
          console.log(error)
          res.status(400).send(error)
      }
  }
}
module.exports= new genreController
