const myPageService = require('../services/myPageService');
const gameService = require('../services/gameService');
const { handleControllerError } = require('../utils/errorHandler');


class myPageController {

    async info(req, res) {
        try {
            console.log('Request params:', req.query);
            const tokenInfo = req.user;
            let keyList = await myPageService.getFavoriteList(tokenInfo);

            let listDnf = []
            let listCyphers = []
            let listLol = []
            if(keyList){
                for(let key in keyList){
                    let listKey = keyList[key];
                    switch(listKey.game_type){
                        case 1:
                            let dData = await gameService.getDnfPlayer({characterName:listKey.game_key})
                            for(var i=0; i<dData.rows.length; i++){
                                listDnf.push(dData.rows[i])
                            }
                            break;
                        case 2:
                            listCyphers.push()
                            break;
                        case 3:
                            listLol.push()
                            break;
                    }

                }
            }

            let data = {
                listDnf: listDnf,
                listCyphers: listCyphers,
                listLol: listLol
            }

            res.json(data);
        } catch (error) {
            handleControllerError(error, res, 'Failed to fetch myPageInfo data');
        }
    }

}

module.exports = new myPageController();