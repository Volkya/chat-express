const mongoose = require('mongoose');
const { Schema } = mongoose;

const MsgSchema = new Schema({
    nick: String,
    msg: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Msg', MsgSchema);
