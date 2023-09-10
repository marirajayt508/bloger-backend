const bcrypt  = require("bcrypt")
const config = require("config");

exports.encryptPassword = (password)=>{
  return bcrypt.hash(password,config.get("app.bscriptSalt")).then((hash)=>{
      return hash;
  });
}

exports.decryptPassword = (password,hash)=>{
  return bcrypt.compare(password,hash).then((res)=>{
    console.log(password)
    return res;
  })
}