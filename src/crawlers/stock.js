const axios = require("axios");

//台灣前一百五的上市公司
const stockCodes = [
  "1101",
  "1102",
  "1216",
  "1301",
  "1303",
  "1326",
  "1402",
  "1476",
  "2002",
  "2105",
  "2207",
  "2301",
  "2303",
  "2308",
  "2311",
  "2317",
  "2324",
  "2325",
  "2330",
  "2354",
  "2357",
  "2382",
  "2395",
  "2408",
  "2409",
  "2412",
  "2474",
  "2801",
  "2880",
  "2881",
  "2882",
  "2883",
  "2884",
  "2885",
  "2886",
  "2887",
  "2890",
  "2891",
  "2892",
  "2912",
  "3008",
  "3045",
  "3474",
  "4904",
  "4938",
  "5880",
  "6505",
  "9904",
  "1227",
  "1262",
  "1319",
  "1440",
  "1477",
  "1504",
  "1536",
  "1589",
  "1590",
  "1605",
  "1704",
  "1707",
  "1717",
  "1722",
  "1723",
  "1789",
  "1802",
  "2015",
  "2049",
  "2059",
  "2101",
  "2103",
  "2106",
  "2201",
  "2204",
  "2206",
  "2231",
  "2313",
  "2327",
  "2345",
  "2347",
  "2352",
  "2353",
  "2355",
  "2356",
  "2360",
  "2362",
  "2376",
  "2377",
  "2379",
  "2383",
  "2385",
  "2392",
  "2408",
  "2448",
  "2449",
  "2451",
  "2498",
  "2542",
  "2603",
  "2609",
  "2610",
  "2615",
  "2618",
  "2707",
  "2809",
  "2812",
  "2823",
  "2834",
  "2845",
  "2849",
  "2867",
  "2888",
  "2903",
  "2915",
  "3034",
  "3037",
  "3044",
  "3189",
  "3231",
  "3673",
  "3682",
  "4958",
  "5264",
  "5522",
  "5871",
  "6176",
  "6239",
  "6269",
  "6285",
  "6414",
  "6415",
  "6452",
  "6456",
  "8150",
  "8454",
  "8464",
  "9907",
  "9910",
  "9914",
  "9917",
  "9921",
  "9933",
  "9938",
  "9945",
];
//證交所API
const API_URL = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL";

async function fetchStockData(stockCode) {
  try {
    const response = await axios.get(`${API_URL}?stockNo=${stockCode}`);
    console.log(`Response for stock code ${stockCode}:`, response.data); // 打印完整回應

    const data = response.data;

    if (data && data.data) {
      return data.data.map((stock) => {
        // ... (保持不變)
      });
    } else {
      console.error(`No data found for stock code: ${stockCode}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching data for stock code: ${stockCode}`, error);
    return [];
  }
}

async function main() {
  const allStocks = [];

  for (const stockCode of stockCodes) {
    const stockData = await fetchStockData(stockCode);
    allStocks.push(...stockData);
  }

  console.log(allStocks);
  return allStocks; // 確保返回 allStocks
}

main();
//導出
module.exports = main;
