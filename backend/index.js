const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const { connectDb } = require("./utils/mongodb");

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

connectDb();

app.use(cors({
    origin : process.env.ACCESS_URL,
    credentials : true
}))


app.get("/", (req,res) =>{

    console.log(process.env.ACCESS_URL);

    res.send("hey there");
})

app.use(userRouter);


app.listen(4000 , () =>{
    console.log("server is running on port http://localhost:5000/");
})