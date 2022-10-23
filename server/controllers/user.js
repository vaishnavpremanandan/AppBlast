const Project = require('../models/project');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register the user

module.exports.registerUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
        res.status(400).json({ status: '400', message: 'User exists already' });
    } else {
        const newUser = new User({ email, username });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;
        await newUser.save();
        res.status(200).json({ status: '200', message: 'Successfully created an account'});
    }
}

// Login the user

module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
        res.status(400).json({ status: '400', message: "User doesn't exists" });
    } else {
        const result = await bcrypt.compare(password, findUser.password);
        if (!result) {
            res.status(400).json({ status: '400', message: 'Incorrect password'});
        } else {
            const payload = { id: findUser._id, username: findUser.username };
            jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                res.json({
                    success: true,
                    expiresIn: 3600,
                    token: 'Bearer ' + token,
                    userId: findUser._id
                });
            });
        }
    } 
}

// Authenticate the user

module.exports.authenticateUser = (req, res) => {
    res.json( {
        id: req.user._id,
        username: req.user.username
    });
}