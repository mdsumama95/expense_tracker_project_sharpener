const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const showLeaderBoard = async (req, res) => {
    try {
     const users = await User.findAll()
     const expenses = await Expense.findAll();
     expenses.forEach((expense) => {
        if(userAggregatedExpenses[expense.userId]){
          userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId] +expense.expenseamount
        } else{
            userAggregatedExpenses[expense.userId] = expense.expenseamount
        }
     })
     var userLeaderBoardDetails = [];
     users.forEach((user)=> {
        userLeaderBoardDetails.push({name:user.name, total_cost: userAggregatedExpenses[user.id]})
     })
      console.log(userLeaderBoardDetails);
      res.status(200).json(userLeaderBoardDetails)

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = {
    showLeaderBoard
}