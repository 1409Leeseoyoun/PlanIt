const db = require("./db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS todos", (err) => {
    if (err) return console.error("기존 테이블 삭제 오류:", err.message);
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT    NOT NULL,
       category TEXT NOT NULL,
       due_date TEXT,
       completed INTEGER DEFAULT 0
     );`,
    (err) => {
      if (err) return console.error("테이블 생성 오류:", err.message);
      console.log("todos 테이블 생성 완료");
    }
  );
});
