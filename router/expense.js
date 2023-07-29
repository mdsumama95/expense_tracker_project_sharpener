const express = require('express');

const expenseController= require('../controllers/expense');
const userauthentication = require('../middleware/auth')

const router = express.Router();



router.post('/addExpense', userauthentication, expenseController.addExpense)
router.get('/getexpenses', userauthentication, expenseController.getexpenses)
router.delete('/deleteExpense/:expenseid',userauthentication, expenseController.deleteExpense)

module.exports = router;



