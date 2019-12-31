const express =require('express');
const router = express.Router();
const Admin = require("../model/admin");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const nodemailer = require('nodemailer');
const log = console.log;
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get("/reset", (req,res,next) => {
const passkey = makeid(8);
console.log(passkey);
Admin.findOne()
.then(user => {
  bcrypt.hash(passkey, 10).then(hash => {
    const admin = new Admin({
      _id: user._id,
      email: user.email,
      password: hash
      });
      Admin.updateOne({email: user.email} , admin).then(result => {
        const email = user.email;
        const content = "Password Has Been Changed. Kindly Use " + "' " + passkey + " '" +" As Your Password To Login To Your Account.";


// Step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user:'sgplib123@gmail.com', // TODO: your gmail account
      pass: 'sgplib@2k19' // TODO: your gmail password
  }
});


// Step 3
let mailOptions = {
  from: 'sgplib123@gmail.com', // TODO: email sender
  to: email, // TODO: email receiver
  subject: 'Password Changed Successfully',
  text: content,

};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    log(err);
  return  res.status(500).json({message: 'Failed to send email'});
  }
  return res.status(200).json({message: 'Password Changed... Kindly Check Your Email!!'});
});


      });
  });
});
});

router.post("/create",(req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const admin = new Admin({
      email: req.body.email,
      password: hash
    });
    admin.save()
      .then(result => {
        res.status(201).json({
          message: "Admin created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login",(req ,res, next) => {
  let fetchedAdmin;

Admin.findOne({email: req.body.email }).then(user => {
  if (!user) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
  fetchedAdmin = user;
  return bcrypt.compare(req.body.password , user.password );
})
.then(result => {
  if (!result) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  const token = jwt.sign({email: fetchedAdmin.email, userId: fetchedAdmin._id}, process.env.TOKEN, {expiresIn: "4h"});
  res.status(200).json({
    token: token,
    expiresIn: 14400
  })
})
.catch(err => {
  return res.status(401).json({
    message: "Auth Failed"
  });
});
});

router.get('/get/:pass',checkAuth,(req,res,next)=> {
  pass = req.params.pass;

  bcrypt.hash(pass, 10).then(hash => {
  Admin.findOne()
  .then(user => {
    return bcrypt.compare(pass , user.password)
    .then(result => {

      if(!result) {
        res.status(200).json({
          message: "Invalid Password",
          valid: false
        });
      } else {
       res.status(200).json({
         message: "Password Accepted",
         valid: true
       });

 }
  });
  });

});
});


router.get('/change/:pass',checkAuth,(req,res,next) => {
pass= req.params.pass;
console.log(pass);
bcrypt.hash(pass, 10).then(hash => {
Admin.findOne()
.then(user => {
const admin = new Admin({
  _id: user._id,
email: user.email,
password: hash
});
console.log(admin)
Admin.updateOne({email: user.email } , admin)
.then(result => {
res.status(200).json({message: "Password Changed"});
});
});
});

});


router.post('/emailChange', checkAuth ,(req,res,next) => {
Admin.findOne({email: req.body.current_email})
.then(user => {
if(!user) {
  res.status(200).json({message: 'Invalid Email!!'});
} else {
  const admin = new Admin({
    _id: user._id,
  email: req.body.new_email,
  password: user.password
  });
  Admin.updateOne({email: req.body.current_email } , admin)
  .then (postData => {
res.status(200).json({message: 'Email Changed'});
  });
}
});
});
module.exports = router;
