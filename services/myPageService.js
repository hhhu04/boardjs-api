const {getMyGameKey} = require("../models/MyPage");

class myPageService {

    async getFavoriteList(tokenInfo) {
        try {
            return await getMyGameKey(tokenInfo.idx);
        } catch (error) {
            console.error('GameService - mergeFavorites error:', error.message);
            throw error;
        }
    }

}

module.exports = new myPageService();