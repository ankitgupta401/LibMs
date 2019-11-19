const mongoose =require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const bookSchema = mongoose.Schema({
  accession_no: { type:Number, required: true},
  author: { type:String, required: true},
  cost: { type:Number, required: true},
  edition: { type:String },
  isbn: { type:Number, required: true},
  pages: { type:Number, required: true},
  publisher: { type:String},
  remark: { type:String},
  source: { type:String },
  subject: { type:String},
  title: { type:String, required: true},
  topics:{ type:String },
  volume: { type:String},
  year: { type:Number },
  borrowed: { type:Boolean, required: true},
  borrower: { type:String},
  cardNo: { type:String},
  borrow_date: { type:String},
  borrower_email: {type:String},
  borrower_phone: {type: Number},
  borrower_dept: {type: String},
  deleted: { type: Boolean}
});
bookSchema.plugin(uniqueValidator);
module.exports =mongoose.model( 'Book', bookSchema);
