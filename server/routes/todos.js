const express = require("express"); // Express 불러오기
const router = express.Router(); // 라우터 객체 생성
const db = require("../db"); // DB 연결 가져오기

router.get("/", (req, res) => {
  db.all("SELECT * FROM todos ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 할 일 추가
router.post("/", (req, res) => {
  const { title, category, due_date } = req.body; // 요청 데이터

  db.run(
    "INSERT INTO todos (title, category, due_date) VALUES (?, ?, ?)",
    [title, category, due_date], // 값 바인딩
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID }); // 성공 시 새 ID 반환
    }
  );
});

// 특정 할 일 삭제
router.delete("/:id", (req, res) => {
  const id = req.params.id; // URL에서 id 추출

  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id }); // 성공 시 삭제된 ID 반환
  });
});

// 특정 할 일 수정
router.put("/:id", (req, res) => {
  const id = req.params.id; // URL 파라미터에서 id 가져오기
  const { title, category, due_date } = req.body; // 요청 바디에서 수정할 값 가져오기

  db.run(
    `UPDATE todos
       SET title    = ?,
           category = ?,
           due_date = ?
     WHERE id = ?`,
    [title, category, due_date, id], // 순서대로 바인딩
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updatedId: id }); // 성공 시 수정된 ID 반환
    }
  );
});

module.exports = router; // 라우터 내보내기
