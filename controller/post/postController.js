const codes = require("../../utils/resonsecode")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")
const postModal = require("../../modal/blogModal");
const fs = require("fs")
const jwt = require("../../utils/jwt")

//Create Post
exports.addpost = asyncErrorHandler(async (_request,_response,next)=>{
    let req = _request.body;
    let file = _request.file;
    let body = {
        blogname : req.blogname,
        tagline : req.tagline,
        by : req.by,
        description : req.description
    }
    if(file)
    {
        body['image'] = file.path
    }
    // console.log(body)
    if(!(body.blogname && body.tagline && body.description && body.by && body.image))
    {
        next(err)
    }   
     postModal.insertMany(body)
    let serviceResponse = {
        "message" : 'Post Created',
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//Edit post
exports.editpost = asyncErrorHandler(async (_request,_response,next)=>{
   let body = _request.body
   let files = _request.file
   let _id = _request.params.id
   if(files)
   {
    body['image'] = files.path
   }
   if(!body && !_id)
   {
     next(err)
   }
   await postModal.findByIdAndUpdate(_id,body,{new:true})
    let serviceResponse = {
        "message" : `Post Updated`,
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//Get All post
exports.getpost = asyncErrorHandler(async (_request,_response,next)=>{
    let token = _request.query.aut;
    let verify = await jwt.jwtVerify(token)
    if(!token) 
    {
        next(err)
    }
   var blogs = await  postModal.find()
    if(verify.role.toLowerCase() === "admin")
    {
         blogs = await  postModal.find({
            "by" : verify.username.toLowerCase()
        })
    }


    let serviceResponse = {
        blogs
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//Delete Post
exports.deletepost = asyncErrorHandler(async (_request,_response,next)=>{
   let _id = _request.query.id
   let image = _request.query.name

   if(!_id)
   {
    next(err)
   }  

   await postModal.findByIdAndDelete(_id)
    let serviceResponse = {
        "message" : "Post Deleted",
  };

    _response.status(codes.success)
    .json(serviceResponse);
})

//Update Commands
exports.command = asyncErrorHandler(async (_request,_response,next)=>{
    let body = _request.body
    let _id = body.id
    if(!body.data && !_id)  
    {
      next(err)
    }
    await postModal.findByIdAndUpdate(_id,{"$push" : {
        "commands" : {
            "username" : body.data.username,
            "command" : body.data.cmnd }}}
            )
     let serviceResponse = {
         "message" : "Commanded",
   };
 
     _response.status(codes.success)
     .json(serviceResponse);
 })