const mongoose =require('mongoose');

const recbookSchema = mongoose.Schema({
  accession_no: { type:Number, required: true},
  author: { type:String, required: true},
  cost: { type:Number, required: true},
  edition: { type:String },
  isbn: { type:String, required: true},
  pages: { type:Number, required: true},
  publisher: { type:String},
  remark: { type:String},
  source: { type:String },
  subject: { type:String},
  title: { type:String, required: true},
  topics:{ type:String },
  volume: { type:String},
  year: { type:Number },
  borrower: { type:String},
  cardNo: { type:String },
  borrow_date: { type:Date},
  receive_date: { type:Date},
  fine: { type:String},
  Note: { type:String},
  borrower_dept: {type: String}
});

module.exports =mongoose.model( 'ReceivedBook', recbookSchema);
