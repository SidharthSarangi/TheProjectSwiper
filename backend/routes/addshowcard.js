const router = require("express").Router() ;
const User = require("../models/UserModel") ;


router.put('/', async (req,res)=>{
    const {user , matchedUserId} = req.body;

    try {
                
        const query = {user_id : matchedUserId} ;
        const updateDocument = {
            $push : {show_card: {swiped_user: user}},
        }

        const updatedUser = await User.updateOne(query , updateDocument) ;
        res.send(updatedUser) ;

    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router; 