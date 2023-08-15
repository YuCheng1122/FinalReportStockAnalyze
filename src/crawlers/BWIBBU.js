const axios = require('axios');

const API_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL';

async function fetchData() {
    try {
        const response = await axios.get(API_URL);
        
        // 打印完整回應
        console.log(`Response from API:`, response.data);

        const data = response.data;

        if (data && data.data) {
            const results = data.data.map(item => {
                return {
                    Code: item[0],
                    Name: item[1],
                    PEratio: item[2],
                    DividendYield: item[3],
                    PBratio: item[4]
                };
            });

            console.log(results);
            return results;
        } else {
            console.error('No data found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

fetchData();
