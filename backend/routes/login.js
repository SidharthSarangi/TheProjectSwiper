const router = require("express").Router() ;
const User = require("../models/UserModel") ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;

// LOGIN
router.post('/' , async (req,res)=>{
    const {email, password} = req.body;
    try {
        
        const user = await User.findOne({email}) ;
        
        if(user && (await bcrypt.compare(password, user.hashed_password))){

            const token = jwt.sign(
                { user_id:user.user_id ,email, password:user.hashed_password },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "24h",
                }
              );
            res.status(201).json({token, userId: user.user_id}) ;
        }

        res.status(400).send('Invalid Credentials') ;        

    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router ;