const path = require('path')
const mysql = require('mysql2')
const OpenAI = require('openai')
const moment = require('moment')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})
const { DB_NAME, DB_USERNAME, DB_PASSWORD, OPENAI_API_KEY } = process.env

const dbConfig = {
  host: 'hkg1.clusters.zeabur.com',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  apiKey: OPENAI_API_KEY,
}
// 設置MySQL連接
const connection = mysql.createConnection({
  host: 'hkg1.clusters.zeabur.com',
  port: 32655,
  user: 'root',
  password: 'H2QgYE3xp81X9bCfL6noi7WT5V4Req0d',
  database: 'school_project',
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
})

// 連接到資料庫
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack)
    return
  }

  console.log('Connected to database.')
})

// 設置OpenAI
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })
async function getSentimentAnalysis(titles) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '您需要確定每個標題的情緒是正面、負面還是中性，並提供相應的情緒分數。需要用繁體中文回答。如果很多標題需要提供一個整體的情緒分數，最後輸出為json，需要有個別的情緒、分數、說明和綜合的情緒、分數、說明。',
        },
        {
          role: 'user',
          content: '《金融》台積電帶動國銀日本設點熱\n台積電最後一盤爆2.7萬張買單 股價收577元、市值14.96兆\n台積電降價 聯電、世界先進成苦主？網憂：剛換股的00878該賣了',
        },
        {
          role: 'assistant',
          content: '{\n"1": {\n    "情緒": "正面",\n    "分數": 0.7,\n    "說明": "台積電帶動國銀日本設點熱，顯示了台積電的影響力和成功，這是一個正面的商業發展。"\n},\n"2": {\n    "情緒": "正面",\n    "分數": 0.8,\n    "說明":"台積電最後一盤爆2.7萬張買單 股價收577元、市值14.96兆，這種表現反映出投資者對於台積電的高度信心和需求，屬於正向且樂觀的投資消息。"\n},\n"3":{\n   "情緒":"負面",\n   "分數":-0.6,\n   "說明":"此標題提到「台積電降價」可能會使聯電、世界先進成爲苦主，而投資者可能需要考慮是否要出售其基金持股（指00878），因此帶有不確定性和焦慮感。"\n},\n"整體":{\n   “情緒”:”中性偏正向“，\n   ”分數“：0．3，\n   ”說明“：“整體來看，這三個標題帶有正面的情緒，主要是由於台積電在業界的影響力和成功。然而，對於台積電降價可能帶來的負面影響也引起了一些關注和擔憂。”\n}\n}',
        },
        {
          role: 'user',
          content: '《金融》台積電帶動國銀日本設點熱\n台積電最後一盤爆2.7萬張買單 股價收577元、市值14.96兆\n台積電降價 聯電、世界先進成苦主？網憂：剛換股的00878該賣了\n德國政府對台積電投資案補貼將跳票？ 經長說話了\n廣達1個月跌25%，零股成交股數躍第2！股價破200元跟著撿？「先等這變數釐清再說」',
        },
        {
          role: 'assistant',
          content:
            '{\n"1": {\n    "情緒": "正面",\n    "分數": 0.7,\n    "說明": "台積電帶動國銀日本設點熱，顯示了台積電的影響力和成功，這是一個正面的商業發展。"\n},\n"2": {\n    "情緒": "正面",\n    "分數": 0.8,\n    "說明":"台積電最後一盤爆2.7萬張買單 股價收577元、市值14.96兆，這種表現反映出投資者對於台積電的高度信心和需求，屬於正向且樂觀的投資消息。"\n},\n"3":{\n   "情緒":"負面",\n   "分數":-0.6,\n   "說明":"此標題提到「台積電降價」可能會使聯電、世界先進成爲苦主，而投資者可能需要考慮是否要出售其基金持股（指00878），因此帶有不確定性和焦慮感。"\n},\n"4":{\n   “情緒”：“負面”，\n   ”分數“：-0．5，\n   ”說明“：“德國政府對台積電投資案補貼將跳票？ 經長說話了，這種情況可能會對台積電的未來投資計劃產生影響，並引起市場的擔憂。”\n},\n"5":{\n   “情緒”：“中性”，\n   ”分數“：0，\n   ”說明“：“廣達1個月跌25%，零股成交股數躍第2！股價破200元跟著撿？「先等這變數釐清再說」，此標題關於廣達的表現以及是否該購買其股票的問題，主要帶有觀察和等待的立場。”\n},\n"整體":{\n   “情緒”:”中性“，\n   ”分數“：0．2，\n   ”說明“：“整體來看，這五個標題呈現出一種中性偏向正面和負面都有的情緒。其中兩篇關於台積電在業界影響力與成功方面是正向訊息；然而另外兩篇則提到了可能會對台積電和其他公司產生不利影響的因素；最後一篇則是對廣達股票的觀察和等待，呈現出中性情緒。”\n}\n}',
        },
        {
          role: 'user',
          content: titles,
        },
      ],
      temperature: 0.99,
      max_tokens: 1000,
      top_p: 0.56,
      frequency_penalty: 1.07,
      presence_penalty: 0,
    })

    const rawResponse = response.choices[0].message.content
    console.log('Raw API Response:', rawResponse)

    // 檢查是否為有效的 JSON 格式
    if (rawResponse.startsWith('{') && rawResponse.endsWith('}')) {
      return JSON.parse(replaceFullWidthChars(rawResponse))
    } else {
      throw new Error('Received invalid JSON response')
    }
  } catch (error) {
    console.error('Error in getSentimentAnalysis:', error)
    throw error
  }
}

// 定義全形字符替換函數
function replaceFullWidthChars(str) {
  return str.replace(/[：]/g, ':').replace(/[“”]/g, '"').replace(/[，]/g, ',').replace(/[．]/g, '.').replace(/[；]/g, ';').replace(/[）]/g, ')').replace(/[（]/g, '(')
}
//定義資料庫寫入函數
async function insertSentimentResults(stockId, sentimentResults, titles) {
  for (let i = 1; i <= 5; i++) {
    const result = sentimentResults[i.toString()]
    if (result) {
      const title = titles.split(', ')[i - 1]
      const insertQuery = 'INSERT INTO sentiment_analysis (stock_id, title, sentiment, score, description, create_date, update_date) VALUES (?, ?, ?, ?, ?, NOW(), NOW())'
      await connection.promise().query(insertQuery, [stockId, title, result.情緒, result.分數, result.說明])
      console.log('Inserted data for title:', title)
    }
  }

  const overallSentiment = sentimentResults['整體']
  if (overallSentiment) {
    const insertOverallQuery = 'INSERT INTO sentiment_analysis (stock_id, title, sentiment, score, description, create_date, update_date) VALUES (?, ?, ?, ?, ?, NOW(), NOW())'
    await connection.promise().query(insertOverallQuery, [stockId, '整體分析', overallSentiment.情緒, overallSentiment.分數, overallSentiment.說明])
    console.log('Inserted overall sentiment analysis')
  }
}

//處理單一股票的函數
async function processStock(stockId, date) {
  const query = 'SELECT title FROM individual_new WHERE stock_id = ? AND create_date >= ? AND create_date < ?'
  const [results] = await connection.promise().query(query, [stockId, date, moment(date).add(1, 'day').format('YYYY-MM-DD')])

  const allTitles = results.map((row) => row.title).join(', ')
  console.log(allTitles)

  const sentimentResults = await getSentimentAnalysis(allTitles)
  await insertSentimentResults(stockId, sentimentResults, allTitles)
}
//主程式
;(async () => {
  const today = moment().format('2023-11-26')
  const stockIds = [2330, 2345] // 示例股票 ID 數組

  try {
    for (const stockId of stockIds) {
      await processStock(stockId, today)
    }
  } catch (err) {
    console.error('Error processing stocks:', err)
  } finally {
    connection.end()
  }
})()
