const db = require("./db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS todos", (err) => {
    if (err) return console.error("기존 테이블 삭제 오류:", err.message);
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,   -- 기본키
       title TEXT    NOT NULL,                 -- 제목
       category TEXT NOT NULL,                 -- 카테고리
       due_date TEXT,                          -- 마감 날짜
       completed INTEGER DEFAULT 0             -- 완료 여부
     );`,
    (err) => {
      if (err) return console.error("테이블 생성 오류:", err.message);
      console.log("todos 테이블 생성 완료");
    }
  );
});
