var express = require('express');
var router = express.Router();
const { successResponse, errorResponse } = require('../utils/response');
const { authenticateToken } = require('../middleware/auth');
const {findByUserId, createUser} = require("../models/User");
const bcrypt = require('bcryptjs');


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

router.get('/id/check', async function(req, res) {
    try{
        let param = req.query.user_id;
        let result = await findByUserId(param)
        res.json(result)
    }
    catch (error) {
        console.error('Database error:', error);
        const errorRes = errorResponse(error.message, error.status);
        res.status(500).json(errorRes);
    }
})

router.post('/join', async function(req, res) {
    try{
        let param = req.body;
        if(!param.user_id){
            const errorRes = errorResponse('아이디가 없습니다.', 400);
            res.status(400).json(errorRes);
            return
        }

        if(!param.password){
            const errorRes = errorResponse('비밀번호가 없습니다.', 400);
            res.status(400).json(errorRes);
            return
        }

        param.password = await bcrypt.hash(param.password, 10)
        let result = await createUser(param.user_id, param.password)
        res.json(result)
    }
    catch (error) {
        console.error('Database error:', error);
        const errorRes = errorResponse(error.message, error.status);
        res.status(500).json(errorRes);
    }
})

module.exports = router;
