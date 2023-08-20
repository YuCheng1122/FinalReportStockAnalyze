require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;
const WPPRoute = require("./src/routes/weatherPredict");

// ... 其他代碼

// 不需要 db.connect() 和 db.end()
app.use(WPPRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
