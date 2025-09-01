const { createApiClient } = require('../utils/httpClient');
const {exitsFavorites, deleteFavorite, addFavorite, existsMyFavorite} = require("../models/Game");

class GameService {

  constructor() {
    this.neopleApiClient = createApiClient('https://api.neople.co.kr');
    this.riotApiClient = createApiClient('https://asia.api.riotgames.com');
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
          let response = await this.neopleApiClient.get(`/cy/players/${playerId}/matches`,{ params });
          return response.data;
      }catch(error) {
          console.error('GameService - getCyphersMatchList error:', error.message);
          throw error;
      }
  }

  async getCyphersMatchDetail(params = {}) {
      try{
          let matchId = params.matchId
          delete params.matchId
          params.apikey = process.env.CYPHERS;
          let response = await this.neopleApiClient.get(`/cy/matches/${matchId}`,{params});

          let result = response.data;
          let data = {}
          if(result){
              let teamA = result.teams[0]
              let teamB = result.teams[1]

              let players = result.players

              let arrA = players.filter(player => player.teamId === teamA.teamId)
              let arrB = players.filter(player => player.teamId === teamB.teamId)

              data = {
                  teamA: { ...teamA, players: arrA },
                  teamB: { ...teamB, players: arrB }
              }
          }

          return data;
      }
      catch(error) {
          console.error('GameService - getCyphersMatchDetail error:', error.message);
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

  async getLolPlayer(params = {}) {

      try{
          let gameName = params.gameName
          let tag = params.tag
          delete params.tag
          delete params.gameName
          params.api_key = process.env.LOL
          let response = await this.riotApiClient(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`, { params });

          return response.data;
      }
      catch (error) {
          console.error('GameService - getLolPlayer error:', error.message);
          throw error;
      }

  }

  async getLolPlayerMatchList(params = {},puuid) {
      try{
          if(!params.start){
              params.start = 0
          }
          params.count = 10
          params.api_key = process.env.LOL
          let responseMatchList = await this.riotApiClient(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, { params });

          let matchIdList = responseMatchList.data

          delete params.start
          delete params.count

          let matchList = []
          for(let i = 0; i < matchIdList.length; i++){
              const response = await this.riotApiClient(`/lol/match/v5/matches/${matchIdList[i]}`, { params });
              matchList.push(response.data);
          }

          return matchList;
      }
      catch (error) {
          console.error('GameService - getLolPlayer error:', error.message);
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