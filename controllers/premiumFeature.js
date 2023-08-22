const User = require('../models/users');
const Expense = require('../models/expenses');
const Sequelize=require('sequelize');
const op = Sequelize.Op;

const getAllUsers = (req,res)=>{
    User.findAll()
     .then(result=>{
       return res.status(201).json({success:true , data:result})
     })
     .catch(err =>{
       return res.status(500).json({ err, success:false , message:"failed"})
     })
}


const getAllExpenses = (req,res)=>{
   const userId = req.params.id
   Expense.findAll({where:{userid:userId}})
   .then(result=>{
       return res.status(201).json({success:true , data:result})
   })
   .catch(err =>{
       return res.status(500).json({success:false , data:err})
   })
}

const getReport = (req,res)=>{
  const todayDate = new Date().setHours(0,0,0,0)
  const Now = new Date();

  const userId = req.user.id;
  Expense.findAll({where:{userid:userId , createdAt:{[op.gt]:todayDate,[op.lt]:Now}}})
  .then(result =>{
    res.status(201).json(result)
  })
  .catch(err =>{
    res.status(500).json(err)
  })

}


 const getWeeklyReport = (req,res)=>{
    const todayDate = new Date().getDate()
    const weeklyExpense = new Date().setDate(todayDate-7)
    const Now = new Date();

    const userId = req.user.id;
    Expense.findAll({where:{userid:userId , createdAt:{[op.gt]:weeklyExpense,[op.lt]:Now}}})
    .then(result =>{
      res.status(201).json(result)
    })
    .catch(err =>{
      res.status(500).json(err)
    })

}
module.exports = {
    getAllUsers,
    getAllExpenses,
    getReport,
    getWeeklyReport
}