const { 
  stockModels, 
  incomeStatementModels, 
  balanceSheetModels, 
  cashFlowStatementModels, 
  individualNewModels, 
  financialStatementModels,
  dividendPolicyModels
} = require('../models/index2')
const { AppError } = require('../config/error_classes')

const getStockAllInfoController = async () => {
  try {
    const stockInfo = await stockModels.getStockAllInfo()
    return stockInfo
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}

const getPePbController = async (stock_id) => {
  try {
    const stockInfo = await stockModels.getStockPePb(stock_id)
    return stockInfo
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}

const getStockDescription = async (stock_id) => {
  try {
    const result = await stockModels.getStockDescription(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getBalanceSheet', 3)
    }
  }
}

const getStockNews = async (stock_id) => {
  try {
    const result = await individualNewModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getBalanceSheet', 3)
    }
  }
}

const getBalanceSheet = async (stock_id) => {
  try {
    const result = await balanceSheetModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getBalanceSheet', 3)
    }
  }
}

const getIncomeStatement = async (stock_id) => {
  try {
    const result = await incomeStatementModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getCashFlowStatement', 3)
    }
  }
}

const getCashFlowStatement = async (stock_id) => {
  try {
    const result = await cashFlowStatementModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getCashFlowStatement', 3)
    }
  }
}

const getHistoryFinancialStatement = async(stock_id) => {
  try{
    const results = await financialStatementModels.getData(stock_id)
    return results
  }catch(error){
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getHistoryFinancialStatement', 3)
    }
  }
}

const getHistoryDividendPolicy = async(stock_id) => {
  try{
    const result = await dividendPolicyModels.getData(stock_id)
    return result
  }catch(error){
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getHistoryDividendPolicy', 3)
    }
  }
}

module.exports = { getPePbController, getStockAllInfoController, getStockDescription, getBalanceSheet, getIncomeStatement, getCashFlowStatement, getStockNews, getHistoryFinancialStatement, getHistoryDividendPolicy }
