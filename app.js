const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');

//const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(cors());
 
dotenv.config();

const userRouter = require('./router/user')
const expenseRouter = require('./router/expense')

app.use('/user', userRouter)

app.use('/expense', expenseRouter)

//User.hasMany(project);
//project.belongsTo(User);
// app.js (main application file)


//const fs = require('fs');


sequelize.sync()
    .then(() => {
      app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));
