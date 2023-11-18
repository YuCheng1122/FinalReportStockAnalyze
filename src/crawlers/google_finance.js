const axios = require('axios')
const path = require('path')
const models = require('../models/index2')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const getStockInformation = async (stock_id) => {
  try {
    const response = await axios.get(`https://serpapi.com/search.json?engine=google_finance&hl=zh-tw&q=${stock_id}%3ATPE&api_key=${process.env.SERP_API_KEY}`)
    const result = {
      base_information: response.data.knowledge_graph.key_stats, // 市值等訊息
      about: response.data.knowledge_graph.about, // 簡介
      news: response.data.news_results, // 新聞
      financials: response.data.financials, // 財報資訊(但只能最新一季的)
    }
    return result
  } catch (error) {
    return error
  }
}

const main = async () => {
  const stock_array = [2330 ,2303, 2408, 2454, 3231, 3443]
  // const stock_array = [2408]
  const add_stock_table_value = []
  const insert_income_statement_value = []
  const insert_cash_flow_statement_value = []
  const insert_balance_sheet_value = []
  const insert_individual_new_value = []

  for (let stock_id of stock_array) {
    try {
      // 新增stock欄位值
      // stock_id , description, ceo, established_time, headquater, website ,staff_number, market_value, dividend_rate
      const data = await getStockInformation(stock_id)
      const description = data.about[0].description.snippet ? data.about[0].description.snippet : null
      let ceo = null
      let established_time = null
      let headquater = null
      let website = null
      let staff_number = null
      const market_value = data.base_information.stats[3].value ? data.base_information.stats[3].value : null
      const dividend_rate = data.base_information.stats[5].value ? data.base_information.stats[5].value : null
      for (let item of data.about[0].info) {
        switch (item.label) {
          case '執行長':
            ceo = item.value
            break
          case '成立時間':
            established_time = item.value
            break
          case '總部':
            headquater = item.value
            break
          case '網站':
            website = item.value
            break
          case '員工數':
            staff_number = item.value
            break
          default:
            console.log(item)
        }
      }

      add_stock_table_value.push([description, ceo, established_time, headquater, website, staff_number, market_value, dividend_rate, stock_id])

      // 新增新聞
      for (let item of data.news) {
        // stock_id , title, time, link, imageSrc
        insert_individual_new_value.push([stock_id, item.snippet, item.date, item.link, item.thumbnail])
      }

      // 新增損益表
      // * stock_id
      // * date
      // * income, income_ycp 收益
      // * operating_expenses, operating_expenses_ycp 營業費用
      // * net_income, net_income_ycp 淨利
      // * net_income_rate, net_income_ycp 淨利潤率
      // * eps, eps_ycp 每股盈餘
      // * operating_capital_flow, operating_capital_flow_ycp 營業資金流動
      // * valid_tax_rate, valid_tax_rate_ycp 有效稅率
      // * create_date
      // * update_date
      const income_statement_result = []
      for (let item of data.financials[0].results[0].table) {
        income_statement_result.push(item.value)
        income_statement_result.push(item.change)
      }
      insert_income_statement_value.push([stock_id, data.financials[0].results[0].date, ...income_statement_result])

      // * // 資產負債表
      // * balance_sheet_id
      // * stock_id
      // * date
      // * cash_and_short_term_investment , 現金與短期投資
      // * cash_and_short_term_investment_ycp
      // * total_assets,  總資產
      // * total_assets_ycp
      // * total_debts, 總負債
      // * total_debts_ycp ,
      // * total_equitys, 總權益
      // * total_equitys_ycp
      // * tradable_shares, 流通股份
      // * tradable_shares_ycp
      // * pb_ratio, 股價淨值比
      // * pb_ratio_ycp
      // * roa, 資產報酬率
      // * roa_ycp
      // * roc, 資本報酬率
      // * roc_ycp
      // * create_date
      // * update_date
      const balance_sheet_result = []
      for (let item of data.financials[1].results[0].table) {
        balance_sheet_result.push(item.value)
        balance_sheet_result.push(item.change)
      }
      insert_balance_sheet_value.push([stock_id, data.financials[1].results[0].date, ...balance_sheet_result])

      // * // 現金流量表
      // * cash_flow_statement_id
      // * stock_id
      // * date
      // * net_income, 淨利
      // * net_income_ycp
      // * operating_cash, 營運現金
      // * operating_cash_ycp
      // * investment_cash, 投資現金,
      // *  investment_cash_ycp
      // * financing_cash, 融資現金
      // * financing_cash_ycp ,
      // * net_change_in_cash, 現金變動淨額
      // * net_change_in_cash_ycp
      // * free_cash_flow, 自由現金流
      // * free_cash_flow_ycp
      // * create_date
      // * update_date
      const cash_flow_statement_result = []
      for (let item of data.financials[2].results[0].table) {
        cash_flow_statement_result.push(item.value)
        cash_flow_statement_result.push(item.change)
      }
      insert_cash_flow_statement_value.push([stock_id, data.financials[2].results[0].date, ...cash_flow_statement_result])
    } catch (error) {
      console.log(error)
    }
  }
  try {
    //寫入資料庫
    for (let item of add_stock_table_value) {
      await models.stockModels.updateStockFinanceInfo(item)
    }
    await models.incomeStatementModels.insertData(insert_income_statement_value)
    await models.balanceSheetModels.insertData(insert_balance_sheet_value)
    await models.cashFlowStatementModels.insertData(insert_cash_flow_statement_value)
    await models.individualNewModels.insertData(insert_individual_new_value)
  } catch (error) {
    console.log(error)
  }
}

main()

/**
 * 除了新聞內容外，都不是及時資料，所以跑一次即可，不過歷史財務資訊可以後面再補
 *
 * // 新增stock欄位
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
