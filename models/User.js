const db = require('../db');

const findById = async (idx) => {
  const [rows] = await db.execute(
    'SELECT * FROM user WHERE idx = ?',
    [idx]
  );
  return rows[0] || null;
};

const findByUserId = async (user_id) => {
  const [rows] = await db.execute(
    'select exists(SELECT * FROM user WHERE user_id = ?) as exists_user_id',
    [user_id]
  );
  return rows[0].exists_user_id === 1;
};

const createUser = async (user_id, password) => {
  const [result] = await db.execute(
    'INSERT INTO user (user_id, password) VALUES (?, ?)',
    [user_id, password]
  );
  return result.insertId;
};

module.exports = {
  findById,
  findByUserId,
  createUser
};