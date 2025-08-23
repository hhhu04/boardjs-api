var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');
const { authenticateToken } = require('../middleware/auth');


/* GET user info. */
router.get('/info', authenticateToken, async function(req, res, next) {
  try {
    const tokenInfo = req.user;
    res.json(tokenInfo);
  } catch (error) {
    console.error('Database error:', error);
    const errorRes = errorResponse('Internal server error', 500);
    res.status(500).json(errorRes);
  }
});

module.exports = router;
