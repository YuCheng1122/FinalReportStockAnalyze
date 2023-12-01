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
router.get('/all/info', async (req, res, next) => {
  let response_data = { success: false, data: null, errorMessage: null }
  try {
    const result = await stockController.getStockAllInfoController()
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
router.get('/balance_sheet/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getBalanceSheet(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

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
router.get('/income_statement/:stock_id', async (req, res, next) => {
  const response_data = { success: false, data: null, errorMessage: null }
  try {
    const stock_id = req.params.stock_id
    const result = await stockController.getIncomeStatement(stock_id)
    response_data.data = result
    response_data.success = true
    return res.status(200).send(response_data)
  } catch (error) {
    next(error)
  }
})

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
router.get('/cash_flow_statement/:stock_id', async (req, res, next) => {
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

module.exports = router
