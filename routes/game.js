const express = require('express');
const gameController = require('../controllers/gameController');
const {authenticateToken, optionalAuth} = require("../middleware/auth");
const router = express.Router();

router.get('/cyphers', optionalAuth, gameController.getCyphers);
router.get('/cyphers/match', gameController.getCyphersMatchList)
router.get('/cyphers/match/:matchId', gameController.getCyphersMatchDetail)

router.get('/dnf', optionalAuth, gameController.getDnf);

router.get('/lol', optionalAuth, gameController.getLol)
router.get('/lol/:puuid', gameController.getLolMatchList)

router.post('/favorites', authenticateToken, gameController.mergeFavorites)

module.exports = router;