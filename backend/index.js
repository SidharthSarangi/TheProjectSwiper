const dotenv = require('dotenv') ;
const mongoose = require('mongoose') ;
const express = require('express') ;
const {v4: uuidv4} = require('uuid') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;
const cors = require('cors') ;
const PORT = 8000 ;
const app = express()  ;
app.use(express.json()) ;
app.use(cors()) ;
dotenv.config({path:'./config.env'}) ;
require('./db/conn') ;
const User = require('./models/UserModel') ;
const Message = require('./models/MessagesModel') ;

const signUpRoute = require("./routes/signup") ;
const loginRoute = require("./routes/login") ;
const stackedUserRoute = require("./routes/stackedusers") ;
const addMatchRoute = require("./routes/addmatch") ;
const usersRoute = require("./routes/users") ;
const messagesRoute = require("./routes/messages") ;
const messageRoute = require("./routes/message") ;
const addshowcardRoute = require("./routes/addshowcard") ;
const editUserRoute = require("./routes/edituser") ;
const updateShowCardRoute = require("./routes/updateshowcard") ;

// SIGNUP
app.use('/signup', signUpRoute) ;

// LOGIN
app.use('/login', loginRoute) ;

// FIND ALL USERS
app.use('/stacked-users', stackedUserRoute) ;


// ADDING FURTHER CREATE ACCOUNT DETAILS
app.put('/user', async(req,res)=>{
    
    const {formData} = req.body;
    try {
        
        const query = {user_id: formData.user_id} ;
        const updateDocument = {
            $set:{
                first_name: formData.first_name,
                stack: formData.stack, 
                stackinterest: formData.stackinterest,
                url: formData.url,
                tech_known: formData.tech_known,
                tech_use: formData.tech_use,
                about: formData.about,
                matches: formData.matches
            },
        }
        
        const insertedUser = await User.updateOne(query, updateDocument);
        res.send(insertedUser) ;
    } catch (error) {
        console.log(error) ;
    }
})

// FOR DASHBOARD
app.get('/user' , async (req,res) =>{
    
    const userId = req.query.userId ;

    try {
        
        const query = {user_id : userId}; 
        const user = await User.findOne(query) ;
        res.send(user) ;

    } catch (error) {
        console.log(error) ;
    }
}) 


// GETTING THE MATCHES
app.use('/addmatch', addMatchRoute) ; 


app.use('/users' , usersRoute) ;


app.use('/messages', messagesRoute ) ;


app.use('/message', messageRoute) ;


// ADD SHOW CARD FEATURE 
app.use('/addshowcard', addshowcardRoute ) ;


// EDIT USER DETAILS
app.use('/edit-user', editUserRoute) ;


// UPDATE USERS EVEN IN THE SHOW_CARD
app.use('/update-showcard', updateShowCardRoute) ;




app.listen(PORT, ()=>{
    console.log("Listening on Port "+ PORT) ;
})

 