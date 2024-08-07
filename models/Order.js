const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    warhouse: {
        type: Schema.Types.ObjectId,
        ref: 'warhouse'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'seller'
    },
    tlphn: {
        type: String,
        require: true
    },
    adresse: {
        type: String,
        require: true
    },
    produits: {
        type: String,
        require: true
    },
    produitss: [
        {
            produit: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantite: {
                type: Number,
                require: true
            },
            prix: {
                type: Number,
                require: true
            },
            status: {
                type: Boolean,
                default: false
            },
        }
    ],
    currency: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        require: false
    },
});

module.exports = Order = mongoose.model('order', OrderSchema);