const express = require('express');

const expenseController= require('../controllers/expense');
const userauthentication = require('../middleware/auth')

const router = express.Router();



router.post('/addExpense', userauthentication.authenticate, expenseController.addExpense)
router.get('/getexpenses', userauthentication.authenticate, expenseController.getexpenses)
router.delete('/deleteExpense/:expenseid',userauthentication.authenticate, expenseController.deleteExpense)
router.get("/getAllExpenses/:page", expenseController.getAllExpensesforPagination
  );
module.exports = router;



