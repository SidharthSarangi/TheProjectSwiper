const router = require("express").Router() ;
const User = require("../models/UserModel") ;


// EDIT USER DETAILS
router.put('/', async(req,res)=>{
    
    const {formData} = req.body;
    try {
        const data = {} ;

        if(formData.first_name) data.first_name = formData.first_name ;
        if(formData.stack) data.stack = formData.stack ;
        if(formData.stackinterest) data.stackinterest = formData.stackinterest ;
        if(formData.url) data.url = formData.url ;
        if(formData.tech_known) data.tech_known = formData.tech_known ;
        if(formData.tech_use) data.tech_use = formData.tech_use ;
        if(formData.about) data.about = formData.about ;
        

        const query = {user_id: formData.user_id} ;
        const updateDocument = {
            $set: data
        }
        
        const insertedUser = await User.updateOne(query, updateDocument);
        res.send(insertedUser) ;
    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router ;