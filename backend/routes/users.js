const router = require("express").Router() ;
const User = require("../models/UserModel") ;

router.get('/', async (req,res)=>{
    const userIds = JSON.parse(req.query.userIds) ;
    try {
        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]
        
        const foundUsers = await User.aggregate(pipeline) ;
        // console.log(foundUsers) ;
        res.send(foundUsers) ;
    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router ;