const express = require("express");
const router = express.Router();
const db = require("../db");

// 전체 목록 조회
router.get("/", (req, res) => {
  db.all("SELECT * FROM todos ORDER BY due_date ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 할일 추가
router.post("/", (req, res) => {
  const { title, due_date } = req.body;
  db.run(
    "INSERT INTO todos (title, due_date) VALUES (?, ?)",
    [title, due_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;
