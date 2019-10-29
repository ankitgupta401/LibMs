const express =require('express');
const router = express.Router();
const Book = require("../model/book");

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
const bookQuery = Book.find();
let fetchedBooks ;
if(pageSize && currentPage){
bookQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
 bookQuery.then(documents =>{
   fetchedBooks = documents;
    return Book.countDocuments();
 }).then (count => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: count
    });
   });
  });

  router.get("/issuedbooks", (req, res, next) => {
    const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery = Book.find({ borrowed: true});
  let fetchedBooks ;
  if(pageSize && currentPage){
  bookQuery.skip(pageSize * (currentPage -1))
  .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
      return Book.countDocuments({borrowed: true});
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
    });

 router.post("", (req, res, next) => {
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
  cardNo: null,
  borrower: "",
  borrow_date:"",
  })
  book.save()
  .then(() => {
    res.status(201).json({
      message: "Book saved Successfully!"
    });
  }).catch(err => {
        res.status(500).json({
    error: err
    });
  });

});

router.delete("/:id",(req,res,next) =>{
  Book.deleteOne({ _id: req.params.id }).then(result => {

    res.status(200).json({ message: "Book Deleted"});
  });
});

router.get("/:accessionNo",(req,res,next) => {
  Book.find({ accession_no: req.params.accessionNo})
  .then(documents => {
res.status(200).json({
message: "book found",
book : documents
});
});
});


router.get("/records/:cardNo",(req,res,next) => {
  Book.find({ cardNo: req.params.cardNo})
  .then(documents => {
res.status(200).json({
message: "Books Issued",
books : documents
});
});
});

router.put("/issueOne/:id", (req, res, next) => {
const book = new Book({
  _id: req.body._id,
  accession_no: req.body.accession_no,
  author: req.body.author,
  cost: req.body.cost,
  edition: req.body.edition,
  isbn: req.body.isbn,
  pages: req.body.pages,
  publisher: req.body.publisher,
  remark: req.body.remark,
  source: req.body.source,
  subject: req.body.subject,
  title:req.body.title,
  topics:req.body.topics,
  volume: req.body.volume,
  year: req.body.year,
  borrowed: req.body.borrowed,
  borrower: req.body.borrower,
  cardNo: req.body.cardNo,
  borrow_date: req.body.borrow_date,
});
Book.updateOne({_id: req.body._id}, book).then(() =>{
  res.status(200).json({
    message: 'Book Issued'
  });
});
});
router.put("/receiveOne/:id", (req, res, next) => {
  const book = new Book({
    _id: req.body._id,
    accession_no: req.body.accession_no,
    author: req.body.author,
    cost: req.body.cost,
    edition: req.body.edition,
    isbn: req.body.isbn,
    pages: req.body.pages,
    publisher: req.body.publisher,
    remark: req.body.remark,
    source: req.body.source,
    subject: req.body.subject,
    title:req.body.title,
    topics:req.body.topics,
    volume: req.body.volume,
    year: req.body.year,
    borrowed: req.body.borrowed,
    borrower: req.body.borrower,
    cardNo: req.body.cardNo,
    borrow_date: req.body.borrow_date,
  });
  Book.updateOne({_id: req.body._id}, book).then(() =>{
    res.status(200).json({
      message: 'Book Received'
    });
  });
  });

 module.exports = router;
