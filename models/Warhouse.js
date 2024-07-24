const mongoose = require('mongoose')
const Warhousechema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    location: {
        type:String,
        require:true,
    },
    date: {
        type:Date,
        default: Date.now
    },
});

module.exports = Warhouse = mongoose.model('warhouse', Warhousechema);