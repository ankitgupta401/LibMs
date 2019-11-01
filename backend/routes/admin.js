const express =require('express');
const router = express.Router();
const Admin = require("../model/admin");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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
  console.log(req.body.email);
Admin.findOne({email: req.body.email }).then(user => {
  console.log(user);
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
  const token = jwt.sign({email: fetchedAdmin.email, userId: fetchedAdmin._id}, 'secret_this_should_be_longer', {expiresIn: "4h"});
  res.status(200).json({
    token: token,
    expiresIn: 14400
  })
})
.catch(err => {
  return res.status(401).json({
    message: "Auth Failed"
  });
})
});

module.exports = router;
