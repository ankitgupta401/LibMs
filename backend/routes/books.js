const express =require('express');
const router = express.Router();
const Book = require("../model/book");
const checkAuth = require("../middleware/check-auth");


router.get("/get/:isbn", checkAuth, (req,res,next) => {
const isbn= req.params.isbn;
Book.find({isbn: isbn})
.then(documents => {
res.status(200).json({
books: documents,
message: "got matching book"
});
});
});

router.get("/getbytitle", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const title = req.query.title;
  const regex = new RegExp(escapeRegex(title), 'gi');
  let bookQuery = Book.find();
  if(title != '') {
   bookQuery = Book.find({ title: regex});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(title != '') {
      return Book.countDocuments({title: title.toUpperCase()});
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

router.get("/getbyauthor", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  const regex = new RegExp(escapeRegex(author), 'gi');
  let bookQuery = Book.find();
  if(author != '') {
   bookQuery = Book.find({ author: regex});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(author != '') {
      return Book.countDocuments({author: author.toUpperCase()});
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


router.get("/getbycard", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const cardNo = req.query.cardNo;
  let bookQuery = Book.find({ borrowed: true});
  if(cardNo != '') {
   bookQuery = Book.find({ cardNo: cardNo});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(cardNo != '') {
      return Book.countDocuments({cardNo: cardNo});
     }
      return Book.countDocuments({ borrowed: true});
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
});


router.get("/all/:accessionNo", checkAuth,(req, res, next) => {
const accessionNo = req.params.accessionNo;
let fetchedBooks ;
Book.find({accession_no:accessionNo }).then(documents =>{
   fetchedBooks = documents;
    return Book.countDocuments({accession_no:accessionNo });
 }).then (count => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: count
    });
   });
  });

router.get("", checkAuth,(req, res, next) => {
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

  router.get("/issuedbooks", checkAuth, (req, res, next) => {
    const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const dept = req.query.dept;
  let bookQuery = Book.find({ borrowed: true});
  if(dept != '') {
   bookQuery = Book.find({ borrower_dept: dept});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(dept != '') {
      return Book.countDocuments({borrower_dept: dept});
     }
      return Book.countDocuments({ borrowed: true});
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
    });

 router.post("", checkAuth, (req, res, next) => {
  const book = new Book({
  accession_no: req.body.accession_no,
  author:req.body.author.toUpperCase(),
  cost: req.body.cost,
  edition: req.body.edition,
  isbn: req.body.isbn,
  pages: req.body.pages,
  publisher:req.body.publisher,
  remark: req.body.remark,
  source: req.body.source,
  subject: req.body.subject,
  title: req.body.title.toUpperCase(),
  topics:req.body.topics,
  volume: req.body.volume,
  year: req.body.year,
  borrowed:false,
  cardNo: null,
  borrower: "",
  borrow_date:"",
  borrower_email: "",
  borrower_phone: null,
  borrower_dept: ''
  });
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

router.delete("/:id",  checkAuth,(req,res,next) =>{
  Book.deleteOne({ _id: req.params.id }).then(result => {

    res.status(200).json({ message: "Book Deleted"});
  });
});

router.get("/:accessionNo", checkAuth,(req,res,next) => {
  Book.find({ accession_no: req.params.accessionNo})
  .then(documents => {
res.status(200).json({
message: "book found",
book : documents
});
});
});


router.get("/records/:cardNo", checkAuth,(req,res,next) => {
  Book.find({ cardNo: req.params.cardNo})
  .then(documents => {
res.status(200).json({
message: "Books Issued",
books : documents
});
});
});

router.put("/issueOne/:id", checkAuth, (req, res, next) => {
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
  borrower_email: req.body.borrower_email,
  borrower_phone: req.body.borrower_phone,
  borrower_dept: req.body.borrower_dept
});

Book.updateOne({_id: req.body._id}, book).then(() =>{
  res.status(200).json({
    message: 'Book Issued'
  });
});
});




router.put("/receiveOne/:id", checkAuth, (req, res, next) => {
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
    borrower_dept: req.body.borrower_dept
  });
  Book.updateOne({_id: req.body._id}, book).then(() =>{
    res.status(200).json({
      message: 'Book Received'
    });
  });
  });
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



 module.exports = router;
