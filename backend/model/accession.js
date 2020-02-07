const mongoose = require('mongoose');
const accessionSchema = mongoose.Schema({
  accession_no: { type: Number , required: true}
});
module.exports = mongoose.model('Accession', accessionSchema);
