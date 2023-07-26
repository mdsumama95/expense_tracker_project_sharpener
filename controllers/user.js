const User = require('../models/users');

function isstringinvalid(string) {
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

module.exports = signup;
