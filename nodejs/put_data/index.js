var request = require('request'); 
//const cheerio = require('cheerio')
const baseUrl = "https://free-api.heweather.net/s6/weather/hourly?location=beijing&key=88f9a4ff885d49a0886f9e681cc92c00";
 

function startReq(url) {
    request(url, function (error, response, body) {
        console.log(body)
        // const $ = cheerio.load(body); // 这里可以获取当前url的页面的html
        // const data = $('h4 > a');
        // data.map((k) => {
        //     const title = data[k].children[0].next.next.data;
        //     // console.log('data[k]------------->', data[k].children[0].next.next);
        //     console.log(title);
        // })
    });
}
 
startReq(baseUrl);