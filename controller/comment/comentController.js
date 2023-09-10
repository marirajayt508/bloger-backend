const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
// const userModal = require("../../modal/superadmin/userModal")
const jwt = require("../../utils/jwt")

exports.addcomment = asyncErrorHandler(async (_request,_response,next)=>{

    let serviceResponse = {
        "message" : `data fetched Successfully`,
        "Users" : "addcomment Works"
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

exports.deletecomment = asyncErrorHandler(async (_request,_response,next)=>{
   
    let serviceResponse = {
        "message" : `Post Deleted`,
  };

    _response.status(codes.success)
    .json(serviceResponse);
})