const express = require("express");
const router = express.Router();
const premiumController = require("../controllers/premiumFeature");
const authenticatemiddleware = require("../middleware/auth")

// router.get("/showLeaderBoard", authenticatemiddleware.authenticate, premiumController.showLeaderBoard );




//LeaderBoard Routes


router.get('/getAllUsers',authenticatemiddleware.authenticate, premiumController.getAllUsers)

router.get('/getAllExpenses/:id',premiumController.getAllExpenses);

//report
router.get('/getReport',authenticatemiddleware.authenticate, premiumController.getReport)

router.get('/getWeeklyReport',authenticatemiddleware.authenticate, premiumController.getWeeklyReport)

module.exports = router;