const express=require("express");
const mongoose = require("mongoose");
const port =process.env.PORT || "3000";
const app= express();
const dotenv= require("dotenv");
const cors= require("cors");
const urlRoutes= require("./routes/urlRoutes")
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",urlRoutes);



mongoose.connect(process.env.MONGO_URI).then(app.listen(port,()=>{
    console.log("Connected to the db and server on port 3000");
})).catch(()=>{
    console.log("Error in connection")
})
