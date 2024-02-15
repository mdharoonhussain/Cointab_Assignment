const express = require("express");
const connection = require("./connections/db");
const UserRouter = require("./routes/user.route");
require("dotenv").config()
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


app.use("/users",UserRouter);

app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})