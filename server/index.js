const express = require("express");
const app = express();
const cors=require('cors')
const cookieParser=require('cookie-parser')
require("dotenv").config();

const connectDb = require("./config/db");
const userRoute=require('./Routes/user')
const taskRoute=require('./Routes/task')

app.use(
    cors({
        origin:"https://taskmanagerfrontend-three.vercel.app",
        credentials: true, 
    })
)
app.use(cookieParser())
app.use(express.json());
connectDb();

app.get('/',(req,res)=>{
    res.send('Welcome to TaskManager DB')
})

app.use("/api",userRoute)
app.use("/api",taskRoute)

app.listen(process.env.PORT, () => {
  console.log(`Running on: http://localhost:${process.env.PORT}`);
});
