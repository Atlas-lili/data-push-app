//http://ip.taobao.com/service/getIpInfo.php?ip=210.75.225.254
var request = require('request'); 
var Promise = require("bluebird");

const baseUrl = "http://ip.taobao.com/service/getIpInfo.php"
exports.ipSearch = async function (req){
    var ip = req.ip;
    if(!ip||ip.indexOf('::ffff:')===-1){
        return {
            code: '001',
            info: 'ip未知'
        }
    }
    ip = ip.split('::ffff:')[1]
    var getCity = function(ip){
        var url = baseUrl + '?ip='+ip;
        return new Promise(function(res,rej){
            request(url, function (error, response, body) {
                if(error){
                    rej(new Error(error))
                }else{
                    try{
                        body = JSON.parse(body);
                    }catch(err){
                        rej(new Error(err))
                    }
                    if(body.code!==0){
                        rej(new Error(body.code))
                    } else {
                        res(body.data)
                    }
                }
            });
        })
    }
    try{
        var res = await getCity(ip)
        return {
            code: '000',
            info: '成功',
            data: {
                region:res.region,
                city:res.city 
            }
        }
    } catch(err){
        return {
            code: '002',
            info: '请求失败！'
        }
    }
    
}