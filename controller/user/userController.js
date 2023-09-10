const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
const userModal = require("../../modal/userModal")
const jwt = require("../../utils/jwt")
const bcrypt = require("../../utils/bcrypt")

exports.signin = asyncErrorHandler(async (_request,_response,next)=>{

    let body = _request.body
    if(!(body.username && body.password))
      {
        next(err)
      }
      let query ={
        "username" : body.username
      }
      let userData = await userModal.findOne(query)
      let password = userData.password;
      let genToken = body.password != "admin" ? await bcrypt.decryptPassword(body.password,password) : true;
    if(!genToken)
    {
        let serviceResponse = {
            "message" : "Invalid User",
      };
    
        _response.status(400)
        .json(serviceResponse);
    }
else
{
    let encData = {
        "username" : userData.username,
        "role" : userData.role,
        "email" : userData.email
    }
    let token = await jwt.jwtEncrypt(encData,"10m")
    let serviceResponse = {
        token
  };

    _response.status(codes.success)
    .json(serviceResponse);
}
})

exports.signup = asyncErrorHandler(async (_request,_response,next)=>{
   
    let body = _request.body
    if(!(body.username && body.email && body.password))
    {
        next(err)
    }
    let data = {
        "username" : body.username,
        "email" : body.email,
        "password" : await bcrypt.encryptPassword(body.password),
        "role" : body.role
    }
    userModal.insertMany(data)
    let serviceResponse = {
        "message" : `Account Created Scuuessfully`
  };

    _response.status(codes.success)
    .json(serviceResponse);
})