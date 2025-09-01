const gameService = require('../services/gameService');
const { handleControllerError } = require('../utils/errorHandler');

class GameController {

  async getCyphers(req, res) {
    try {
      console.log('Request params:', req.query);
      let param = req.query;
      const data = await gameService.getCyphersPlayer(param);

      if(req.user !== null){
        const favorite = await gameService.searchMyFavorite(req.user.idx, data.playerId);
        data.favorite = favorite;
        console.log('favorite:', favorite)
      }

      res.json(data);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch cyphers data');
    }
  }

  async getCyphersMatchList(req, res) {
        try{
            let param = req.query;
            const data = await gameService.getCyphersMatchList(param);

            res.json(data);
        }catch(error){
            handleControllerError(error, res, 'Failed to fetch cyphers data');
        }
  }

  async getCyphersMatchDetail(req, res) {
      try{
          let matchId = req.params.matchId;
          let param = {matchId: matchId};
          const data = await gameService.getCyphersMatchDetail(param);

          res.json(data);
      }catch(error){
          handleControllerError(error, res, 'Failed to fetch cyphers data');
      }
  }

  async getDnf(req, res) {
    try {
      console.log('Request params:', req.query);
      let param = req.query;
      const data = await gameService.getDnfPlayer(param);

      if(req.user !== null){
        const favorite = await gameService.searchMyFavorite(req.user.idx, data.characterId);
        data.favorite = favorite;
        console.log('favorite:', favorite)
      }

      res.json(data);
    } catch (error) {
      handleControllerError(error, res, 'Failed to fetch dnf data');
    }
  }

  async mergeFavorites(req, res) {
    try {
      console.log('Request params:', req.body);
      req.body.params.user_idx = req.user.idx;
      const data = await gameService.mergeFavorites(req.body.params);
      res.json(data);
    } catch (error) {
      handleControllerError(error, res, 'Failed to merge favorites');
    }
  }

}

module.exports = new GameController();