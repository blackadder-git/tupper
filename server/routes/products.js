var express = require('express');
const sequences = require('./sequences');
const Product = require('../models/product');

var router = express.Router();

console.log("In routes/products.js");

// GET
router.get('/', (req, res) => {
   console.log("In routes/products.js get()");

   Product.find()
   .then(
      products => {
         //console.log(products);
         res.status(200).json({
            message: "Products fetched successfully!",
            products: products
         })
      })
   .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({
         message: "Error fetching products",
         error: error.message
      });
   });
});


// POST
router.post("/", async (req, res) => {
   console.log("In routes/products.js post()");

   const maxProductId = await sequences.nextId("products");
   console.log("Next Product ID", maxProductId);

   const product = new Product({
      id: "" + maxProductId,
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl
   });
   console.log("New Product", product);

   product.save()
   .then(
      res.status(201).json({
         message: 'Product added successfully',
         product: product
      })
   )
   .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({
         error: error.message
      });
   });
});


// PUT
router.put('/:id', (req, res) => {
   console.log("In routes/products.js put()", req.params.id);

   Product.findOne({ id: req.params.id })
   .then(product => {
      product.name = req.body.name;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
 
      Product.updateOne({ id: req.params.id }, product)
      .then(result => {
           res.status(204).json({
             message: 'Product updated successfully'
           })
      })
      .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
   })
   .catch(error => {
      res.status(500).json({
         message: 'Product not found.',
         error: { product: 'Product not found'}
      });
   });
});


// DELETE
router.delete("/:id", (req, res) => {
   console.log("In routes/products.js delete()");

   Product.findOne({ id: req.params.id })
   .then(document => {
      Product.deleteOne({ id: req.params.id })
      .then(result => {
         res.status(204).json({
            message: "Product deleted successfully"
         });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
         });
      })
   })
   .catch(error => {
      res.status(500).json({
         message: 'Product not found.',
         error: { product: 'Product not found'}
       });
   });
});

module.exports = router;