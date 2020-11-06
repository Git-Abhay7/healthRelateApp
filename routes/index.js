var express = require('express');
var router = express.Router();
let controller = require("../controller/dataController")

router.get("/county", controller.countiesData);
router.get("/county/:name", controller.searchCounty);
router.get("/LatestCounty/:name", controller.LatestData);
router.get("/favouriteCounty", controller.favouriteData);


module.exports = router;
