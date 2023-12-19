const { stockModels, individualNewModels, financialStatementModels, dividendPolicyModels, assetStatementsModels, balanceSheetLiabilitiesEquityModels, incomeStatementsModels, cashFlowStatementModels, sentimentAnalysisModels, investmentTechModels } = require('../models/index2')
const { AppError } = require('../config/error_classes')

/**
 * 函数“getStockAllInfoController”检索股票信息并处理发生的任何错误。
 * @returns stockInfo 变量，它是从 stockModels 模块调用 getStockAllInfo 函数的结果。
 */
const getStockAllInfoController = async (stock_id) => {
  try {
    const stockInfo = await stockModels.getStockAllInfo(stock_id)
    return stockInfo
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'createComment', 3)
    }
  }
}

/**
 * 函数“getPePbController”检索给定股票 ID 的 PE 和 PB 比率。
 * @param stock_id - stock_id 参数是特定股票的标识符。它用于检索该股票的 PE（市盈率）和 PB（市净率）比率。
 * @returns 函数“getPePbController”返回“stockInfo”对象。
 */
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

/**
 * 函数“getStockNews”是一个异步函数，用于检索给定股票 ID 的股票新闻数据。
 * @param stock_id - stock_id 参数是特定股票的标识符。它用于检索与该特定股票相关的新闻。
 * @returns 函数“getStockNews”返回“individualNewModels.getData(stock_id)”函数调用的结果。
 */
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

// const getBalanceSheet = async (stock_id) => {
//   try {
//     const result = await balanceSheetModels.getData(stock_id)
//     return result
//   } catch (error) {
//     if (error.source === 'SqlError') {
//       throw error
//     } else {
//       throw new AppError(error, 'ControllerError', 'getBalanceSheet', 3)
//     }
//   }
// }

// const getIncomeStatement = async (stock_id) => {
//   try {
//     const result = await incomeStatementModels.getData(stock_id)
//     return result
//   } catch (error) {
//     if (error.source === 'SqlError') {
//       throw error
//     } else {
//       throw new AppError(error, 'ControllerError', 'getCashFlowStatement', 3)
//     }
//   }
// }

// const getCashFlowStatement = async (stock_id) => {
//   try {
//     const result = await cashFlowStatementModels.getData(stock_id)
//     return result
//   } catch (error) {
//     if (error.source === 'SqlError') {
//       throw error
//     } else {
//       throw new AppError(error, 'ControllerError', 'getCashFlowStatement', 3)
//     }
//   }
// }

/**
 * 函数“getHistoryFinancialStatement”检索给定股票 ID 的历史财务报表。
 * @param stock_id - stock_id 参数是我们要检索其财务报表历史记录的特定股票的标识符。
 * @returns 函数“getHistoryFinancialStatement”返回“financialStatementModels.getData(stock_id)”函数调用的结果。
 */
const getHistoryFinancialStatement = async (stock_id) => {
  try {
    const results = await financialStatementModels.getData(stock_id)
    return results
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getHistoryFinancialStatement', 3)
    }
  }
}

const getHistoryDividendPolicy = async (stock_id) => {
  try {
    const result = await dividendPolicyModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getHistoryDividendPolicy', 3)
    }
  }
}

const getAssetStatements = async (stock_id) => {
  try {
    const result = await assetStatementsModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getAssetStatements', 3)
    }
  }
}

/**
 * 函数“getIncomeStatements”检索给定股票 ID 的损益表数据。
 * @param stock_id - stock_id 参数是特定股票的标识符。它用于检索该特定股票的损益表数据。
 * @returns 函数“getIncomeStatements”返回“incomeStatementsModels.getData(stock_id)”函数调用的结果。
 */
const getIncomeStatements = async (stock_id) => {
  try {
    const result = await incomeStatementsModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getIncomeStatementsModels', 3)
    }
  }
}

/**
 * 函数“getBalanceSheetLiabilityEquity”从资产负债表负债和权益模型中检索给定股票 ID 的数据。
 * @param stock_id - stock_id 参数用于标识我们要检索其资产负债表负债和权益数据的特定股票。
 * @returns
 * 函数“getBalanceSheetLiabilitiesEquity”返回“balanceSheetLiabilitiesEquityModels.getData(stock_id)”函数调用的结果。
 */
const getBalanceSheetLiabilitiesEquity = async (stock_id) => {
  try {
    const result = await balanceSheetLiabilitiesEquityModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getBalanceSheetLiabilitiesEquity', 3)
    }
  }
}

/**
 * getCashFlowStatement 函数检索给定股票 ID 的现金流量表数据。
 * @param stock_id - stock_id 参数是特定股票的标识符。它用于检索该特定股票的现金流量表数据。
 * @returns 函数“getCashFlowStatement”返回“cashFlowStatementModels.getData(stock_id)”函数调用的结果。
 */
const getCashFlowStatement = async (stock_id) => {
  try {
    const result = await cashFlowStatementModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getCashFlowStatementModels', 3)
    }
  }
}

/**
 * 函数“getSentimentAnalysis”是一个异步函数，用于检索给定股票 ID 的情绪分析数据。
 * @param stock_id - stock_id 参数是特定股票的标识符。它用于检索该特定股票的情绪分析数据。
 * @returns 函数“getSentimentAnalysis”返回“sentimentAnalysisModels.getData(stock_id)”函数调用的结果。
 */
const getSentimentAnalysis = async (stock_id) => {
  try {
    const result = await sentimentAnalysisModels.getData(stock_id)
    return result
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'getSentimentAnalysis', 3)
    }
  }
}

const stockPickingDebtRatio = async (industry) => {
  try {
    const result = await investmentTechModels.getFinancialData(industry)
    return result
  } catch (error) {
    throw error
  }
}

const stockPickingRoe = async (industry) => {
  try {
    const result = await investmentTechModels.getHighROEFinancialData(industry)
    return result
  } catch (error) {
    throw error
  }
}

const stockPickingFreeCashFlow = async (industry) => {
  try {
    const result = await investmentTechModels.getPositiveCashFlowData(industry)
    return result
  } catch (error) {
    throw error
  }
}

const stockPickingCurrentRatio = async (industry) => {
  try {
    const result = await investmentTechModels.getFinancialDataWithCurrentRatio(industry)
    return result
  } catch (error) {
    throw error
  }
}

const stockPickingEps = async (industry) => {
  try {
    const result = await investmentTechModels.getFinancialData2023Q3(industry)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = { getPePbController, getStockAllInfoController, getStockDescription, getStockNews, getHistoryFinancialStatement, getHistoryDividendPolicy, getAssetStatements, getIncomeStatements, getBalanceSheetLiabilitiesEquity, getCashFlowStatement, getSentimentAnalysis, stockPickingDebtRatio, stockPickingRoe, stockPickingFreeCashFlow, stockPickingCurrentRatio, stockPickingEps }
