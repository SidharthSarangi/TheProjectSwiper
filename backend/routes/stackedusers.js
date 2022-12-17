const router = require("express").Router() ;
const User = require("../models/UserModel") ;

// FIND ALL USERS
router.get('/' , async (req,res)=>{
    const stackshow = req.query.stackshow ;
    // console.log('stack', stackshow) ;
    try {
        const query = {stack: { $eq: stackshow }} ;
        const foundUsers = await User.find(query) 
        console.log(foundUsers) ;
        res.send(foundUsers) ;
    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router ;