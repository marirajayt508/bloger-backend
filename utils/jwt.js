const jwt = require("jsonwebtoken");
const config = require("config");

exports.jwtEncrypt =(data, time)=>{
    return jwt.sign(data,config.get("app.jwt"),{ expiresIn: time })
}

exports.jwtDecode = (token)=>{
    return jwt.decode(token,config.get("app.jwt"))
}

exports.jwtVerify = (token)=>{
    return jwt.verify(token,config.get("app.jwt"))
}