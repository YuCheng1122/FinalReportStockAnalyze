const axios = require('axios')
const { assetStatementsModels,balanceSheetLiabilitiesEquityModels,incomeStatementsModels,cashFlowStatementModels } = require('../models/index2')

const getData = async (stock_id) => {
  try {
    const response = await axios.get(`https://statementdog.com/api/v2/fundamentals/${stock_id}/2019/2023/cf?qbu=true&qf=analysis`)
    const datas = response.data.quarterly
    const map = {
      0:{year: 2019 , quarter: 1},
      1:{year: 2019 , quarter: 2},
      2:{year: 2019 , quarter: 3},
      3:{year: 2019 , quarter: 4},
      4:{year: 2020 , quarter: 1},
      5:{year: 2020 , quarter: 2},
      6:{year: 2020 , quarter: 3},
      7:{year: 2020 , quarter: 4},
      8:{year: 2021 , quarter: 1},
      9:{year: 2021 , quarter: 2},
      10:{year: 2021 , quarter: 3},
      11:{year: 2021 , quarter: 4},
      12:{year: 2022 , quarter: 1},
      13:{year: 2022 , quarter: 2},
      14:{year: 2022 , quarter: 3},
      15:{year: 2022 , quarter: 4},
      16:{year: 2023 , quarter: 1},
      17:{year: 2023 , quarter: 2},
      18:{year: 2023 , quarter: 3}
    }
    const res = {
      assetStatements: [],
      balanceSheetLiabilitiesEquity: [],
      incomeStatements: [],
      cashFlowStatement: []
    }

    Object.keys(map).forEach((key) => {
      // assetStatements
      res.assetStatements.push(
        [
          stock_id,
          datas.Assets.data[key][1],
          datas.CurrentAssets.data[key][1],
          datas.LongTermInvestment.data[key][1],
          datas.ShortTermInvestment.data[key][1],
          datas.FixedAssets.data[key][1],
          datas.CashAndCashEquivalents.data[key][1],
          datas.AccountsAndNotesReceivable.data[key][1],
          datas.Inventories.data[key][1],
          datas.ROA.data[key][1],
          datas.ROAT4Q.data[key][1],
          datas.CurrentRatio.data[key][1],
          datas.QuickRatio.data[key][1],
          datas.LongTermLiabilitiesRatio.data[key][1],
          datas.AccountsAndNotesReceivableTurnoverRatio.data[key][1],
          datas.InventoryTurnoverRatio.data[key][1],
          datas.FixedAssetsTurnoverRatio.data[key][1],
          datas.AssetsTurnoverRatio.data[key][1],
          map[key].year,
          map[key].quarter
        ]
      )

      // balanceSheetLiabilitiesEquity
      res.balanceSheetLiabilitiesEquity.push(
        [
          stock_id,
          datas.Liabilities.data[key][1],
          datas.CurrentLiabilities.data[key][1],
          datas.LongTermLiabilities.data[key][1],
          datas.AccountsAndNotesPayable.data[key][1],
          datas.AdvanceReceipts.data[key][1],
          datas.ShortTermBorrowings.data[key][1],
          datas.ShortTermNotesAndBillsPayable.data[key][1],
          datas.LongTermLiabilitiesCurrentPortion.data[key][1],
          datas.Equity.data[key][1],
          datas.CommonStocks.data[key][1],
          datas.RetainedEarnings.data[key][1],
          datas.NAV.data[key][1],
          datas.ROE.data[key][1],
          datas.ROET4Q.data[key][1],
          datas.ReinvestmentRate.data[key][1],
          datas.DebtRatio.data[key][1],
          datas.AccountsAndNotesPayableTurnoverDays.data[key][1],
          map[key].year,
          map[key].quarter
        ]
      )

      // incomeStatements
      res.incomeStatements.push(
        [
          stock_id,
          datas.Revenue.data[key][1],
          datas.GrossProfit.data[key][1],
          datas.OperatingExpenses.data[key][1],
          datas.SellingExpenses.data[key][1],
          datas.AdministrativeExpenses.data[key][1],
          datas.ResearchAndDevelopmentExpenses.data[key][1],
          datas.OperatingIncome.data[key][1],
          datas.ProfitBeforeTax.data[key][1],
          datas.NetIncome.data[key][1],
          datas.NetIncomeAttributableToOwnersOfTheParent.data[key][1],
          datas.EPS.data[key][1],
          datas.EPSQOQ.data[key][1],
          datas.EPSYOY.data[key][1],
          datas.EPST4Q.data[key][1],
          datas.EPST4QAvg.data[key][1],
          datas.EPST4QQOQ.data[key][1],
          datas.EPST4QYOY.data[key][1],
          datas.GrossMargin.data[key][1],
          datas.OperatingMargin.data[key][1],
          datas.ProfitBeforeTaxMargin.data[key][1],
          datas.NetIncomeMargin.data[key][1],
          datas.IncomeTaxToProfitBeforeTaxRatio.data[key][1],
          datas.OperatingExpenseRatio.data[key][1],
          datas.ResearchAndDevelopmentExpensesToSalesRatio.data[key][1],
          datas.NonOperatingIncomeToProfitBeforeTax.data[key][1],
          datas.SellingExpensesToSalesRatio.data[key][1],
          datas.AdministrativeExpensesToSalesRatio.data[key][1],
          map[key].year,
          map[key].quarter
        ]
      )

      // cashFlowStatement
      res.cashFlowStatement.push(
        [
          stock_id,
          datas.Depreciation.data[key][1],
          datas.Amortization.data[key][1],
          datas.OperatingCashFlow.data[key][1],
          datas.InvestingCashFlow.data[key][1],
          datas.FinancingCashFlow.data[key][1],
          datas.FreeCashFlow.data[key][1],
          datas.NetCashFlow.data[key][1],
          datas.CAPEX.data[key][1],
          datas.OperatingCashFlowPerShare.data[key][1],
          datas.InvestingCashFlowPerShare.data[key][1],
          datas.FinancingCashFlowPerShare.data[key][1],
          datas.FreeCashFlowPerShare.data[key][1],
          datas.NetCashFlowPerShare.data[key][1],
          datas.InterestCoverageRatio.data[key][1],
          datas.OperatingCashFlowToCurrentLiabilitiesRatio.data[key][1],
          datas.OperatingCashFlowToLiabilitiesRatio.data[key][1],
          datas.OperatingCashFlowToNetIncomeRatio.data[key][1],
          map[key].year,
          map[key].quarter
        ]
      )
    })
    
    return res
  } catch (error) {
    throw error
  }
}

const main = async () => {
  const stock_id_array = ['6505', '9904', '1227', '1319', '1440', '1477', '1504', '1536', '1605', '1707', '1717', '1722', '1723', '1789', '1802', '2015', '2049', '2059', '2101', '2103', '2106', '2201', '2204', '2206', '2231', '2313', '2327', '2345', '2347', '2352', '2353', '2355', '2356', '2360', '2362', '2376', '2377', '2379', '2383', '2385', '2392', '2408', '2449', '2451', '2498', '2542', '2603', '2609', '2610', '2615', '2618', '2707', '2809', '2812', '2867', '2903', '2915', '3034', '3037', '3044', '3189', '3231', '3682', '4958', '5522', '6176', '6239', '6269', '6285', '6414', '6456', '8150', '8454', '8464', '9907', '9910', '9917', '9921', '9933', '9938', '9945', '1101', '1102', '1216', '1301', '1303', '1326', '1402', '1476', '2002', '2105', '2207', '2301', '2303', '2308', '2317', '2324', '2330', '2354', '2357', '2382', '2395', '2408', '2409', '2412', '2474']
  // const stock_id_array = ['2408', '2454', '3231', '3443', '2912', '3008', '3045', '4904', '4938']
  for (let stock_id of stock_id_array) {
    try {
      const response = await getData(stock_id)
      await assetStatementsModels.insertData(response.assetStatements)
      await balanceSheetLiabilitiesEquityModels.insertData(response.balanceSheetLiabilitiesEquity)
      await incomeStatementsModels.insertData(response.incomeStatements)
      await cashFlowStatementModels.insertData(response.cashFlowStatement)
    } catch (error) {
      console.log(stock_id + ': ' + error)
    }
  }
}

main()


/**
 * 損益表 incomeStatement
 * 
 * 營收: Revenue
 * 毛利: GrossProfit
 * 營業費用: OperatingExpenses
 * 銷售費用: SellingExpenses
 * 管理費用: AdministrativeExpenses
 * 研發費用: ResearchAndDevelopmentExpenses
 * 營業利益: OperatingIncome
 * 稅前淨利: ProfitBeforeTax
 * 稅後淨利: NetIncome
 * 母公司業主淨利: NetIncomeAttributableToOwnersOfTheParent
 * 單季EPS: EPS
 * 單季EPS季增率:EPSQOQ
 * 單季EPS年增率: EPSYOY
 * 近四季EPS: EPST4Q
 * 近四季平均EPS:EPST4QAvg
 * 近4季EPS季增率: EPST4QQOQ
 * 近4季EPS年增率: EPST4QYOY
 * 毛利率: GrossMargin
 * 營業利益率: OperatingMargin
 * 稅前淨利率: ProfitBeforeTaxMargin
 * 稅後淨利率:NetIncomeMargin
 * 所得稅佔稅前淨利比: IncomeTaxToProfitBeforeTaxRatio
 * 營業費用率: OperatingExpenseRatio
 * 研發費用率: ResearchAndDevelopmentExpensesToSalesRatio
 * 業外收支佔稅前淨利比: NonOperatingIncomeToProfitBeforeTax
 * 銷售費用率: SellingExpensesToSalesRatio
 * 管理費用率: AdministrativeExpensesToSalesRatio
 * 
 */


/**
 * 資產 assetStatement
 * 
 * 總資產: Assets
 * 流動資產: CurrentAssets
 * 長期投資: LongTermInvestment
 * 短期投資: ShortTermInvestment
 * 固定資產: FixedAssets 
 * 現金及約當現金: CashAndCashEquivalents
 * 應收帳款及票據: AccountsAndNotesReceivable
 * 存貨: Inventories
 * ROA: ROA
 * 近四季ROA: ROAT4Q
 * 流動比: CurrentRatio
 * 速動比: QuickRatio
 * 長期資金佔固定資產比率: LongTermLiabilitiesRatio
 * 應收帳款周轉: AccountsAndNotesReceivableTurnoverRatio
 * 存貨週轉: InventoryTurnoverRatio
 * 固定資產週轉: FixedAssetsTurnoverRatio
 * 總資產週轉: AssetsTurnoverRatio
 * 
 */


/**
 * 負債與股東權益 balanceSheetLiabilitiesEquity
 * 
 * 總負債: Liabilities
 * 流動負債: CurrentLiabilities
 * 長期負債: LongTermLiabilities
 * 應付帳款及票據: AccountsAndNotesPayable
 * 預收款項: AdvanceReceipts
 * 短期借款: ShortTermBorrowings
 * 應付短期票券: ShortTermNotesAndBillsPayable
 * 一年內到期長期負債: LongTermLiabilitiesCurrentPortion
 * 淨值: Equity
 * 普通股股本: CommonStocks
 * 保留盈餘: RetainedEarnings
 * 每股淨值: NAV
 * ROE: ROE
 * 近四季ROE: ROET4Q
 * 盈再率: ReinvestmentRate
 * 負債比: DebtRatio
 * 應付帳款週轉天數: AccountsAndNotesPayableTurnoverDays
 */


/**
 * 現金流量表 cashFlowStatement
 * 
 * 折舊: Depreciation
 * 攤銷: Amortization
 * 營業現金流: OperatingCashFlow
 * 投資現金流: InvestingCashFlow
 * 融資現金流: FinancingCashFlow
 * 自由現金流: FreeCashFlow
 * 淨現金流: NetCashFlow
 * 資本支出: CAPEX
 * 每股營業現金流入: OperatingCashFlowPerShare
 * 每股投資現金流出: InvestingCashFlowPerShare
 * 每股融資現金流入: FinancingCashFlowPerShare
 * 每股自由現金流入: FreeCashFlowPerShare
 * 每股淨現金流入: NetCashFlowPerShare
 * 利息保障倍數: InterestCoverageRatio
 * 營業現金對流動負債比: OperatingCashFlowToCurrentLiabilitiesRatio
 * 營業現金對負債比: OperatingCashFlowToLiabilitiesRatio
 * 營業現金對稅後淨利比: OperatingCashFlowToNetIncomeRatio
 * 
 */


/**
 * 其餘
 * 
 * 單季營收季增率: RevenueQOQ
 * 單季營收年增率: RevenueYOY
 * 近4季營收季增率: RevenueT4QQOQ
 * 近4季營收年增率: RevenueT4QYOY
 * 單季毛利年增率: GrossProfitYOY
 * 近4季毛利季增率: GrossProfitT4QQOQ
 * 近4季毛利年增率: GrossProfitT4QYOY
 * 單季營業利益季增率: OperatingIncomeQOQ
 * 單季營業利益年增率: OperatingIncomeYOY
 * 近4季營業利益季增率: OperatingIncomeT4QQOQ
 * 近4季營業利益年增率: OperatingIncomeT4QYOY
 * 單季稅後淨利季增率: NetIncomeQOQ
 * 單季稅後淨利年增率: NetIncomeYOY
 * 近4季稅後淨利季增率: NetIncomeT4QQOQ
 * 近4季稅後淨利年增率: NetIncomeT4QYOY
 * 單季每股營業利益季增率: OperatingIncomePerShareQOQ
 * 單季每股營業利益年增率: OperatingIncomePerShareYOY
 * 近4季每股營業利益季增率: OperatingIncomePerShareT4QQOQ
 * 近4季每股營業利益年增率: OperatingIncomePerShareT4QYOY
 * 單季每股營收年增率: RevenuePerShareYOY
 * 近4季每股營收年增率: RevenuePerShareT4QYOY
 */
