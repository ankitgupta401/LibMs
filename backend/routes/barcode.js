const express =require('express');
const router = express.Router();
const Barcode = require("../model/barcode");
const checkAuth = require("../middleware/check-auth");

router.post("",checkAuth,(req,res,next)=> {

const barcode = new Barcode({
  accession_no: req.body.accession_no
});
barcode.save()
.then(() => {
res.status(200).json({ message: 'Barcode Saved'});
}).catch(err => {
  res.status(500).json({
error: err
});
});
});

router.get("",checkAuth,(req,res,next)=> {
Barcode.find().then(result => {
res.status(200).json({message: 'Barcodes Saved' , barcodes: result});
});
});


router.put("/deleteAll",checkAuth,(req,res,next) =>{
Barcode.deleteMany().then(() => {
res.status(200).json({message: "Barcodes Cleared"});
});
});

router.get("/find/:acc",checkAuth,(req,res,next) => {
Barcode.find({accession_no: req.params.acc})
.then(result => {
  res.status(200).json({message: "found" , codes : result});
});
});
module.exports = router;
