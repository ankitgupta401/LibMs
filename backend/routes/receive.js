const express =require('express');
const router = express.Router();
const Book = require("../model/receive");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req,res,next) => {
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
    cardNo: req.body.cardNo,
    borrower: req.body.borrower,
    borrow_date: req.body.borrow_date,
    receive_date: req.body.receive_date,
    fine: req.body.fine,
    Note:req.body.Note,
    borrower_dept: req.body.borrower_dept
    })
    book.save()
    .then(() => {
      res.status(201).json({
        message: "Book Added to Receive Register!"
      });
    }).catch(err => {
          res.status(500).json({
      error: err
      });
    });
});


router.get("", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
const dept = req.query.dept;
  let bookQuery = Book.find();
  if(dept != '') {
   bookQuery = Book.find({ borrower_dept: dept});
  }
if(pageSize && currentPage){
bookQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
 bookQuery.then(documents =>{
   fetchedBooks = documents;
   if(dept != '') {
    return Book.countDocuments({ borrower_dept: dept});
   }
    return Book.countDocuments();
 }).then (count => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: count
    });
   });
  });
  module.exports =router;
