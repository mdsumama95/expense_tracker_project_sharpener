const User = require('../models/users');
const bcrypt = require('bcrypt');


function generateAccessToken(id, email, ispremiumuser) {
  return jwt.sign({ userId: id, email: email , ispremiumuser}, process.env.TOKEN);
}
const signup = async (req, res) => {

  try {
    const { name, email, password } = req.body; 
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
   
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

const login = async (req, res) => {
  try {
    const {email, password } = req.body; 
    if (email == NULL || password == NULL) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    return res.status(200).json({success: true, message: "Login successful!",token:generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = {signup, login};
