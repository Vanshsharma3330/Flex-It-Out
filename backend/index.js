const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", (req,res) =>{

    console.log(process.env.ALLOWED_ORIGIN);

    res.send("hey there");
})


app.listen(5000 , () =>{
    console.log("server is running on port http://localhost:5000/");
})