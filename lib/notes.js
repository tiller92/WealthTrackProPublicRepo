import axios from "axios";
import { ALPHA_API_KEY } from "../secret";

// get the time and date

// pass it to the week day filter function and turn it into the most recent week day that closed
// and then fortmat it then check for holiday 

export async function testAPI() {
    const res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BA&apikey=${ALPHA_API_KEY}`)
    const data = await {...res['data']['Time Series (Daily)'] }
        // for (let i in data) {
        //     if (data[i]['4. close']) {
        //         console.log(data[i]['4. close'])
        //     }
    return data
}