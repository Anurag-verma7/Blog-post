const mongoose = require('mongoose')
const articleschema = new mongoose.Schema(
    {
        title : {
            type : String,
            required :true,
        },
        description : {
            type : String,
        },
        markdown : {
            type : String,
            required :true,
        },
        createdon :{
            type : Date,
            default : Date.now,
        }
    }
)
module.exports = mongoose.model('Article',articleschema);