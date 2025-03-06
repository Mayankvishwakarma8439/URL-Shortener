const mongoose= require("mongoose");
const urlSchema= new mongoose.Schema({
    originalURL: String,
    shortURL: String,
    createdAt : {
        type: Date,
        default: Date.now,
        expires: 36000
    }
    
});
const urlModel= mongoose.model("URL", urlSchema);
module.exports= urlModel;