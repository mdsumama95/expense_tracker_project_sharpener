const Expense = require('../models/expenses');
const addexpense = (req,res) => {
    const {amount, desc, category} = req.body;
    if(amount == undefined || amount.length == 0){
        return res.status(400).json({success: false, message: 'parameter is missing'})
    }
    Expense.create({amount,desc,category}).then(expense => {
        return res.status(201).json({expense, success:true});
    }).catch(err => {
        return res.json(500).json({success: false, error: err})
    })
} 
const getexpenses = (req, res) => {
    Expense.findAll().then(expenses => {
        return res.status(200).json({expenses, success:true})
    })
    .catch(err => {
return res.status(402).json({error:err, success: false})
    })
}
const deleteexpense = (req,res) => {
   const expenseid = req.params.expenseid;
   if(expenseid == undefined || expenseid.length == 0){
       res.status(400).json({success: false})
   }
   Expense.destroy({where: {id: expenseid}}).then(() => {
     return res.status(204).json({success: true, message:" Deleted Successfully"})
   }).catch(err => {
    console.log(err);
    return res.status(403).json({success: true, message:"failed"})
   })
}
module.exports = {
    deleteexpense,
    getexpenses,
    addexpense

}