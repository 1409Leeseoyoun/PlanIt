const express = require("express");
const cors = require("cors"); // CORS 허용을 위한 미들웨어
const app = express();
const todosRouter = require("./routes/todos");

app.use(cors()); // CORS 허용 (프론트와 도메인이 달라도 허용됨)
app.use(express.json()); // JSON 요청 바디를 파싱해서 req.body로 사용 가능
app.use("/api/todos", todosRouter); // "/api/todos"로 시작하는 요청을 todosRouter에서 처리

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
