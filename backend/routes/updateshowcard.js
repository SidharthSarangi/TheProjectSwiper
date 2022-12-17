const router = require("express").Router() ;
const User = require("../models/UserModel") ;


// UPDATE USERS EVEN IN THE SHOW_CARD
router.put('/', async(req,res)=>{
    
    const {formData} = req.body;
    try {
        const data = {} ;

        if(formData.first_name) data.first_name = formData.first_name ;
        if(formData.stack) data.stack = formData.stack ;
        if(formData.stackinterest) data.stackinterest = formData.stackinterest ;
        if(formData.tech_known) data.tech_known = formData.tech_known ;
        if(formData.tech_use) data.tech_use = formData.tech_use ;
        if(formData.about) data.about = formData.about ;
        
        const query = {"show_card.swiped_user.user_id":formData.user_id } ;
        
        let updateQuery = {} ;
        for(key in data){
            if(data.hasOwnProperty(key) )
                updateQuery['show_card.$.swiped_user.'+key] = data[key] ;
        }

        const updatedShowCard = await User.updateMany(query,{$set:updateQuery}) ;

        console.log(updatedShowCard) ;
        res.send(updatedShowCard) ;
    } catch (error) {
        console.log(error) ;
    }
})

module.exports = router; 