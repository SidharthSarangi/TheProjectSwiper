const mongoose = require('mongoose') ;
const {Schema} = mongoose  ;

const messageSchema = new mongoose.Schema({
    timestamp :  String,
    from_userId: String,
    to_userId: String,
    message:{
        type: String
    }
})

const Message = mongoose.model('Message', messageSchema) ;

module.exports = Message ;