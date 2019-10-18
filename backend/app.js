const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./model/users");
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ankit:kp4alWdX6DrSYmK2@libms-mq4nn.mongodb.net/Libms-users?retryWrites=true&w=majority')
.then(() => {
console.log('Connected to Database');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.get("/api/users", (req, res, next) => {
 User.find().then(documents =>{
  res.status(200).json({
    message: "Posts fetched succesfully!",
    users: documents
  });
 });
});

app.post("/api/users",(req, res, next) => {
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
  });

  user.save();
  res.status(201).json({
    message: "The user was updated successfully"
  });
})

app.get("/api/books", (req, res, next) => {
  const books = [
    {
      id: "dfksh",
      accession_no: 75834857,
      author: "benugopal",
      cost: 905,
      edition: "2",
      isbn: 123,
      pages: 453,
      publisher: "hdkalsh",
      remark: "ok",
      source: "",
      subject: "programming",
      title: "C Programming"
    },
    {
      id: "fadf12421l",
      title: "ankit G",
      cost: "8937488 "
    }
  ];
  res.status(200).json({
    message: "Books fetched succesfully!",
    books: books
  });
});
app.delete("/api/users/:id",(req,res,next) => {

 User.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "Post Deleted"});
 });

});
module.exports = app;
