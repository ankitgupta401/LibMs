const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./model/users");
const Book = require("./model/book");
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ankit:kp4alWdX6DrSYmK2@libms-mq4nn.mongodb.net/Libms-users?retryWrites=true&w=majority')
.then(() => {
console.log('Connected to Database');
})
.catch(() => {
  console.log('Connection Failed');
});
var cardno=1000;
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
    cardNo: cardno++,
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
    message: "The user was updated successfully",

  });


})

app.get("/api/books", (req, res, next) => {
  Book.find().then(documents =>{
   res.status(200).json({
     message: "Books fetched succesfully!",
     books: documents
   });
  });
 });

app.get("/api/cardno",(req,res,next) =>{
res.status(200).json({
  message: "CardNo Fetched",
  card: cardno
})
});
app.post("/api/books", (req, res, next) => {
  const book = new Book({
  accession_no: req.body.accession_no,
  author:req.body.author,
  cost: req.body.cost,
  edition: req.body.edition,
  isbn: req.body.isbn,
  pages: req.body.pages,
  publisher:req.body.publisher,
  remark: req.body.remark,
  source: req.body.source,
  subject: req.body.subject,
  title: req.body.title,
  topics:req.body.topics,
  volume: req.body.volume,
  year: req.body.year,
  borrowed:false,
  borrower: "",
  borrow_date:"",
  })
  book.save();
  res.status(201).json({
    message: "Book saved Successfully!"
  });
});
app.delete("/api/users/:id",(req,res,next) => {
 User.deleteOne({ _id: req.params.id }).then(result => {
   console.log(result);
   res.status(200).json({ message: "User Deleted"});
 });
});
app.delete("/api/books/:id",(req,res,next) =>{
  Book.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Book Deleted"});
  });
});

module.exports = app;
