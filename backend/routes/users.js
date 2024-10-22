var express = require('express');
var router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const User = require('../models/User');

/* GET users listing. */
router.get('/', authenticateJWT,  function(req, res, next) {
  res.send(`User info for userId: ${req.user.userId}`); 
});

// Set users preferences
router.put('/preferences', authenticateJWT, async (req, res) => {
  const {preferences} = req.body;
  try{
    const user = await User.findById(req.user.userId);
    user.preferences = preferences;
    await user.save();
    res.json({message: 'Preferences updated', preferences: user.preferences});
  } catch (err) {
    res.status(500).json({message: 'Failed to update preferences', details: err});
  }
});
module.exports = router;
