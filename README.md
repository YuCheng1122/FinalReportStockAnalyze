# 股市光明燈
股市光明燈是一個大學期末專題。透過運用天氣、月像、人口等數據進行分析，我們希望能夠讓這些數據產生意義。此外，我們也提供基本面、技術面、籌碼面的分析，旨在為投資者提供全面的股市資訊。

## 前提條件
確保您已安裝以下軟件：
- Node.js
- PostgreSQL（本專案原本使用 MySQL，已於 2026 年搬遷至 Postgres，方便部署在免費的
  Postgres 服務上，例如 Supabase／Neon。詳見下方「部署與遷移紀錄」。）
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
4. 複製 .env.example 文件並重命名為 .env，然後根據您的環境配置填寫適當的值
   （優先使用 `DATABASE_URL`，或用 `DB_HOST`/`DB_USERNAME`/`DB_PASSWORD`/`DB_NAME`
   這組離散變數）。
5. 啟動伺服器：
```
node app.js
```
## 使用 Sequelize
1. 確保 Node.js 應用程式中載入 .env 檔案的環境變數
```
npm install dotenv
```
2. 建立一個空的 Postgres 資料庫
3. 檢查資料庫連線
```
node src/database/testConnection.js
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

## 部署與遷移紀錄

畢業後這個專案沒有再維護，2026 年為了把它搬到免費空間上重新運作，做了以下工作：

**資料庫：MySQL → Postgres**
- 專案原本用 MySQL；免費 MySQL 代管選擇越來越少，改用 Supabase 的免費 Postgres
- 這個後端沒有透過 Sequelize 的查詢功能存取資料（只有 migrations 用得到），實際 API
  都是用 `mysql2` 手寫原生 SQL，所以搬遷是把整層資料存取邏輯重寫，不只是改個
  dialect 設定
- `src/config/databaseConnect.js` 換成 `pg`，並包了一層相容層，自動把 MySQL 專屬語法
  （反引號欄位名、`INSERT ... VALUES ?` 批次寫入、`INSERT ... SET ?` 物件寫入、
  `INSERT IGNORE`）轉成 Postgres 語法，讓大部分 model 檔案不用改
- 少數 MySQL/Postgres 行為不同的地方個別修正：`CAST(... AS DOUBLE)`、`YEAR()`、
  `DATE()`、字串跟數字比大小的隱式轉換
- 修正 migrations 裡的表名/欄位名大小寫問題（Sequelize 在 Postgres 上預設會把大小寫
  當作有意義的，MySQL 預設不會，這個落差會讓查詢全部對不上）；`user` 也因為是
  Postgres 保留字而需要加引號
- 補上原本沒進版控的 3 張表（`card`、`light`、`sentiment_analysis`）和新聞表缺的
  2 個欄位
- 修正 `.sequelizerc` 指向的路徑在 Linux 上其實找不到設定檔的問題（原本能跑只是因為
  在 Windows 上開發，大小寫不敏感）

**排程 / 爬蟲**
- 原本 `src/schedule.js` 用 `node-schedule` 在程式內跑排程；改成 5 支獨立腳本
  （`src/scripts/update*.js`）+ 兩個 GitHub Actions 排程工作流程
  （`.github/workflows/`），直接連資料庫寫入，不需要後端伺服器保持喚醒
- 14 支獨立爬蟲/分析腳本（`src/crawlers/`、`src/analysis/`）也搬到 Postgres 連線
- 修正一個資料遺失的 race condition：多支爬蟲原本是「非同步寫入、迴圈跑完就立刻關閉
  連線」，本機測試因為延遲趨近於零沒發現，接到 Supabase 後大部分寫入還沒完成連線就
  關掉了；改成正確等待所有寫入完成再關閉
- 修正 `crawlers/stock.js` 原本用錯 TWSE API（只有 50 筆），換成正確的「上市公司
  基本資料」端點（1093 筆），否則其他表的外鍵幾乎全部對不上
- `src/crawlers/backfillMonth.js`、`backfillTaiexYear.js` 是手動補歷史資料用的
  一次性工具，不在排程裡

**其他修正**
- `src/AI/main.js` 原本寫死一組 MySQL 主機帳密（明碼）在程式碼裡，已改成讀共用連線
  設定。這組密碼已進入 git 歷史，若曾經 push 到遠端就該視為外洩，建議去源頭
  （Zeabur）換掉

**部署方式**
- 資料庫：Supabase（Postgres，免費方案）
- 後端 API：Render（免費方案，`render.yaml` 已設定好 build/start command；15 分鐘
  無請求會休眠，下一個請求要等 30～50 秒喚醒）
- 排程：GitHub Actions（`market-close-update.yml` 平日跑股價/指數，
  `daily-news-update.yml` 每天跑新聞），secrets 需要設定 `DATABASE_URL`（必要）、
  `SERP_API_KEY`（新聞排程用，沒有會安全地跳過不報錯）
- 環境變數參考 `.env.example`；`DATABASE_URL` 優先於離散的 `DB_HOST`/`DB_USERNAME`
  等變數

**已知未完成事項**
- Puppeteer 爬蟲（`crawlers/weather.js`、`crawlers/news/yahoos.js`）沒有排程化，
  需要手動執行或另外接 GitHub Actions

