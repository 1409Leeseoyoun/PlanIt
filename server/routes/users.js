const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/signup", (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res
      .status(400)
      .json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
  }

  db.get("SELECT * FROM users WHERE user_id = ?", [user_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
    }

    db.run(
      "INSERT INTO users (user_id, password) VALUES (?, ?)",
      [user_id, password],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "회원가입 성공", user_id });
      }
    );
  });
});

router.post("/login", (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res
      .status(400)
      .json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
  }

  db.get(
    "SELECT * FROM users WHERE user_id = ? AND password = ?",
    [user_id, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!row) {
        return res
          .status(401)
          .json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
      }

      res.status(200).json({ message: "로그인 성공", user_id });
    }
  );
});

module.exports = router;
