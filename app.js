// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://root:root@ahmad.cx0rky3.mongodb.net/airbnb?appName=AHMAD";
const multer = require('multer')

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

app.use('/',express.static(path.join(rootDir,'uploads')))
app.use('/uploads',express.static(path.join(rootDir,'uploads')))
app.use('/host/uploads',express.static(path.join(rootDir,'uploads')))
app.use('/homes/uploads',express.static(path.join(rootDir,'uploads')))

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

const fileFilter = (req,file,cb)=>{
  if(['image/jpeg','image/png','image/jpg'].includes(file.mimetype)){
    cb(null,true)

  }else{
  cb(null,false)
  }
}

const storage = multer.diskStorage({
  destination :(req,file,cb)=>{
    cb(null,'uploads/')
  },

  filename:(req,file,cb)=>{
    cb(null, Math.floor(Math.random()*101964837+1) + "-" + file.originalname)
  }
})

app.use(express.urlencoded());
app.use(multer({storage,fileFilter}).single('photo'))
app.use(express.static(path.join(rootDir, 'public')))
app.use('/',express.static(path.join(rootDir,'uploads')))
app.use('/host',express.static(path.join(rootDir,'uploads')))




app.use(session({
  secret: "Ahmad",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);



app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
