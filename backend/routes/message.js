const router = require("express").Router() ;
const Message = require('../models/MessagesModel') ;


router.post('/' , async (req,res)=>{
    const {message} = req.body;
    try {
        const insertedMessage = await Message.create(message) ;
        res.send(insertedMessage) ;

    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router; 