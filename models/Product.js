const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    warhouse: {
        type: Schema.Types.ObjectId,
        ref: 'warhouse'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Product = mongoose.model('product', ProductSchema);