const axios = require('axios');

const API_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap14_L';

async function fetchData() {
    try {
        const response = await axios.get(API_URL);
        
        const data = response.data;

        if (data && Array.isArray(data)) {
            const results = data.map(item => {
                return {
                    "出表日期": item["出表日期"],
                    "年度": item["年度"],
                    "季別": item["季別"],
                    "公司代號": item["公司代號"],
                    "公司名稱": item["公司名稱"],
                    "產業別": item["產業別"],
                    "基本每股盈餘(元)": item["基本每股盈餘(元)"],
                    "普通股每股面額": item["普通股每股面額"],
                    "營業收入": item["營業收入"],
                    "營業利益": item["營業利益"],
                    "營業外收入及支出": item["營業外收入及支出"],
                    "稅後淨利": item["稅後淨利"]
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
