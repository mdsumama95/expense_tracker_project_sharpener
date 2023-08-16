/*
const express = require('express');

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense')

const router = express.Router();
const authenticatemiddleware = require('../middleware/auth')

router.post('/signup', userController.signup);

router.post('/login',  userController.login)
router.get('/download', authenticatemiddleware.authenticate, expenseController.downloadExpenses)

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense )

router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses )
router.delete('/deleteexpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteexpense)

module.exports = router;*/

const express = require('express');

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense')

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login', userController.login)

router.post('/addExpense', authenticatemiddleware.authenticate, expenseController.addExpense )

router.get('/download', authenticatemiddleware.authenticate, expenseController.downloadExpenses)

router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses )

router.delete('/deleteExpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteExpense)

module.exports = router;