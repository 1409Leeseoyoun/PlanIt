const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM todos ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, category, due_date } = req.body;
  db.run(
    "INSERT INTO todos (title, category, due_date) VALUES (?, ?, ?)",
    [title, category, due_date],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, category, due_date } = req.body;
  db.run(
    `UPDATE todos
       SET title    = ?,
           category = ?,
           due_date = ?
     WHERE id = ?`,
    [title, category, due_date, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updatedId: id });
    }
  );
});

module.exports = router;
