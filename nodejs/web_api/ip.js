//http://ip.taobao.com/service/getIpInfo.php?ip=210.75.225.254
var request = require('request'); 
var Promise = require("bluebird");

const baseUrl = "http://whois.pconline.com.cn/ipJson.jsp"
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
        var url = baseUrl + '?ip='+ip+'&json=true';
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
                    if(!body.city){
                        rej(new Error(body.city))
                    } else {
                        res(body)
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
                region:res.pro,
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