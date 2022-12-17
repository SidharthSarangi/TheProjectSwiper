const router = require("express").Router() ;
const Message = require('../models/MessagesModel') ;

router.get('/', async (req,res)=>{
    const {userId , correspondingUserId} = req.query ;
    // console.log(userId, correspondingUserId) ;
    try {
        
        const query ={
            from_userId : userId , 
            to_userId: correspondingUserId
        }
        const foundMessages = await Message.find(query) ;
        res.send(foundMessages) ;

    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router ;