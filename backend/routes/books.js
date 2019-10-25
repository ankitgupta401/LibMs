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
    return Book.count();
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
  borrower: "",
  borrow_date:"",
  })
  book.save();
  res.status(201).json({
    message: "Book saved Successfully!"
  });
});

router.delete("/:id",(req,res,next) =>{
  Book.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Book Deleted"});
  });
});
 module.exports = router;
