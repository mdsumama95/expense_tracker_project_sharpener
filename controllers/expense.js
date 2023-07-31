//const { default: transfers } = require('razorpay/dist/types/transfers');
const User = require("../models/users");
const Expense = require('../models/expenses');
const sequelize = require('../util/database')
const addExpense = async (req,res) => {
    const t = await sequelize.transaction();
    const {amount, desc, category} = req.body;
    if(amount == undefined || amount.length == 0){
        return res.status(400).json({success: false, message: 'parameter is missing'})
    }
     Expense.create({amount, desc, category, userId: req.user.id}, { transaction: t }).then(expense => {
        const totalExpense = Number(req.user.totalExpenses)+Number(expenseamount)
        console.log(totalExpense)
        User.update({
            totalExpenses: totalExpense
        
        },{
            where: {id: req.user.id},
            transaction:t
          
        }).then(async() => {
            await t.commit();
            res.status(200).json({expense:expense})
        })
         .catch(async(err) => {
            await t.rollback();
            return res.status(500).json({success: false, error: err})
         })
      }).catch(err => {
        return res.json(500).json({success: false, error: err})
     })
}         
const getexpenses = (req, res) => {
    req.user.getexpenses().then(expenses => {

        return res.status(200).json({expenses, success:true})
    })
    .catch(err => {
       return res.status(402).json({error:err, success: false})
    })
}
const deleteExpense = (req,res) => {
   const expenseid = req.params.expenseid;
   if(expenseid == undefined || expenseid.length == 0){
       res.status(400).json({success: false})
   }
   Expense.destroy({where: {id: expenseid, userId: req.user.id}}).then((noofrows) => {
    if(noofrows == 0){
        return res.status(404).json({success: false, message:'Expense does not belong to the user'})
    }
     return res.status(200).json({success: true, message:" Deleted Successfully"})
   }).catch(err => {
    console.log(err);
    return res.status(403).json({success: true, message:"failed"})
   })
}
module.exports = {
    addExpense,
    getexpenses,
    deleteExpense
}
