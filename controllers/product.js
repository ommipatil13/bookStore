const product = require("../models/product");
const Product = require("../models/product");
const { validationResult } = require("express-validator");



exports.getProductById = (req, res, next, id) => {

  var product;

    ( async() => {

      product = await Product.findById(id);
     
  })()
  .then(()=> {
    req.product = product;
    res.json(req.product);

    next();
 
  })
  .catch((err) => {
     
     if( err || !req.product){
         return res.status(400).json({
             error: "product not found"
         })
     }
  })
};

exports.createProduct = (req, res) => {
  
  const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(422).json({
        param: errors.array()[0].param,
        error: errors.array()[0].msg
    });

    const product = new Product(req.body);

    product.save()
    .then( () => {
        res.json(product);
    })
    .catch( (err) => {
        res.status(400).json({
            err: "Unable to save"
        })
    });

};

exports.getProduct = ( req , res) => {
  return res.json(req.product);
};

exports.updateProduct = ( req , res) => {

  var updatedProduct;
    ( async() => {
        updatedProduct = await Product.findByIdAndUpdate( {_id: req.product._id}, {$set: req.body} ,{ new: true });
    })()
    .then( () => {
        res.json({updatedProduct});
    })
    .catch( ( err) => {
        if(err || !updatedProduct){
        res.status(404).json({
                error: "Unable to update"
            })
        }
    })
};


exports.getAllProducts = (req , res) => {
 
    var allProducts;
  
  ( async() => {
    return allProducts = await Product.find()})

()
  .then(async()=>{
    const result = await res.json(allProducts)
    return result;
  })
  .catch( err => console.log("Unable to find"))}
  
  


exports.deleteProduct = (req ,res ) => {
  const product = req.product;


    (
      async() => {
        const res = await product.deleteOne( {id: req.product._id})
      }
    )()
  }




