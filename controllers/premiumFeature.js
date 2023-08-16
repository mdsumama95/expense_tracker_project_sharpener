const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const showLeaderBoard = async (req, res) => {
    try {
     
     const leaderboardofusers = await User.findAll({
       order:[['totalExpenses', 'DESC']]
         
     })
     res.status(200).json(leaderboardofusers)

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = {
    showLeaderBoard
}