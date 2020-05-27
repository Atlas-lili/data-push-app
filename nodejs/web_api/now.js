var request = require('request'); 
var Promise = require("bluebird");

const key = "88f9a4ff885d49a0886f9e681cc92c00";
const baseUrl = "https://free-api.heweather.net/s6/"
exports.weatherNow = async function (reqBody){
    var {city} = reqBody;
    if(!city){
        return {
            code: '001',
            info: 'city缺失'
        }
    }
    var getWeather = function(city){
        var url = baseUrl + 'weather/now?location='+city+'&key='+key;
        return new Promise(function(res,rej){
            request(url, function (error, response, body) {
                if(error){
                    rej(new Error(error))
                }else{
                    try{
                        body = JSON.parse(body);
                        if(body.HeWeather6[0].status!=='ok'){
                            rej(new Error(body.HeWeather6[0].status))
                        } else {
                            res(body.HeWeather6[0].now)
                        }
                    }catch(err){
                        rej(err);
                    }
                }
            });
        })
    }
    try{
        var res = await getWeather(city)
        return {
            code: '000',
            info: '成功',
            data: res
        }
    } catch(err){
        return {
            code: '002',
            info: '请求失败！'
        }
    }
    
}
exports.airNow = async function (reqBody){
    var {city} = reqBody;
    if(!city){
        return {
            code: '001',
            info: 'city缺失'
        }
    }
    var getAir = function(city){
        if(city==='xian')city="xi%27an"
        var url = baseUrl + 'air/now?location='+city+'&key='+key;
        return new Promise(function(res,rej){
            request(url, function (error, response, body) {
                if(error){
                    rej(new Error(error))
                }else{
                    try{
                        body = JSON.parse(body);
                        if(body.HeWeather6[0].status!=='ok'){
                            rej(new Error(body.HeWeather6[0].status))
                        } else {
                            res(body.HeWeather6[0].air_now_city)
                        }
                    }catch(err){
                        rej(err);
                    }
                }
            });
        })
    }
    try{
        var res = await getAir(city)
        return {
            code: '000',
            info: '成功',
            data: res
        }
    } catch(err){
        return {
            code: '002',
            info: '请求失败！'
        }
    }
    
}