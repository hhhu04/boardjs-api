var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');
const { authenticateToken } = require('../middleware/auth');


/* GET user info. */
router.get('/info', authenticateToken, async function(req, res, next) {
  try {
    const tokenInfo = req.user;
    // const user = await User.findById(idx);
    //
    // if (!user) {
    //   const error = errorResponse('User not found', 404);
    //   return res.status(404).json(error);
    // }
    //
    // const response = successResponse({
    //   idx: user.idx,
    //   user_id: user.user_id
    // }, 'User information retrieved successfully');
    //
    res.json(tokenInfo);
  } catch (error) {
    console.error('Database error:', error);
    const errorRes = errorResponse('Internal server error', 500);
    res.status(500).json(errorRes);
  }
});

module.exports = router;
