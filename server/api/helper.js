const morgan= require('morgan')
const cheerio= require('cheerio')
const axios= require('axios')

module.exports=  async url=>{
    return axios.get(url)
           .then(res=>cheerio.load(res.data))
           .catch(err=> {
            error.status = (error.response && error.response.status) || 500;
            throw error;
           })
}