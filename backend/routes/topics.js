const express = require('express');
const Topic = require('../models/Topic');
const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
    const topics = await Topic.find();
    res.json(topics);
})
// Add a new topic
router.post('/', async (req, res) => {
    const { name } = req.body
    const newTopic = new Topic({name});
    await newTopic.save();
    res.status(201).json(newTopic);
});
module.exports = router;