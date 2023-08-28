
const path = require('path');
const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')
const fs = require("fs");
const helmet = require('helmet');
const axios = require('axios')

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

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );

const morgan = require("morgan");
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  //this is for handling jsons
app.use(express.static("frontend"));
app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/password', resetPasswordRoutes);
app.use("/premium", premiumFeatureRoutes); 




app.use('/', (req,res) => {
    try{
       console.log("url", req.url);
       res.sendFile(path.join(__dirname,`frontend/${req.url}`));
    }
    catch(err){
       console.log(("err in app.js 51"))
    }
})




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