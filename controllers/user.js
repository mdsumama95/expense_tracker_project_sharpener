const User = require('../models/users');
const bcrypt = require('bcrypt');



const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Accessing name, email, and password from req.body
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
    console.log(error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};


/*function isstringinvalid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('email', email);
        if (isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)) {
            return res.status(400).json({ err: "Badparameter. Something is missing" });
        }
        await User.create({ name, email, password }); // Add 'await' here
        res.status(201).json({ message: 'Successfully create new user' });
    } catch (err) {
        res.status(500).json(err);
    }
};
*/

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
    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = {signup, login};
