
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

 const signup = (req, res)=>{
    const { name, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log('Unable to create new user')
                res.json({message: 'Unable to create new user'})
            }
            User.create({ name, email, password: hash }).then(() => {
                res.status(201).json({message: 'Successfuly create new user'})
            }).catch(err => {
                res.status(403).json(err);
            })

        });
    });
}



function generateAccessToken(id) {
    return jwt.sign(id ,process.env.TOKEN_SECRET);
}
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(password);
  
      const user = await User.findAll({ where: { email } });
      if (user.length > 0) {
        const response = await new Promise((resolve, reject) => {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
  
          if (response) {
            console.log(JSON.stringify(user));
            const jwttoken = await generateAccessToken(user[0].id);
            res.json({ token: jwttoken, success: true, message: 'Successfully Logged In' });
          } else {
            return res.status(401).json({ success: false, message: 'Passwords do not match' });
          }
      } else {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: 'Something went wrong' });
    }
  };
  
/*
const login = (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    User.findAll({ where : { email }}).then(user => {
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, response) {
                if (err){
                console.log(err)
                return res.json({success: false, message: 'Something went wrong'})
                }
                if (response){
                    console.log(JSON.stringify(user))
                    const jwttoken = generateAccessToken(user[0].id);
                    res.json({token: jwttoken, success: true, message: 'Successfully Logged In'})
                } else {
                return res.status(401).json({success: false, message: 'passwords do not match'});
                }
            });
        } else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
}*/

module.exports = {
    signup,
    login
}
