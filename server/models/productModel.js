const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
   title: {
    type:String,
    //required: true,
    },
    author:{
        type: [String],
        //required: true
    },
    desc: {
        type: String,
        //required: true
    },

    price: {
        type: Number,
        //required: true
    },

    img: {
        type: String,
        //required: true
    },


 }, {timestamps: true})


module.exports = mongoose.model('ProductOne', productSchema)
