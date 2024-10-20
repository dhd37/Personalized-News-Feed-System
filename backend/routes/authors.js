const express = require('express');
const Author = require('../models/Authors');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.get('/', async (req, res) => {
    const authors = await Author.find().populate('articles');
    res.json(authors);
});

router.post('/', authenticateJWT, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied'});
    }
    const { name, bio} = req.body;
    const newAuthor = new Author({ name, bio});

    try {
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create author', details: err});
    }
});

module.exports = router;
