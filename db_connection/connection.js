const mongoose = require("mongoose");
const config = require('config');

const uri = config.get("app.db.uri")

async function dbConnection()
{ 
    try{
        await mongoose.connect(uri) 
    }
    catch(error)
    {
        throw error
    }
}

dbConnection()



module.exports = dbConnection