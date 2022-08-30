const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const authRouter = require('./routes/auth')


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connect successfully'))
  .catch((err) => console.log(err))
app.use(express.json());


app.use('/api/auth', authRouter);

app.get("/", (res, req)=>{
  console.log("home page");
})




app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running http://localhost:5000");
})