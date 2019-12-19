var request = require('request'); 
var Promise = require("bluebird");
//http://api.map.baidu.com/location/ip?ip=111.21.39.39&ak=L4H8WfkVi4npinNIdYyVahul3YP2Ba7L
const baseUrl = "http://api.map.baidu.com/location/ip"
const ak = "IeDF7ipzpGsc4DYEV4rA7TUxGOa71LMd"
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
        var url = baseUrl + '?ip='+ip+'&ak='+ak;
        return new Promise(function(res,rej){
            request(url, function (error, response, body) {
                if(error){
                    rej(new Error(error))
                }else{
                    try{
                        body = decodeURI(body);
                        body = JSON.parse(body);
                    }catch(err){
                        rej(new Error(err))
                    }
                    if(body.status){
                        rej(new Error(body.status))
                    } else {
                        res(body.content.address_detail)
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
                region:res.province,
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