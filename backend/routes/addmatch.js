const router = require("express").Router() ;
const User = require("../models/UserModel") ;

// GETTING THE MATCHES
router.put('/', async (req,res)=>{
    const {userId , matchedUserId} = req.body;

    try {
        
        const query = {user_id : userId} ;
        const updateDocument = {
            $push : {matches: {user_id: matchedUserId}},
        }

        const user = await User.updateOne(query , updateDocument) ;
        res.send(user) ;

    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router; 