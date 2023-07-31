/*const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);


module.exports = router;*/
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();
const authenticatemiddleware = require('../middleware/auth')

router.post('/signup', userController.signup);

router.post('/login',  userController.login)

//router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense )

////router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses )

//router.delete('/deleteexpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteexpense)

module.exports = router;