const express =require('express');
const router = express.Router();
const Book = require("../model/receive");
const Book2 = require("../model/book");
const checkAuth = require("../middleware/check-auth");


router.get('/IssueData', checkAuth,(req,res,next) => {
let IssueData = 0;
  date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
  today = date.getFullYear() + '-' + ( date.getMonth() + 1) + '-' + date.getDate();

  Book.countDocuments(
    { "borrow_date": {$gte: today }  }
    ).
  then(result => {
    Book2.countDocuments(
      {   "borrow_date": {$gte: today} }
      ).then( result2 => {
        IssueData = result2 + result;
        res.status(200).json({message: "got", issueData: IssueData ,receiveData: result});
      });


  });
});

router.get('/IssueDataToday', checkAuth,(req,res,next) => {
  let IssueData = 0;
    date = new Date();
    today = date.getFullYear() + '-' + ( date.getMonth() + 1) + '-' + date.getDate();

    Book.countDocuments(
      { "borrow_date":  today  }
      ).
    then(result => {
      Book2.countDocuments(
        {   "borrow_date": today }
        ).then( result2 => {
          IssueData = result2 + result;
          res.status(200).json({message: "got", issueData: IssueData , receiveData: result})
        });


    });
  });

  router.get('/LastWeek', checkAuth,(req,res,next) => {
    let IssueData = 0;
      date = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
      date2 = new Date((new Date().getTime() - (14 * 24 * 60 * 60 * 1000)));
      today = date.getFullYear() + '-' + ( date.getMonth() + 1) + '-' + date.getDate();
      today2 = date2.getFullYear() + '-' + ( date2.getMonth() + 1) + '-' + date2.getDate();

      Book.countDocuments(
        { "borrow_date": {$gte: today2 , $lte: today}  }
        ).
      then(result => {
        Book2.countDocuments(
          {   "borrow_date": {$gte: today2 , $lte: today} }
          ).then( result2 => {
            IssueData = result2 + result;
            res.status(200).json({message: "got", issueData: IssueData , receiveData: result})
          });


      });
    });

    router.get('/thisMonth', checkAuth,(req,res,next) => {
      let IssueData = 0;
        date = new Date();
        today = date.getFullYear() + '-' + ( date.getMonth() + 1) + '-' + 1;

        Book.countDocuments(
          { "borrow_date": {$gte: today }  }
          ).
        then(result => {
          Book2.countDocuments(
            {   "borrow_date": {$gte: today} }
            ).then( result2 => {
              IssueData = result2 + result;
              res.status(200).json({message: "got", issueData: IssueData, receiveData: result})
            });


        });
      });


      router.get('/lastMonth', checkAuth,(req,res,next) => {
        let IssueData = 0;
          date = new Date();

          today = date.getFullYear() + '-' +  date.getMonth() + '-' + 1;
          today2 = date.getFullYear() + '-' +  date.getMonth() + '-' + 30;

          Book.countDocuments(
            { "borrow_date": {$gte: today , $lte: today2}  }
            ).
          then(result => {
            Book2.countDocuments(
              {   "borrow_date": {$gte: today , $lte: today2} }
              ).then( result2 => {
                IssueData = result2 + result;
                res.status(200).json({message: "got", issueData: IssueData, receiveData: result})
              });


          });
        });
        router.get('/thisYear', checkAuth,(req,res,next) => {
          let IssueData = 0;
            date = new Date();

            today = date.getFullYear() + '-' +  1 + '-' + 1;

            Book.countDocuments(
              { "borrow_date": {$gte: today }  }
              ).
            then(result => {
              Book2.countDocuments(
                {   "borrow_date": {$gte: today } }
                ).then( result2 => {
                  IssueData = result2 + result;

                  res.status(200).json({message: "got", issueData: IssueData , receiveData: result})
                });
            });
          });
          router.get('/lifetime', checkAuth,(req,res,next) => {
            let IssueData = 0;
            date = new Date();

            today = date.getFullYear() - 1 + '-' +  1 + '-' + 1;
            today2= date.getFullYear()  + '-' +  1 + '-' + 1;
              Book.countDocuments({"borrow_date": {$gte: today , $lte: today2}}).
              then(result => {
                Book2.countDocuments(
                  { "borrow_date": {$gte: today , $lte: today2} }
                  ).then( result2 => {
                    IssueData = result2 + result;

                    res.status(200).json({message: "got", issueData: IssueData, receiveData: result})
                  });
              });
            });


router.get("/all", checkAuth,(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const accessionNo = req.query.accessionNo;
  let bookQuery = Book.find();
  if(accessionNo != '') {
   bookQuery = Book.find({ accession_no: accessionNo});
  }
  let fetchedBooks ;
  if(pageSize && currentPage){
     bookQuery.skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   bookQuery.then(documents =>{
     fetchedBooks = documents;
     if(accessionNo != '') {
      return Book.countDocuments({ accession_no: accessionNo});
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
      let bookQuery = Book.find();
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
          return Book.countDocuments();
       }).then (count => {
          res.status(200).json({
            message: "Books fetched succesfully!",
            books: fetchedBooks,
            count: count
          });
         });
    });




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
