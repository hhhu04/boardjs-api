const db = require('../db');

const getMyGameKey = async (idx) => {
    const [rows] = await db.execute(
        'SELECT game_type, game_key FROM user_favorites WHERE user_idx = ?',
        [idx]
    );
    return rows || null;
};

module.exports = {
    getMyGameKey
};