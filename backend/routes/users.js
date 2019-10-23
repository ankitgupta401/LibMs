const express =require('express');
const router = express.Router();
const User = require("../model/users");
const multer = require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg',
  'image/PNG': 'png',
  'image/JPEG': 'jpg',
  'image/JPG' : 'jpg'
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIme Type')
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
 cb(null, name + '-' + Date.now() + '.' +  ext);
  }
});

router.get("", (req, res, next) => {
  User.find().then(documents =>{
   res.status(200).json({
     message: "Posts fetched succesfully!",
     users: documents
   });
  });
 });




 router.post("", multer({storage: storage}).single("image"),(req, res, next) => {
  url = req.protocol + "://" + req.get("host");
  const user = new User({
     fname: req.body.fname,
     lname: req.body.lname,
     cardNo: req.body.cardNo,
     address: req.body.address,
     Roll: req.body.Roll,
     category: req.body.category,
     city: req.body.city,
     dept: req.body.dept,
     email: req.body.email,
     phone_no: req.body.phone_no,
     sem: req.body.sem,
     state: req.body.state,
     year: req.body.year,
     zip: req.body.zip,
     imagePath: url + "/images/" + req.file.filename
   });

   user.save();
   res.status(201).json({
     message: "The user was Added successfully",

  });
 });
 router.delete("/:id",(req,res,next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "User Deleted"});
  });
 });

 router.put("/:id",(req,res,next) => {
  const user =new User({
    _id: req.body._id,
    fname: req.body.fname,
      lname: req.body.lname,
      cardNo: req.body.cardNo,
      address: req.body.address,
      Roll: req.body.Roll,
      category: req.body.category,
      city: req.body.city,
      dept: req.body.dept,
      email: req.body.email,
      phone_no: req.body.phone_no,
      sem: req.body.sem,
      state: req.body.state,
      year: req.body.year,
      zip: req.body.zip,
      imagePath: req.body.imagePath
  });
    User.updateOne({ _id: req.params.id }, user).then( result =>{
      console.log(req.params.id)
      console.log(result);
      res.status(200).json({
        message: "the user is updated successfully"
      })
    });
  });

  module.exports =router;
