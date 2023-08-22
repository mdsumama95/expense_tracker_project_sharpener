/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');


const User = require("./models/users");
const Expense = require('./models/expenses');
const Order = require('./models/orders')
const Forgotpassword = require('./models/reset');


const app = express();

app.use(bodyParser.json());

app.use(cors());
 
dotenv.config();

const userRouter = require('./router/user')
const expenseRouter = require('./router/expense');
const purchaseRouter = require("./router/purchase");
const premiumFeatureRoutes = require("./router/premiumFeature")
const resetPasswordRouter = require('./router/resetPassword')


app.use('/user', userRouter)

app.use('/expense', expenseRouter)

app.use("/purchase", purchaseRouter);

app.use("/premium", premiumFeatureRoutes);

app.use("/password", resetPasswordRouter);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);





sequelize.sync()
    .then(() => {
      app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
*/
const path = require('path');
const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')

const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');




const userRoutes = require('./router/user')
const purchaseRoutes = require('./router/purchase')
const resetPasswordRoutes = require('./router/resetPassword')
const premiumFeatureRoutes = require("./router/premiumFeature")
// const premiumRoutes = require('./router/premiumFeature')


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  //this is for handling jsons
app.use(express.static("frontend"));


app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/password', resetPasswordRoutes);
app.use("/premium", premiumFeatureRoutes); 







User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })