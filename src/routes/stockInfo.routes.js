const express = require('express')
const { stockController } = require('../controllers/index')
const router = express.Router()

/**
 * 獲取股票PB,PE
 *
 * @route api/stock/:stock_id
 * @return - {
 *  stock_id: number
 *  p_e_ratio: number
 *  p_b_ratio: number
 *  date: date
 * }
 */
router.get('/:stock_id', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    let stock_id = req.params.stock_id
    const result = await stockController.getPePbController(stock_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取所有股票資訊
 *
 * @route api/stock/all/info
 * @return {Array} - {
 *  stock_id: number,
 *  name: string,
 *  trade_volume: number,
 *  trade_value: number,
 *  transaction: number,
 *  highest_price: number,
 *  lowest_priceL: number,
 *  opening_price: number,
 *  closing_price: number,
 *  change: number,
 *  date: date
 * }[]
 *
 */
router.get('/all/info/:stock_id', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id ? req.params.stock_id : '1101'
    const result = await stockController.getStockAllInfoController(stock_id)
    response_data.success = true
    response_data.data = result
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股介紹
 * 
 * @route GET api/stock/description/:stock_id
 * @return {array} -
 * {
 *  description: string,
 *  ceo: string,
 *  established_time: string,
 *  headquater: string,
 *  website: string,
 *  staff_number: string,
 *  market_value: string,
 *  dividend_rate: string,
 * }[]

 */
router.get('/description/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getStockDescription(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股新聞
 *
 * @route GET api/stock/news/:stock_id
 * @return {Array} - {
 *  title: string,
 *  time: string,
 *  link: string,
 *  imageSrc: string
 * }[]
 */
router.get('/news/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getStockNews(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股資產負債表資訊(當季)
 *
 * @route GET api/stock/balance_sheet/:stock_id
 * @return {Array} - {
 *  cash_and_short_term_investment: string ,
 *  cash_and_short_term_investment_ycp: string,
 *  total_assets: string,
 *  total_assets_ycp: string,
 *  total_debts: string,
 *  total_debts_ycp: string ,
 *  total_equitys: string,
 *  total_equitys_ycp: string,
 *  tradable_shares: string,
 *  tradable_shares_ycp: string,
 *  pb_ratio: string,
 *  pb_ratio_ycp: string,
 *  roa: string,
 *  roa_ycp: string,
 *  roc: string,
 *  roc_ycp: string,
 *  date: string
 * }[]
 */
// router.get('/balance_sheet/:stock_id', async (req, res, next) => {
//   const response_data = { success: false, data: null, errorMessage: null }
//   try {
//     const stock_id = req.params.stock_id
//     const result = await stockController.getBalanceSheet(stock_id)
//     response_data.data = result
//     response_data.success = true
//     return res.status(200).send(response_data)
//   } catch (error) {
//     next(error)
//   }
// })

/**
 * 獲取個股損益表資訊(當季)
 *
 * @route GET api/stock/income_statement/:stock_id
 * @return {Array} - {
 *  income: string,
 *  income_ycp: string,
 *  operating_expenses: string,
 *  operating_expenses_ycp: string,
 *  net_income: string,
 *  net_income_ycp: string,
 *  net_income_rate: string,
 *  net_income_ycp: string,
 *  eps: string,
 *  eps_ycp: string,
 *  operating_capital_flow: string,
 *  operating_capital_flow_ycp: string,
 *  valid_tax_rate: string,
 *  valid_tax_rate_ycp: string
 *  date
 * }[]
 */
// router.get('/income_statement/:stock_id', async (req, res, next) => {
//   const response_data = { success: false, data: null, errorMessage: null }
//   try {
//     const stock_id = req.params.stock_id
//     const result = await stockController.getIncomeStatement(stock_id)
//     response_data.data = result
//     response_data.success = true
//     return res.status(200).send(response_data)
//   } catch (error) {
//     next(error)
//   }
// })

/**
 * @route GET api/stock/cash_flow_statement/:stock_id
 * @return {Array} - {
 * 獲取個股現金流量表資訊(當季)
 *  net_income: string,
 *  net_income_ycp: string,
 *  operating_cash: string,
 *  operating_cash_ycp: string,
 *  investment_cash: string,
 *  investment_cash_ycp: string,
 *  financing_cash: string,
 *  financing_cash_ycp: string,
 *  net_change_in_cash: string,
 *  net_change_in_cash_ycp: string,
 *  free_cash_flow: string,
 *  free_cash_flow_ycp: string,
 *  date: string
 * }[]
 */
// router.get('/cash_flow_statement/:stock_id', async (req, res, next) => {
//   const response_data = { success: false, data: null, errorMessage: null }
//   try {
//     const stock_id = req.params.stock_id
//     const result = await stockController.getCashFlowStatement(stock_id)
//     response_data.data = result
//     response_data.success = true
//     return res.status(200).send(response_data)
//   } catch (error) {
//     next(error)
//   }
// })

/**
 * 獲取個股歷史財報資料
 *
 * @route GET /api/stock/history/financial_statement/:stock_id
 * @return {Array} - {
 *  year: number,
 *  season: number,
 *  link: string
 * }[]
 */
router.get('/history/financial_statement/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getHistoryFinancialStatement(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股歷史股利政策
 *
 * @route GET /api/stock/history/dividend_policy/:stock_id
 * @return {Array} - {
 *  announcedDate: string,
 *  cashDividend: float,
 *  stockDividend: float,
 *  XDTradingDate: string,
 *  XRTradingDate: string,
 *  cashDividendPaidDate: string,
 *  XDPriceRecoveryDays: string,
 *  payoutType: string
 * }[]
 */
router.get('/history/dividend_policy/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getHistoryDividendPolicy(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股資產資料(年季度)
 * 
 * @route GET /api/stock/financial/assetStatements/:stock_id
 * @return {Array} - {
		year: number // 年
		quarter: number // 季度
		Assets: string // 總資產
		CurrentAssets: string // 流動資產
		LongTermInvestment: string // 長期投資
		ShortTermInvestment: string // 短期投資
		FixedAssets: string // 固定資產
		CashAndCashEquivalents: string // 現金及約當現金
		AccountsAndNotesReceivable: string // 應收帳款及票據
		Inventories: string // 存貨
		ROA: string // ROA
		ROAT4Q: string // 近四季ROA
		CurrentRatio: string // 流動比
		QuickRatio: string // 速動比
		LongTermLiabilitiesRatio: string // 長期資金佔固定資產比率
		AccountsAndNotesReceivableTurnoverRatio: string // 應收帳款周轉
		InventoryTurnoverRatio: string // 存貨週轉
		FixedAssetsTurnoverRatio: string // 固定資產週轉
		AssetsTurnoverRatio: string // 總資產週轉
 * }[]
 */
router.get('/financial/assetStatements/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getAssetStatements(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股負債與股東權益資料(年季度)
 * 
 * @route GET /api/stock/financial/balanceSheetLiabilitiesEquity/:stock_id
 * @return {Array} - {
    "year": number // 年
		"quarter": number // 季度
    "liabilities": string, // 總負債
    "currentLiabilities": string, // 流動負債
    "longTermLiabilities": string, // 長期負債
    "accountsAndNotesPayable": string, // 應付帳款及票據
    "advanceReceipts": string, // 預收款項
    "shortTermBorrowings": string, // 短期借款
    "shortTermNotesAndBillsPayable": string, // 應付短期票券
    "longTermLiabilitiesCurrentPortion": string, // 一年內到期長期負債
    "equity": string, // 淨值
    "commonStocks": string, // 普通股股本
    "retainedEarnings": string, // 保留盈餘
    "nav": string, // 每股淨值
    "roe": string, // ROE
    "roeT4Q": string, // 近四季ROE
    "reinvestmentRate": string, // 盈再率
    "debtRatio": string, // 負債比
    "accountsAndNotesPayableTurnoverDays": string // 應付帳款週轉天數
 * }[]
 */
router.get('/financial/balanceSheetLiabilitiesEquity/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getBalanceSheetLiabilitiesEquity(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股現金流量資料(年季度)
 * 
 * @route GET /api/stock/financial/cashFlowStatement/:stock_id
 * @return {Array} - {
    "year": number // 年
		"quarter": number // 季度
    "depreciation": string, // 折舊
    "amortization": string, // 攤銷
    "operatingCashFlow": string, // 營業現金流
    "investingCashFlow": string, // 投資現金流
    "financingCashFlow": string, // 融資現金流
    "freeCashFlow": string, // 自由現金流
    "netCashFlow": string, // 淨現金流
    "capex": string, // 資本支出
    "operatingCashFlowPerShare": string, // 每股營業現金流入
    "investingCashFlowPerShare": string, // 每股投資現金流出
    "financingCashFlowPerShare": string, // 每股融資現金流入
    "freeCashFlowPerShare": string, // 每股自由現金流入
    "netCashFlowPerShare": string, // 每股淨現金流入
    "interestCoverageRatio": string, // 利息保障倍數
    "operatingCashFlowToCurrentLiabilitiesRatio": string, // 營業現金對流動負債比
    "operatingCashFlowToLiabilitiesRatio": string, // 營業現金對負債比
    "operatingCashFlowToNetIncomeRatio": string // 營業現金對稅後淨利比
 * }[]
 */
router.get('/financial/cashFlowStatement/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getCashFlowStatement(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 獲取個股損益表資料(年季度)
 * 
 * @route GET /api/stock/financial/incomeStatements/:stock_id
 * @return {Array} - {
    "year": number, // 年
    "quarter": number, // 季度
    "revenue": string, // 營收
    "grossProfit": string, // 毛利
    "operatingExpenses": string, // 營業費用
    "sellingExpenses": string, // 銷售費用
    "administrativeExpenses": string, // 管理費用
    "researchAndDevelopmentExpenses": string, // 研發費用
    "operatingIncome": string, // 營業利益
    "profitBeforeTax": string, // 稅前淨利
    "netIncome": string, // 稅後淨利
    "netIncomeAttributableToOwnersOfTheParent": string, // 母公司業主淨利
    "eps": string, // 單季EPS
    "epsQOQ": string, // 單季EPS季增率
    "epsYOY": string, // 單季EPS年增率
    "epsT4Q": string, // 近四季EPS
    "epsT4QAvg": string, // 近四季平均EPS
    "epsT4QQOQ": string, // 近4季EPS季增率
    "epsT4QYOY": string, // 近4季EPS年增率
    "grossMargin": string, // 毛利率
    "operatingMargin": string, // 營業利益率
    "profitBeforeTaxMargin": string, // 稅前淨利率
    "netIncomeMargin": string, // 稅後淨利率
    "incomeTaxToProfitBeforeTaxRatio": string, // 所得稅佔稅前淨利比
    "operatingExpenseRatio": string, // 營業費用率
    "researchAndDevelopmentExpensesToSalesRatio": string, // 研發費用率
    "nonOperatingIncomeToProfitBeforeTax": string, // 業外收支佔稅前淨利比
    "sellingExpensesToSalesRatio": string, // 銷售費用率
    "administrativeExpensesToSalesRatio": string // 管理費用率
 * }[]
 */
router.get('/financial/incomeStatements/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getIncomeStatements(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

router.get('/sentiment_analysis/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getSentimentAnalysis(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 選股政策-負債比率(Warren Buffett debtRatio < 30%)
 * 
 * @route GET /api/stock/picking/debtRatio
 * @return {Array} - {
 * "stock_id": number,
 * "name": string,
 * "ROE": string,
 * "closing_price": string,
 * "eps": string,
 * "epsYoY": string,
 * "link": string
 * }
 */
router.get('/picking/debtRatio/:industry', async (req, res, next) => {
  const industry = req.params.industry
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const result = await stockController.stockPickingDebtRatio(industry)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 選股政策-ROE(/Warren Buffett ROE > 15%)
 * 
 * @route GET /api/stock/picking/Roe
 * @return {Array} - {
 * "stock_id": number,
 * "name": string,
 * "ROE": string,
 * "closing_price": string,
 * "eps": string,
 * "epsYoY": string,
 * "link": string
 * }
 */
router.get('/picking/Roe/:industry', async (req, res, next) => {
  const industry = req.params.industry
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const result = await stockController.stockPickingRoe(industry)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 選股政策-自由現金流(Warren Buffett Free Cash Flow > 0)
 * 
 * @route GET /api/stock/picking/freeCashFlow
 * @return {Array} - {
 * "stock_id": number,
 * "name": string,
 * "ROE": string,
 * "closing_price": string,
 * "eps": string,
 * "epsYoY": string,
 * "link": string
 * }
 */
router.get('/picking/freeCashFlow/:industry', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const industry = req.params.industry
    const result = await stockController.stockPickingFreeCashFlow(industry)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 選股政策-流動比率(Benjamin Graham currentRatio > 200%)
 * 
 * @route GET /api/stock/picking/currentRatio
 * @return {Array} - {
 * "stock_id": number,
 * "name": string,
 * "ROE": string,
 * "closing_price": string,
 * "eps": string,
 * "epsYoY": string,
 * "link": string
 * }
 */
router.get('/picking/currentRatio/:industry', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const industry = req.params.industry
    const result = await stockController.stockPickingCurrentRatio(industry)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

/**
 * 選股政策-EPS(Benjamin Graham eps > 0)
 * 
 * @route GET /api/stock/picking/Eps
 * @return {Array} - {
 * "stock_id": number,
 * "name": string,
 * "ROE": string,
 * "closing_price": string,
 * "eps": string,
 * "epsYoY": string,
 * "link": string
 * }
 */
router.get('/picking/Eps/:industry', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const industry = req.params.industry
    const result = await stockController.stockPickingEps(industry)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
