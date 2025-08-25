const gameService = require('../services/gameService');

class GameController {

  async getCyphers(req, res) {
    try {
      console.log('Request params:', req.query);
      let param = req.query;
      param.apikey = process.env.CYPHERS;
      const data = await gameService.getCyphersPlayer(param);

      if(req.user !== null){
        const favorite = await gameService.searchMyFavorite(req.user.idx, data.playerId);
        data.favorite = favorite;
        console.log('favorite:', favorite)
      }

      res.json(data);
    } catch (error) {
      console.error('Game Controller Error:', error.message);
      
      if (error.response) {
        res.status(error.response.status).json({
          error: 'API request failed',
          message: error.response.data || error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: 'Failed to fetch cyphers data'
        });
      }
    }
  }

  async getDnf(req, res) {
    try {
      console.log('Request params:', req.query);
      let param = req.query;
      param.apikey = process.env.DNF;
      const data = await gameService.getDnfPlayer(param);

      if(req.user !== null){
        const favorite = await gameService.searchMyFavorite(req.user.idx, data.characterId);
        data.favorite = favorite;
        console.log('favorite:', favorite)
      }

      res.json(data);
    } catch (error) {
      console.error('Game Controller Error:', error.message);

      if (error.response) {
        res.status(error.response.status).json({
          error: 'API request failed',
          message: error.response.data || error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: 'Failed to fetch cyphers data'
        });
      }
    }
  }

  async mergeFavorites(req, res) {
    try {
      console.log('Request params:', req.body);
      req.body.params.user_idx = req.user.idx;
      const data = await gameService.mergeFavorites(req.body.params);
      res.json(data);
    } catch (error) {
      console.error('Game Controller Error:', error.message);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to fetch cyphers data'
      });
    }
  }

}

module.exports = new GameController();