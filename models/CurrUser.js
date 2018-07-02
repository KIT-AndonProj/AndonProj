const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrUserSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = CurrUser = mongoose.model('curruser', CurrUserSchema);