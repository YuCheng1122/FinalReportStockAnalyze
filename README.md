# 股市光明燈
股市光明燈是一個大學期末專題。透過運用天氣、月像、人口等數據進行分析，我們希望能夠讓這些數據產生意義。此外，我們也提供基本面、技術面、籌碼面的分析，旨在為投資者提供全面的股市資訊。

## 前提條件
確保您已安裝以下軟件：
- Node.js
- MySQL
## 安裝
1. 克隆此存儲庫：
```
git clone [repository_link]
```
2. 進入項目目錄：
```
cd FinalReportStockAnalyze
```
3. 安裝依賴項：
```
npm install
```
4. 複製 .env.example 文件並重命名為 .env，然後根據您的環境配置填寫適當的值。
5. 啟動伺服器：
```
node app.js
```
## 使用 Sequelize
1. 確保 Node.js 應用程式中載入 .env 檔案的環境變數
```
npm install dotenv
```
2. 創建資料庫：
3. 檢查資料庫連線
```
cd /database
node testConnection.js
```
4. 執行遷移以創建表格：
```
npx sequelize-cli db:migrate
```

## 專案結構
```
D:.
├─config               # 設定檔資料夾
├─middlewares          # 中介軟體資料夾
├─migrations           # 資料庫遷移檔案
├─node_modules         # Node.js模組和套件
└─src                  # 主要源碼資料夾
    ├─controllers      # 控制器，處理業務邏輯
    ├─database         # 資料庫相關設定和連接
    ├─models           # 資料模型，定義資料庫結構和關聯
    ├─routes           # 路由設定，定義API端點
    └─views            # 視圖模板，用於渲染前端頁面
```


