var express = require('express');
const {authenticateToken} = require("../middleware/auth");
const myPageController = require('../controllers/myPageController');
var router = express.Router();


router.get('/info', authenticateToken, myPageController.info)

module.exports = router;