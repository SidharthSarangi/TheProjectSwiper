const mongoose = require('mongoose') ;
const {Schema} = mongoose  ;

const userSchema = new mongoose.Schema({
    user_id :  String,
    hashed_password: String,
    first_name:String,
    stack: String,
    stackinterest: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    url: String,
    tech_known: String,
    tech_use: String,
    about: String,
    matches: [{ 
        user_id: String
    }],
    show_card: [{
        swiped_user: Object
    }]
})

const User = mongoose.model('User', userSchema) ;

module.exports = User ;