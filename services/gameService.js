const { createApiClient } = require('../utils/httpClient');
const {exitsFavorites, deleteFavorite, addFavorite, existsMyFavorite} = require("../models/Game");

class GameService {

  constructor() {
    this.neopleApiClient = createApiClient('https://api.neople.co.kr');
    this.riotApiClient = createApiClient('https://asia.api.riotgames.com');
    this.lolApiClient = createApiClient('https://kr.api.riotgames.com');
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



  async getDnfPlayer(params = {}) {
    try {
      params.limit = 1
      params.apikey = process.env.DNF;
      let response = await this.neopleApiClient.get('/df/servers/all/characters', { params });
      return response.data;

    } catch (error) {
      console.error('GameService - fetchCyphers error:', error.message);
      throw error;
    }
  }

  async getDnfTimeline(params = {}) {
      try{
          let characterId = params.characterId
          let serverId = params.serverId
          params.apikey = process.env.DNF;
          delete params.characterId
          delete params.serverIdspq

          let timeLine = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/timeline`, { params });

          return timeLine.data.timeline;
      }
      catch(error) {
          console.error('GameService - getDnfDetail error:', error.message);
          throw error;
      }
  }

  async getDnfDetail(params={}) {
      try{
          let characterId = params.characterId
          let serverId = params.serverId
          params.apikey = process.env.DNF;
          delete params.characterId
          delete params.serverIdspq

          let status = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/status`, { params });
          let equipment = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/equip/equipment`, { params });
          let avatar = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/equip/avatar`, { params });
          let creature = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/equip/creature`, { params });
          let flag = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/equip/flag`, { params });
          let skill = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/skill/style`, { params });
          let buffEquipment = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/equipment`, { params });
          let buffAvatar = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/avatar`, { params });
          let buffCreature = await this.neopleApiClient.get(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/creature`, { params });

          let character = status.data
          let statusVal = character.status
          delete character.status

          return {
              character: character
              , equipment: equipment.data.equipment
              , equipmentSet: equipment.data.setItemInfo
              , status: statusVal
              , statusBuff: status.data.buff
              , avatar: avatar.data.avatar
              , creature: creature.data.creature
              , flag: flag.data.flag
              , skill: skill.data.skill
              , buffEquipment: buffEquipment.data.skill
              , buffAvatar: buffAvatar.data.skill
              , buffCreature: buffCreature.data.skill
          };
      }
      catch(error) {
          console.error('GameService - getDnfDetail error:', error.message);
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

          let puuid = response.data.puuid

          let response2 = await this.lolApiClient(`/lol/summoner/v4/summoners/by-puuid/${puuid}`, { params })

          return response2.data;
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

          let userInfo = await this.lolApiClient(`/lol/summoner/v4/summoners/by-puuid/${puuid}`, { params })

          return {
              matchList: matchList
              , userInfo: userInfo.data
          };
      }
      catch (error) {
          console.error('GameService - getLolPlayer error:', error.message);
          throw error;
      }
  }


  async searchMyFavorite(idx, playerId, game_type) {
    try {
      return await existsMyFavorite(idx, playerId, game_type);
    } catch (error) {
      console.error('GameService - mergeFavorites error:', error.message);
      throw error;
    }
  }

}

module.exports = new GameService();