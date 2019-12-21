const express =require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const nodemailer = require('nodemailer');
const log = console.log;

router.post("", checkAuth, (req, res, next) => {
 email = req.body.email;
 content = req.body.content;

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
  subject: 'Book not Returned',
  text: content,

};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    log(err);
  return  res.status(500).json({message: 'Failed to send email'});
  }
  return res.status(200).json({message: 'Email sent Successfully'});
});

});
module.exports =router;
