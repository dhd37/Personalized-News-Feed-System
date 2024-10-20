const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models');
const router = express.Router();
require('dotenv').config();
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({ message: 'User registered succefully'});
    } catch(err) {
        res.status(400).json({error: 'Registration failed', details: err});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const isMatch = user.comparePassword(password)
        if(!isMatch) {
            return res.status(400).json({message: "Invalid Password"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});

    } catch (err) {
        res.status(500).json({error: 'Login failed', details:err});
    }
    
})


module.exports = router;
