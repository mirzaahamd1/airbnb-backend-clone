const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const hostController = require('../controllers/hostController')

const router = express.Router();

router.get("/host/edit-home", hostController.getAddHome);
router.get("/host/add-home", hostController.getAddHome);
router.get("/host/edit-home/:homeId", hostController.getEditHome);
router.get("/host/host-home-list", hostController.getHomeList);

router.post("/host/add-home", hostController.postAddHome);
router.post("/host/edit-home", hostController.postEditHome);
router.post("/delete-home/:homeId", hostController.postDeleteHome);

exports.hostRouter = router;

