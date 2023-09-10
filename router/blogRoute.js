const router = require("express").Router()
const user = require("../controller/user/userController")
const post = require("../controller/post/postController")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
router.route("/signup")
.post(user.signup);

router.route("/signin")
.post(user.signin);

router.route("/getallpost")
.get(post.getpost);

router.route("/addpost")
.post(upload.single('image'),post.addpost);

router.route("/updatepost/:id")
.put(upload.single('image'),post.editpost);

router.route("/deletepost")
.delete(post.deletepost);

router.route("/addcomment")
.patch(post.command);




//Export Module
module.exports = router;