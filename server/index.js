const express = require("express");
const cors = require("cors");
const app = express();
const todosRouter = require("./routes/todos");

app.use(cors());
app.use(express.json());
app.use("/api/todos", todosRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
