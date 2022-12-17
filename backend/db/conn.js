const mongoose = require('mongoose') ;

const DB = process.env.URI ;

mongoose.connect(DB).then(()=>{
    console.log('connection successful'); 
}).catch((err)=>console.log("no connection",err)) ;

 