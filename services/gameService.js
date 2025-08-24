const { createApiClient } = require('../utils/httpClient');
const {exitsFavorites, deleteFavorite, addFavorite, existsMyFavorite} = require("../models/Game");

class GameService {

  constructor() {
    this.neopleApiClient = createApiClient('https://api.neople.co.kr');
  }

  async getPlayer(params = {}) {
    try {
      params.limit = 1
      let response = await this.neopleApiClient.get('/cy/players', { params });
      const playerId = response.data.rows[0].playerId

      console.log('playerId:', playerId);

      response = await this.neopleApiClient.get(`/cy/players/${playerId}`, { params });

      return response.data;
    } catch (error) {
      console.error('GameService - fetchCyphers error:', error.message);
      throw error;
    }
  }

  async mergeFavorites(data) {
    try {

      let exists = await exitsFavorites(data.user_idx, data.game_type, data.game_key)

      if(exists){
        await deleteFavorite(data.user_idx, data.game_type, data.game_key)
      }
      else{
        await addFavorite(data.user_idx, data.game_type, data.game_key)
      }

      return exists;
    } catch (error) {
      console.error('GameService - mergeFavorites error:', error.message);
      throw error;
    }

  }

  async searchMyFavorite(idx, playerId) {
    try {
      return await existsMyFavorite(idx, playerId);
    } catch (error) {
      console.error('GameService - mergeFavorites error:', error.message);
      throw error;
    }
  }

}

module.exports = new GameService();