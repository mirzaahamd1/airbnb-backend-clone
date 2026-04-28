const express = require("express");
const userRouter = express.Router();
const storeController=require('../controllers/storeController')

const path = require("path");
const rootDir = require("../utils/path");
const { homes } = require("../controllers/storeController");

userRouter.get("/", storeController.getHomes );
userRouter.get("/homes", storeController.getHomes );
userRouter.get("/homes/:homeId", storeController.getHome );
userRouter.get("/homes-list", storeController.getHomesList );
userRouter.get("/home-detail", storeController.getHomeDetail );
userRouter.get("/favourite-list", storeController.getFavouriteList );
userRouter.get("/reserve", storeController.getReserve );
userRouter.post("/favourites", storeController.postfavourites );
// userRouter.get("/favourites-list", storeController.getFavouritesList );
userRouter.post("/favourites/delete/:homeId",storeController.deleteFavourite)

module.exports = userRouter;
