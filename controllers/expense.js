const Expense = require('../models/expenses');
const addExpense = (req,res) => {
    const {amount, desc, category} = req.body;
    if(amount == undefined || amount.length == 0){
        return res.status(400).json({success: false, message: 'parameter is missing'})
    }
    req.user.createExpense({amount, desc, category}).then(expense => {
        return res.status(201).json({expense, success:true});
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
