const axios = require('axios');

const fetchStockData = async (year, month, stockId) => {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${year}${String(month).padStart(2, '0')}01&stockNo=${stockId}`;
  try {
    const response = await axios.get(url);
    if (response.data.stat === 'OK') {
      console.log(`Data for ${year}-${String(month).padStart(2, '0')}:`, response.data.data);
    } else {
      console.log(`Failed to fetch data for ${year}-${String(month).padStart(2, '0')}`);
    }
  } catch (error) {
    console.error(`Error fetching data for ${year}-${String(month).padStart(2, '0')}:`, error);
  }
};

const fetchYearlyData = async (year, stockId) => {
  for (let month = 1; month <= 12; month++) {
    await fetchStockData(year, month, stockId);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 5-second delay
  }
};

fetchYearlyData(2023, '0050');