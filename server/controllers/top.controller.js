const axios = require("axios");
const topStory = require("../api/topStory");
module.exports = new (class {
  async index(req, res) {
    try {
      const { type, cat } = req.query;
      const data =await topStory.getTopStory(type || "day", cat);
      // console.log(data)
      res.json({
        data,
      });
    } catch (error) {
      res.status(404).json({ err: error });
    }
  }
})();
