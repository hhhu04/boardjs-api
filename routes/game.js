const express = require('express');
const gameController = require('../controllers/gameController');
const {authenticateToken, optionalAuth} = require("../middleware/auth");
const router = express.Router();

//샆
router.get('/cyphers', optionalAuth, gameController.getCyphers);
router.get('/cyphers/match', gameController.getCyphersMatchList)
router.get('/cyphers/match/:matchId', gameController.getCyphersMatchDetail)

//던
router.get('/dnf', optionalAuth, gameController.getDnf);

//롤
router.get('/lol', optionalAuth, gameController.getLol)
router.get('/lol/:puuid', gameController.getLolMatchList)

//공통
router.post('/favorites', authenticateToken, gameController.mergeFavorites)

module.exports = router;