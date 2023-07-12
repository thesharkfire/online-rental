const Product = require('../models/productModel.js')
const mongoose = require('mongoose')


//Get all products

//Get a single product


//Create new product







const createProduct = async (req, res) => {
  const { title, author, price, desc } = req.body;
  const image = `/uploads/${req.file.filename}`;
  try {
    const product = await Product.create({ title, price, image, desc, author });
    res.status(200).json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};




//get all products
const getProducts  = async (req, res) => {
    try{
        const product = await Product.find({})//.sort({createdAt:-1})
        res.status(200).json(product)
    }catch(error){
        res.json({error: error.message})
    }
}

//Get a single product
const getProduct  = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }
    try{
        const product = await Product.findById(id)
        /*
        if(!product){
            return res.status(404).json({error: 'No such product'})
        }*/
        res.status(200).json(product)
    }catch(error){
        res.json({error: error.message})
    }
}


//Delete a products
const deleteProduct  = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    try{
        const product = await Product.findOneAndDelete({_id:id})//.sort({createdAt:-1})
        res.status(200).json(product)
    }catch(error){
        res.json({error: error.message})
    }
}



//Update a products
const updateProduct  = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    try{
        const product = await Product.findOneAndUpdate({_id:id},{...req.body})//.sort({createdAt:-1})
        res.status(200).json(product)
    }catch(error){
        res.json({error: error.message})
    }
}
//Searcg
const searchProduct  = async (req, res) => {

    const query = {};



    try{

        if (req.query.search) {
            query.$or = [
              //{author: new RegExp(req.query.search, 'i')},
              {title: new RegExp(req.query.search, 'i')},
              //{genre: new RegExp(req.query.search, 'i')}
            ];
          }
          Item.find(query).then(items => res.json(items));


    }catch(error){
        res.json({error: error.message})
    }
}



module.exports = {createProduct,
     getProducts, getProduct, deleteProduct, updateProduct,
     searchProduct

    }
