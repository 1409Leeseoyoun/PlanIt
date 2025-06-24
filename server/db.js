// sqlite3 모듈 불러오기
const sqlite3 = require("sqlite3");
const path = require("path"); // 경로 조작을 위한 Node 내장 모듈

// dday.db 파일의 절대 경로 생성
const dbPath = path.resolve(__dirname, "dday.db");

// 해당 경로의 DB에 연결 (없으면 새로 생성됨)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("DB 연결 실패:", err.message);
  console.log("SQLite 연결 완료");
});

module.exports = db;
