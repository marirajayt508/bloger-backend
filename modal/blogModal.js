const mongoose = require("mongoose");
const config = require('config'); 

//Verify Connection
const connection = mongoose.connection;

connection.on("connected",()=>{
console.log("User MODAL CONNECTED")
  });

connection.on("error",()=>{
console.log("User MODAL CONNECTION ERROR")
});

const blogSchema =  new mongoose.Schema({
"blogname": {
  "type" : String,
   "unique": true
},
"tagline": {
    "type" : String,
     "unique": true
  },
  "description":{
    "type" : String,
  },
  "image":{
    "type" : String,
  },
  "by":{
    "type" : String,
  },
  "commands" : {
   "type" : Array,
   "default" : []
  }
});

const blogModal = mongoose.model(config.get("app.db.collections.blogDetails"),blogSchema);

module.exports = blogModal;