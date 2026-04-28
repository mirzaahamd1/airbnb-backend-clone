const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const errorController = require('./controllers/errors')

const { hostRouter } = require("./routes/host");
const userRouter = require("./routes/user");
const mongoose = require("mongoose")


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.set('view engine','ejs')
app.set('views','views')

app.use(hostRouter);
app.use(userRouter);

app.use(errorController.get404);

const PORT = 3002;
mongoose.connect("mongodb+srv://root:root@ahmad.cx0rky3.mongodb.net/airbnb?appName=AHMAD").then(()=>{
  console.log("Connected to MongoDb")
  app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
})

}).catch((err)=>{
  console.log(`Error while conneceting to DB ${err}`)
})

