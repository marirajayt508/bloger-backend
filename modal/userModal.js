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

const userSchema =  new mongoose.Schema({
"username": {
  "type" : String,
},
"email": {
    "type" : String,
  },
  "password":{
    "type" : String,
  }, 
  "role":{
    "type" : String,
  }
});

const userModal = mongoose.model(config.get("app.db.collections.userDetails"),userSchema);

module.exports = userModal;