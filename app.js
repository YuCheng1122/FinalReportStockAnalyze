require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

// ... 其他代碼

// 不需要 db.connect() 和 db.end()

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
