const express =require('express');
const router = express.Router();
const Book = require("../model/book");
const checkAuth = require("../middleware/check-auth");
const accession = require("../model/accession");

router.get("/getAccession", checkAuth, (req,res,next) => {
 accession.find({}).then(result =>{
res.status(200).json({
  message:"Got Accession",
  accession: result
});
 });
  });

  router.post("/updateAccession",checkAuth,(req,res,next) => {
console.log(req.body);
    const acc = new accession({
     _id: req.body._id,
     accession_no: req.body.accession_no
    });

    accession.updateOne({_id: req.body._id}, acc).then(() =>{
      res.status(200).json({
        message: 'Accession Updated'
      });
    });

  });


  router.get("/SaveAccession/:accession", checkAuth, (req, res, next) => {
    const acc = new accession({
    accession_no: req.params.accession,

    });
    acc.save()
    .then(() => {
      res.status(201).json({
        message: "Accession saved Successfully!"
      });
    }).catch(err => {
          res.status(500).json({
      error: err
      });
    });

  });


router.get("/get/:isbn", checkAuth, (req,res,next) => {
const isbn= req.params.isbn;
Book.find({isbn: isbn , deleted: false}).sort({_id:-1})
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
  let fetchedBooks;
  const toskip = pageSize * (currentPage -1);
  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , title: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          {
            $group:
              {
               _id: "$isbn",

                isbn: { $first: "$isbn" },
                title: { $first: "$title" },
                author: { $first: "$author" },
                source: { $first: "$source" },
                subject: { $first: "$subject" },
                accession_no: { $first: "$accession_no" },
                available: { $first: null },
                total: { $sum: 1 }
              }

          }
        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , title: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
        {$group:{ _id: "$isbn"}}, {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});

router.get("/getbytitle2", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const title = req.query.title;
  let toskip = 0;
  const regex = new RegExp(escapeRegex(title), 'gi');
  let fetchedBooks;
  if(pageSize && currentPage){
    toskip = pageSize * (currentPage -1);
 }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , title: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          { $limit: pageSize}
                  ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , title: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
         {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {
    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});

router.get("/getbyauthor2", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  let toskip = 0;
  let fetchedBooks;

  const regex = new RegExp(escapeRegex(author), 'gi');
  if(pageSize && currentPage){
     toskip = pageSize * (currentPage -1);
  }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , author: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          { $limit: pageSize}


        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , author: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
         {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {

    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});


router.get("/getbyauthor", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const author = req.query.author;
  let toskip = 0;
  let fetchedBooks;

  const regex = new RegExp(escapeRegex(author), 'gi');
  if(pageSize && currentPage){
     toskip = pageSize * (currentPage -1);
  }

  const bookQuery = Book.aggregate(
      [   { $match : { deleted : false , author: regex} },
          { $sort: { _id: -1 } },
          { $skip : toskip },
          {
            $group:
              {
               _id: "$isbn",

                isbn: { $first: "$isbn" },
                title: { $first: "$title" },
                author: { $first: "$author" },
                source: { $first: "$source" },
                subject: { $first: "$subject" },
                accession_no: { $first: "$accession_no" },
                available: { $first: null },
                total: { $sum: 1 }
              }

          }
        ]
      );

  const bookQuery2 = Book.aggregate(
    [   { $match : { deleted : false , author: regex} },
      { $skip : toskip },
        { $sort: { _id: -1 } },
        {$group:{ _id: "$isbn"}}, {$count: "count"}
      ]
    );
   bookQuery.then(documents =>{
     fetchedBooks= documents;
  bookQuery2.then(result => {

    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
  });

     });
});


router.get("/getbycard", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const cardNo = req.query.cardNo;
  let bookQuery2 = Book.countDocuments({ borrowed: true , deleted: false}).sort({_id:-1});
  let bookQuery = Book.find({ borrowed: true , deleted: false}).sort({_id:-1});
  if(cardNo != '') {
   bookQuery = Book.find({ cardNo: cardNo , deleted: false}).sort({_id:-1});
   bookQuery2 =  Book.countDocuments({cardNo: cardNo , deleted: false}).sort({_id:-1});
  }

  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);

  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;

      bookQuery2.then (count => {
        res.status(200).json({
          message: "Books fetched succesfully!",
          books: fetchedBooks,
          count: count
        });
       });
   });
});


router.get("/all/:accessionNo", checkAuth,(req, res, next) => {
const accessionNo = req.params.accessionNo;
let fetchedBooks ;
Book.find({accession_no: accessionNo, deleted: false }).sort({_id:-1}).then(documents =>{
   fetchedBooks = documents;
if(fetchedBooks.length > 0){

  return Book.countDocuments({isbn:fetchedBooks[0].isbn, deleted: false }).sort({_id:-1});
} else {
  return Book.countDocuments({isbn:0, deleted: false }).sort({_id:-1});
}

 }).then (result => {

    res.status(200).json({
      message: "Books fetched succesfully!",
      books: fetchedBooks,
      count: result
    });
   });
  });

router.get("", checkAuth,(req, res, next) => {
  const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
let fetchedBooks;
const bookQuery = Book.aggregate(
[   { $match : { deleted : false } },
    { $sort: { _id: -1 } },
    {
      $group:
        {
          _id: "$isbn",

          isbn: { $first: "$isbn" },
          title: { $first: "$title" },
          author: { $first: "$author" },
          source: { $first: "$source" },
          subject: { $first: "$subject" },
          accession_no: { $first: "$accession_no" },
          available: { $first: null },
          total: { $sum: 1 }
        }

    }
  ]
);
const bookQuery2 = Book.aggregate(
  [   { $match : { deleted : false } },
      { $sort: { _id: -1 } },
      {$group:{ _id: "$isbn"}}, {$count: "count"}
    ]
  );
if(pageSize && currentPage){
bookQuery.skip(pageSize * (currentPage -1))
.limit(pageSize);
}
 bookQuery.then(documents =>{
   fetchedBooks= documents;
bookQuery2.then(result => {
  res.status(200).json({
    message: "Books fetched succesfully!",
    books: fetchedBooks,
    count: result
  });
});

   });
  });



  router.get("/Available", checkAuth,(req, res, next) => {
  const requiredBook = req.query.isbn;
  const bookQuery = Book.countDocuments({ isbn: requiredBook,deleted: false, borrowed: false});
    bookQuery.then(document => {
res.status(200).json({
message: "Got available",
available: document
});
    });
});




  router.get("/BooksAll", checkAuth,(req, res, next) => {
    const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const requiredBook = +req.query.book;

  let bookQuery = Book.find({ deleted: false});
  let bookQuery2 = Book.countDocuments({ deleted: false});
  if(requiredBook){
    bookQuery =  Book.find({ deleted: false, isbn: requiredBook});
    bookQuery2 =  Book.countDocuments({ deleted: false, isbn: requiredBook});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
  bookQuery.skip(pageSize * (currentPage -1))
  .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
      return bookQuery2;
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
  let bookQuery = Book.find({ borrowed: true , deleted: false}).sort({_id:-1});
  if(dept != '') {
   bookQuery = Book.find({ borrower_dept: dept, deleted: false}).sort({_id:-1});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(dept != '') {
      return Book.countDocuments({borrower_dept: dept, deleted: false}).sort({_id:-1});
     }
      return Book.countDocuments({ borrowed: true, deleted: false}).sort({_id:-1});
   }).then (count => {
      res.status(200).json({
        message: "Books fetched succesfully!",
        books: fetchedBooks,
        count: count
      });
     });
    });
router.get("/getByCardNo/:cardNo",checkAuth,(req,res,next) => {
Book.find({cardNo: req.params.cardNo}).sort({_id:-1})
.then(result => {
  res.status(200).json({message: 'got Book', book: result}).sort({_id:-1});
});
});

router.post("/updateEmail",checkAuth,(req,res,next) => {
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
    borrower_dept: req.body.borrower_dept,
    deleted: req.body.deleted
  });

  Book.updateOne({_id: req.body._id}, book).then(() =>{
    res.status(200).json({
      message: 'Book Updated'
    });
  });

});


 router.post("", checkAuth, (req, res, next) => {
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
  borrow_date: null,
  borrower_email: "",
  borrower_phone: null,
  borrower_dept: '',
  deleted: false
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

router.put("/deleteOne/:id",  checkAuth,(req,res,next) =>{
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
    borrower_dept: req.body.borrower_dept,
    deleted: true
  });

  Book.updateOne({_id: req.body._id}, book).then(() =>{
    res.status(200).json({
      message: 'Book Deleted'
    });
  });
  });


router.get("/:accessionNo", checkAuth,(req,res,next) => {
  Book.find({ accession_no: req.params.accessionNo, deleted: false}).sort({_id:-1})
  .then(documents => {
res.status(200).json({
message: "book found",
book : documents
});
});
});


router.get("/records/:cardNo", checkAuth,(req,res,next) => {
  Book.find({ cardNo: req.params.cardNo }).sort({_id:-1})
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
  borrow_date: Date(Date.now()),
  borrower_email: req.body.borrower_email,
  borrower_phone: req.body.borrower_phone,
  borrower_dept: req.body.borrower_dept,
  deleted: req.body.deleted
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
    borrow_date: null,
    borrower_dept: req.body.borrower_dept,
    borrower_email: '',
    borrower_phone: null,
    deleted: req.body.deleted
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
