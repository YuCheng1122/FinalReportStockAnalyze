const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./database/mysql");

db.connect();

// 使用 db 進行資料庫操作...

// 在適當的時候
db.end();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
