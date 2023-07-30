const express = require("express");
const router = express.Router();
const premiumFeatureController = require("../controllers/premiumFeature");
const authenticatemiddleware = require("../middleware/auth")

router.get("/showLeaderBoard", authenticatemiddleware,premiumFeatureController.showLeaderBoard );

module.exports = router;