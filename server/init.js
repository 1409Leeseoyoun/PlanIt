const db = require("./db");

db.serialize(() => {
  // db.run("DROP TABLE IF EXISTS users", (err) => {
  //   if (err) return console.error("기존 테이블 삭제 오류:", err.message);
  // });
  // db.run("DROP TABLE IF EXISTS todos", (err) => {
  //   if (err) return console.error("기존 테이블 삭제 오류:", err.message);
  // });

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY NOT NULL,
      password TEXT NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      title TEXT,
      category TEXT NOT NULL,
      due_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`,
    (err) => {
      if (err) return console.error("테이블 생성 오류:", err.message);
      console.log("todos 테이블 생성 완료");
    }
  );
});
