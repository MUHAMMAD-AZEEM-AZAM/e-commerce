const mongoose = require('mongoose');

const constants=mongoose.Schema({
    categories:{type:Array,required:true}
})

module.exports = mongoose.model('Constants', constants)
