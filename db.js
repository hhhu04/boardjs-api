const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// 로컬 환경에서만 쿼리 로깅
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
  const originalExecute = pool.execute;
  
  pool.execute = function(sql, params) {
    console.log('🔍 SQL Query:', sql);
    if (params && params.length > 0) {
      console.log('📋 Parameters:', params);
    }
    console.log('⏱️  Time:', new Date().toISOString());
    console.log('---');
    
    return originalExecute.apply(this, arguments);
  };
}

module.exports = pool;