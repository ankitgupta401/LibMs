const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
fname: { type:String, required: true},
lname: { type:String, required: true},
cardNo: { type:String },
address: { type:String, required: true},
Roll: { type:Number, required: true},
category: { type:String, required: true},
city: { type:String, required: true},
dept: { type:String, required: true},
email: { type:String, required: true },
phone_no: { type:Number, required: true },
sem: { type:String},
state: { type:String, required: true},
year: { type:String},
zip: { type:Number, required: true},
imagePath: {type:String, required: true},
deleted: { type: Boolean}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);
