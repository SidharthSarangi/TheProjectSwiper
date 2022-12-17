const router = require("express").Router() ;
const User = require("../models/UserModel") ;
const {v4: uuidv4} = require('uuid') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;

// SIGNUP
router.post('/', async (req,res)=>{
    const {email, password} = req.body ;
    const generatedUserId = uuidv4() ;

    const encryptedPassword = await bcrypt.hash(password, 10) ;

    try{    

        const existingUser = await User.findOne({email}) ;
        if(existingUser){
            return res.status(409).send("User already exists. Please Login") ;
        }

        const sanitizedEmail = email.toLowerCase() ;

        const data = {
            user_id : generatedUserId, 
            email: sanitizedEmail,
            hashed_password: encryptedPassword
        }

        // const newRow = new User({
        //     first_name:"sid",
        //     url: "slafkjsd",
        //     tech_known: "html,react,js",
        //     tech_use: "react,angular",
        //     category: "soemthingRandom",
        //     email:"random@test.com"
        // })

        // const insertedUser = await User.insertOne(data) ;
        const insertedUser = await User.create(data) ;
        console.log(insertedUser) ;

        const token = jwt.sign(
            { user_id: insertedUser.user_id, email,password:encryptedPassword },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
          //   newUser.token = token ;
        
          
          res.status(201).json({token,userId:generatedUserId}) ;

    }catch(err){
        console.log(err) ;
    }
})

module.exports = router ;