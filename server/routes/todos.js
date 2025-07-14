const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  db.all(
    "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { user_id, title, category, due_date } = req.body;
  console.log(req.body);

  db.run(
    "INSERT INTO todos (user_id, title, category, due_date) VALUES (?, ?, ?, ?)",
    [user_id, title, category, due_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ user_id, id: this.lastID }); // 새로 생성된 id 반환
    }
  );
});

router.put("/:user_id/:id", (req, res) => {
  const { user_id, id } = req.params;
  const { title, category, due_date } = req.body;

  db.run(
    `UPDATE todos
     SET title = ?, category = ?, due_date = ?
     WHERE user_id = ? AND id = ?`,
    [title, category, due_date, user_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updatedId: id });
    }
  );
});

router.delete("/:user_id/:id", (req, res) => {
  const { user_id, id } = req.params;

  db.run(
    "DELETE FROM todos WHERE user_id = ? AND id = ?",
    [user_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deletedId: id });
    }
  );
});

module.exports = router;
