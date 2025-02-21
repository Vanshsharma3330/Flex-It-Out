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
    origin: [process.env.FRONTEND_URL, 'https://accounts.google.com'],
    credentials: true
}));


app.get("/", (req,res) =>{

    console.log(process.env.ACCESS_URL);

    res.send("<h1>hey there</h1>");
})

app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});