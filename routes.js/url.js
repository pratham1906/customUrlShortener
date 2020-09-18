const express=require('express')
const router=express.Router();


const validUrl=require('valid-url')
const shortid=require('shortid')
const config=require('config')

const url=require('../models/url');

//This is will be post route /api/url/shorten

router.post('/shorten',async (req,res)=>{
    const{longUrl}=req.body;
    
    const baseUrl=config.get('baseUrl');

    
    //authenticity of base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Invalid Base Url")
    }
    //create url code
const urlCode=shortid.generate();//it will generate set of numbers and stuff randomly

//check long url

if(validUrl.isUri(longUrl)){
try{
 let url_request=await url.findOne({
     longUrl
 });
 if(url_request){
     res.json(url_request)
 }
 else{
     const shortUrl=baseUrl +'/' + urlCode;
     //save it to db

     url_request=new url({
         longUrl,
         shortUrl,
         urlCode,
         date:new Date()
     })
     await url_request.save()
 }
}catch(err){
console.log(err);
res.status(500).json("Server error Ocurred")
}
}
else{
    res.status(401).json("Url is not valid")
}

})
module.exports=router;