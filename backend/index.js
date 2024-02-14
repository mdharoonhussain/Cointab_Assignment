const express = require("express");
const connection = require("./connections/db");
const UserRouter = require("./routes/user.route");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4500;

app.use("/users",UserRouter);

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${PORT}`);
})