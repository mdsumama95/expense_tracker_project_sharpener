const express = require("express");
const purchaseMembership = require("../controllers/purchase");
const authenticatemiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/premiumMemberShip",authenticatemiddleware,purchaseMembership.premiumMemberShip);

router.post("/updateTransactionStatus",authenticatemiddleware,purchaseMembership.updateTransactionStatus);

module.exports = router;