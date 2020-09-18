const express=require('express')
const router=express.Router();
const url=require('../models/url');
//@route GET /:code

//redirect shorturl to the longurl

router.get('/:code',async(req,res)=>{
    try{
   const url_request=await url.findOne({urlCode:req.params.code})

   if(url_request){
       return res.redirect(url_request.longUrl);
   }
   else{
       return res.status(404).json("No url Found")
   }
    }
    catch(err){
 console.log(err)
 return  res.status(500).json("Server error Ocurred")
    }
})
module.exports=router;