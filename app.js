const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');


const User = require("./models/users");
const Expense = require('./models/expenses');
const Order = require('./models/orders')




const app = express();

app.use(bodyParser.json());

app.use(cors());
 
dotenv.config();

const userRouter = require('./router/user')
const expenseRouter = require('./router/expense');
const purchaseRouter = require("./router/purchase");


app.use('/user', userRouter)

app.use('/expense', expenseRouter)

app.use("/purchase", purchaseRouter);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);





sequelize.sync()
    .then(() => {
      app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
