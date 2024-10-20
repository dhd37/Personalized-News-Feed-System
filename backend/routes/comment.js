const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');

// post comment to an article
router.post('/:articleId', authenticateJWT, async (req, res) => {
    const { articleId } = req.params;
    const { commentText } = req.body;
    
    const newComment = new Comment({
        user: req.user.userId,
        article: articleId,
        commentText
    });

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({message: 'Failed to add comment', details: err});
    }
});

// get comments for a specific article
router.get('/:articleId', async (req, res) => {
    const {articleId} = req.params;
    try{
        const comments = await Comment.find({ article: articleId}).populate('user', 'name');
        res.json(comments);
    } catch (err) {
        res.status(500).json({message: 'Failed to fetch comments', details: err});
    }
});

module.exports =router;

