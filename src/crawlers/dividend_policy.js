const axios = require('axios')
const { insertData } = require('../models/index2').dividendPolicyModels

const getData = async (stock_id) => {
  try {
    const response = await axios.get(`https://statementdog.com/api/v2/fundamentals/${stock_id}/2019/2023/cf?qbu=true&qf=analysis`)
    const dividend_policy_datas = response.data.dividend_policy.data
    const res = []
    for (let data of dividend_policy_datas) {
      res.push([stock_id, data.announcedDate, data.cashDividend, data.stockDividend, data.XDTradingDate, data.XRTradingDate, data.cashDividendPaidDate, data.XDPriceRecoveryDays, data.payoutType])
    }
    return res
  } catch (error) {
    throw error
  }
}

const main = async () => {
  const stock_id_array = ['2408', '2454', '3231', '3443', '2912', '3008', '3045', '4904', '4938', '6505', '9904', '1227', '1319', '1440', '1477', '1504', '1536', '1605', '1707', '1717', '1722', '1723', '1789', '1802', '2015', '2049', '2059', '2101', '2103', '2106', '2201', '2204', '2206', '2231', '2313', '2327', '2345', '2347', '2352', '2353', '2355', '2356', '2360', '2362', '2376', '2377', '2379', '2383', '2385', '2392', '2408', '2449', '2451', '2498', '2542', '2603', '2609', '2610', '2615', '2618', '2707', '2809', '2812', '2867', '2903', '2915', '3034', '3037', '3044', '3189', '3231', '3682', '4958', '5522', '6176', '6239', '6269', '6285', '6414', '6456', '8150', '8454', '8464', '9907', '9910', '9917', '9921', '9933', '9938', '9945', '1101', '1102', '1216', '1301', '1303', '1326', '1402', '1476', '2002', '2105', '2207', '2301', '2303', '2308', '2317', '2324', '2330', '2354', '2357', '2382', '2395', '2408', '2409', '2412', '2474']
  for (let stock_id of stock_id_array) {
    try {
      const insertValues = await getData(stock_id)
      await insertData(insertValues)
      // 寫入資料庫
    } catch (error) {
      console.log(stock + ': ' + error)
    }
  }
}

main()
