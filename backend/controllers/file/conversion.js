const axios = require('axios');
const { convertJsonToUbl } = require('./jsonToUbl');

async function convertPdfToJson(fileBuffer) {
    try {
        
        // Convert the binary file data to base64
        const fileBase64 = fileBuffer.toString("base64");

        let data = JSON.stringify({
            file_data: fileBase64,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api.veryfi.com/api/v7/partner/documents/",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "CLIENT-ID": "vrfCYzUE2vEN62oSAYwEHI8T1jKkrL8tg9mV3Hs",
                AUTHORIZATION: "apikey bzzzz19322:1cfbc7dece83885ec58faf4349be26bd",
                "X-Veryfi-Client-Id": "vrfCYzUE2vEN62oSAYwEHI8T1jKkrL8tg9mV3Hs",
                "X-Veryfi-Client-Secret": "xPVk82Ti2yHUOHsS0ns002LoFHybvJ7WWHvkT8Hoa2ucgkiC6T9ovFSvGRotehXT2DWuj7XR3vIxfeh88u5MXEdugJ6VwE52DdynPjMCZja1xcG3XWpL1jeylgnAu1jt",
            },
            data: data,
        };

        const response = await axios(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    convertPdfToJson,
    convertJsonToUbl
};