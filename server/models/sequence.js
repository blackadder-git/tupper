const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   id: { type: String, required: true },
   maxProductId: { type: Number },
   maxTagId: { type: Number },
   maxCategoryId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);