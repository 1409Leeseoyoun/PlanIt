const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'dday.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('DB 연결 실패:', err.message);
  console.log('SQLite 연결 완료');
});

module.exports = db;
