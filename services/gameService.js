const { createApiClient } = require('../utils/httpClient');
const {exitsFavorites, deleteFavorite, addFavorite, existsMyFavorite} = require("../models/Game");

class GameService {

  constructor() {
    this.neopleApiClient = createApiClient('https://api.neople.co.kr');
  }

  async getCyphersPlayer(params = {}) {
    try {
      params.limit = 1
      params.apikey = process.env.CYPHERS;
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

  async getDnfPlayer(params = {}) {
    try {
      params.limit = 1
      params.apikey = process.env.DNF;
      let response = await this.neopleApiClient.get('/df/servers/all/characters', { params });
      return response.data.rows[0];

      // const playerId = response.data.rows[0].playerId
      //
      // console.log('playerId:', playerId);
      //
      // response = await this.neopleApiClient.get(`/cy/players/${playerId}`, { params });
      //
      // return response.data;
    } catch (error) {
      console.error('GameService - fetchCyphers error:', error.message);
      throw error;
    }
  }

  async getCyphersMatchList(params = {}) {
      try{
          let playerId = params.playerId
          params.apikey = process.env.CYPHERS;
          delete params.playerId
          let response = await this.neopleApiClient.get('/cy/players/'+playerId+'/matches',{ params });
          return response.data;
      }catch(error) {
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