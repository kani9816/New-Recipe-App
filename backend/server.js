const express = require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv = require("dotenv");

const app=express();
dotenv.config();

const PORT=process.env.PORT || 8077;

app.use(cors());
app.use(bodyParser.json());   //pass key value pairs
app.use(express.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection success!");
});

const recipesRouter=require("./routes/recipes.js");
app.use("/recipes",recipesRouter);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port number: ${PORT}`)
});
