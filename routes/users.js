var express = require('express');
var router = express.Router();
const { successResponse, errorResponse } = require('../utils/response');
const { authenticateToken } = require('../middleware/auth');
const {findByUserId, joinUser} = require("../models/User");
const bcrypt = require('bcryptjs');

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
        if(!param.userId){
            const errorRes = errorResponse('아이디가 없습니다.', 400);
            res.status(400).json(errorRes);
            return
        }

        if(!param.password){
            const errorRes = errorResponse('비밀번호가 없습니다.', 400);
            res.status(400).json(errorRes);
            return
        }

        let check = await findByUserId(param.userId)

        if(check){
            const errorRes = errorResponse('이미 사용중인 아이디입니다.', 400);
            res.status(400).json(errorRes);
            return
        }

        param.password = await bcrypt.hash(param.password, 10)
        let result = await joinUser(param.userId, param.password)
        res.json(result)
    }
    catch (error) {
        console.error('Database error:', error);
        const errorRes = errorResponse(error.message, error.status);
        res.status(500).json(errorRes);
    }
})

module.exports = router;
