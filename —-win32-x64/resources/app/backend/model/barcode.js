const mongoose = require('mongoose');
const barcodeSchema = mongoose.Schema({
  accession_no: { type: Number , required: true}
});
module.exports = mongoose.model('Barcode', barcodeSchema);
