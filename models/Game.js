const db = require('../db');

const existsMyFavorite = async (user_idx, game_key, game_type) => {
    const [rows] = await db.execute(
        'select exists(select * from user_favorites where user_idx = ? and game_key= ? and game_type = ?) as exists_result',
        [user_idx, game_key, game_type]
    );
    return rows[0].exists_result === 1;
}

const exitsFavorites = async (user_idx, game_type, game_key) => {
    const [rows] = await db.execute(
        'select exists(select * from user_favorites where user_idx = ? and game_type = ? and game_key= ?) as exists_result',
        [user_idx, game_type, game_key]
    );
    return rows[0].exists_result === 1;
}

const addFavorite = async (user_idx, game_type, game_key) => {
    const [result] = await db.execute(
        'insert into user_favorites (user_idx, game_type, game_key) values (?, ?, ?)',
        [user_idx, game_type, game_key]
    );
    return result.affectedRows > 0;
}

const deleteFavorite = async (user_idx, game_type, game_key) => {
    const [result] = await db.execute(
        'delete from user_favorites where user_idx = ? and game_type = ? and game_key= ?',
        [user_idx, game_type, game_key]
    );
    return result.affectedRows > 0;
}

module.exports = {
    exitsFavorites,
    addFavorite,
    deleteFavorite,
    existsMyFavorite
};