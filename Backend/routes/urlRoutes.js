const express= require("express");
const router = express.Router();
const urlModel = require("../models/urlModel");
const shortid= require("shortid");
const dotenv= require("dotenv");
dotenv.config();

router.get("/URL",async (req,res)=>{
    try{
        const  URLs= await urlModel.find();
        res.status(200).json(URLs);
    }
    catch(error){
        res.status(400).json({"error":error.message});
    }
    
})
router.get("/test",(req,res)=>{
    res.send("HEllo WOrld")
})
//route for taking input as original url and returning back short url
router.post("/shorten",async (req,res)=>{
    try{
        const { originalURL}= req.body;
        if(!originalURL){
            return res.status(400).json({
                "msg":"URL not provided!"
            })
        }
    const shortURL= shortid.generate();
    const urlExists = await urlModel.findOne({originalURL});
    if(urlExists){
        res.status(200).json({shortURL: `${req.protocol}://${req.get('host')}/${urlExists.shortURL}`});
    }
    else{
        const URL = await urlModel.create({originalURL,shortURL});
        res.status(200).json({shortURL: `${req.protocol}://${req.get('host')}/${shortURL}` });
    }
    }
    catch(error){
        res.status(400).json({
            "error": error.message
        })
    }
})
//to redirect user back to originalURL on clicking teh corresponding shortURl
router.get("/:shortURL",async (req,res)=>{
   try{

    const {shortURL}=req.params;
    const URL= await urlModel.findOne({shortURL: shortURL});
    if(!URL){
       return res.status(400).json({"error": "URL not found"});
    }
    else{
        res.redirect(URL.originalURL);
    }
}
catch(error){
    res.status(400).json({
        "error":error.message
    })
}
})

module.exports =router;