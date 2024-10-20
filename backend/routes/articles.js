const express = require('express');
const Article = require('../models/Article');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();
const User = require('../models/User');
const Author = require('../models/Authors')
// Get all articles
router.get('/', async(req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

// Get articles by topic
router.get('/topic/:topic', async(req, res) => {
    const articles = await Article.find({tags: req.params.topic});
    res.json(articles)
});

// Create a new article (admin-only route)
router.post('/', authenticateJWT, async(req, res) => {
    if(!req.user.isAdmin){
        return res.status(403).json({message: 'Access denied'});
    }
    const { title, content, author, tag} = req.body;
    try{
        const newArticle = new Article({ title, content, author, tags});
        await newArticle.save();

        const author = await Author.findById(authorId);
        author.articles.push(newArticle._id);
        await author.save();
        
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({error: 'Failed to create article', detail: err});
    }
});

// Get articles by preferences
router.get('/personalized', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const preferences = user.preferences;
        const articles = await Article.find({tags: {$in: preferences} });
        res.json(articles);
    } catch (err) {
        req.status(500).json({ message: 'Failed to fetch personalize articles', details: err });
    }
});

module.exports = router

