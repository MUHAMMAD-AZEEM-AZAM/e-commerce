const mongoose = require('mongoose');

const product = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { rate: {type:Number,min:0,max:5,default:0}, count: {type: Number,default:0} }
}, {
    timestamps: true
})


module.exports = mongoose.model('Product', product)