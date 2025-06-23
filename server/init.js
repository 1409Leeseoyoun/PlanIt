const db = require("./db");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      due_date TEXT,
      completed INTEGER DEFAULT 0
    )
  `,
    (err) => {
      if (err) return console.error("테이블 생성 오류:", err.message);
      console.log("테이블 생성 완료");
    }
  );
});
