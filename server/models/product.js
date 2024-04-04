const mongoose = require('mongoose');

// Schema holds a blueprint which is based on the Angular Product model
// The _id property is automatically generated and added to the JSON object when a new message is inserted into the collection. 
// It is the primary surrogate key that uniquely identifies each object in the collection.
const productSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   description: { type: String },
   imageUrl: { type: String }
});

// Build an object based on the blueprint above
module.exports = mongoose.model('Product', productSchema);