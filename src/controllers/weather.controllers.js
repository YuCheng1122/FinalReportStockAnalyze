const { stockModels } = require('../models/index2')
const { AppError } = require('../config/error_classes')

const predictStock = async (type, stock_id) => {
  try {
    // 取 stock_id 的基本資料
    const stockinfo = await stockModels.getStockInfo(stock_id)

    // 取 stock 的週漲跌幅
    const stock_data_week = await stockModels.getChangeOfWeek(stock_id)
    const change_week = (((stock_data_week[0].closing_price - stock_data_week[stock_data_week.length - 1].closing_price) / stock_data_week[stock_data_week.length - 1].closing_price).toFixed(4) * 100).toFixed(2)

    // 抓取計算CC的原始數據
    const analysis_data = await stockModels.selectWeatherWithStock(type, stock_id)
    const tag = type === 'sunny' || type === 'cloudy' ? 'status' : type === 'rainny'? 'precipitation': type
    const independent_datas = analysis_data.map((item) => Number(item[tag]))
    const dependent_datas = analysis_data.map((item) => Number(item.closing_price))

    // 取分析資料 (回歸線性分析)
    // const analysis_data = await weatherAnaly.simpleLinearRegression(type, stock_id)

    // 回傳
    return ({
      stockinfo: {
        ...stockinfo,
        change_week,
      },
      independent_datas,
      dependent_datas,
    })
  } catch (error) {
    if (error.source === 'SqlError') {
      throw error
    } else {
      throw new AppError(error, 'ControllerError', 'predictStock', 3)
    }
  }
}

module.exports = { predictStock }
