const db = require('../db');

class User {
  static async _executeQuery(query, params = []) {
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(idx, includePassword = false) {
    const fields = includePassword ? 'idx, user_id, password' : 'idx, user_id';
    const rows = await this._executeQuery(
      `SELECT ${fields} FROM user WHERE idx = ?`,
      [idx]
    );
    return rows[0] || null;
  }

  static async findByUserId(user_id, includePassword = false) {
    const fields = includePassword ? 'idx, user_id, password' : 'idx, user_id';
    const rows = await this._executeQuery(
      `SELECT ${fields} FROM user WHERE user_id = ?`,
      [user_id]
    );
    return rows[0] || null;
  }

  static async findAll() {
    return await this._executeQuery('SELECT idx, user_id FROM user');
  }

  static async create(user_id, password) {
    const [result] = await db.execute(
      'INSERT INTO user (user_id, password) VALUES (?, ?)',
      [user_id, password]
    );
    return result.insertId;
  }

  static async updatePassword(idx, newPassword) {
    const [result] = await db.execute(
      'UPDATE user SET password = ? WHERE idx = ?',
      [newPassword, idx]
    );
    return result.affectedRows > 0;
  }

  static async deleteById(idx) {
    const [result] = await db.execute('DELETE FROM user WHERE idx = ?', [idx]);
    return result.affectedRows > 0;
  }
}

module.exports = User;