const axios = require('axios')
const db = require('')

const getStockInformation = async (stock_id) => {
  try {
    const response = await axios.get(`https://serpapi.com/search.json?engine=google_finance&hl=zh-tw&q=${stock_id}%3ATPE&api_key=10f1c7b7366afdb133bf4283886f1859f7d602074c309ab6c8d318ccbd8ea01b`)
    return {
      base_information: response.data.knowledge_graph.key_stats, // 市值等訊息
      about: response.data.knowledge_graph.about, // 簡介
      news: response.data.news_results, // 新聞
      financials: response.data.financials, // 財報資訊(但只能最新一季的)
    }
  } catch (error) {
    return error
  }
}

/**
 * 除了新聞內容外，都不是及時資料，所以跑一次即可，不過歷史財務資訊可以後面再補
 * 
 * // stock_finance_info
 * stock_finance_info_id,
 * stock_id,
 * description, 
 * ceo, 
 * established_time, 
 * headquater, 
 * website, 
 * staff_number, 
 * market_value, 
 * dividend rate,
 * 
 * 
 * // 損益表
 * income_statement_id
 * stock_id
 * income, income_ycp 收益
 * operating_expenses, operating_expenses_ycp 營業費用
 * net_income, net_income_ycp 淨利
 * net_income_rate, net_income_ycp 淨利潤率
 * eps, eps_ycp 每股盈餘
 * operating_capital_flow, operating_capital_flow_ycp 營業資金流動
 * valid_tax_rate, valid_tax_rate_ycp 有效稅率
 * date
 * create_date
 * update_date
 * 
 * // 資產負債表
 * balance_sheet_id
 * stock_id
 * cash_and_short_term_investment , 現金與短期投資
 * cash_and_short_term_investment_ycp 
 * total_assets,  總資產
 * total_assets_ycp
 * total_debts, 總負債
 * total_debts_ycp ,
 * total_equitys, 總權益
 * total_equitys_ycp 
 * tradable_shares, 流通股份
 * tradable_shares_ycp 
 * pb_ratio, 股價淨值比
 * pb_ratio_ycp
 * roa, 資產報酬率
 * roa_ycp
 * roc, 資本報酬率
 * roc_ycp
 * date
 * create_date
 * update_date
 * 
 * // 現金流量表
 * cash_flow_statement_id
 * stock_id
 * net_income, 淨利
 * net_income_ycp 
 * operating_cash, 營運現金
 * operating_cash_ycp 
 * investment_cash, 投資現金,
 *  investment_cash_ycp 
 * financing_cash, 融資現金
 * financing_cash_ycp ,
 * net_change_in_cash, 現金變動淨額
 * net_change_in_cash_ycp 
 * free_cash_flow, 自由現金流
 * free_cash_flow_ycp  
 * date
 * create_date
 * update_date
 * 
 * // individual_new
 * new_id
 * stock_id
 * title,
 * time,
 * link,
 * imageSrc
 * create_date,
 * update_date 
 */

const main = () => {
  const stock_array = [2330, 2303, 2408, 2454, 3231, 3443]
  for (let stock_id in stock_array) {
    getStockInformation(stock_id)
      .then((data) => {
        console.log(
          {
            簡介: data.about[0].description.snippet,
            執行長: data.about[0].info[0].value,
            成立時時間:  data.about[0].info[1].value,
            總部:  data.about[0].info[2].value,
            網站:  data.about[0].info[3].value,
            員工數:  data.about[0].info[4].value,
            市值: data.base_information.stats[3].value,
            股利收益率: data.base_information.stats[5].value,
            財務資訊: data.financials,
            新聞內容: data.news,
          }
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()
