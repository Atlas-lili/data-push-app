const User = require('../init_db').User;
var chartMap = {
    "histogram":[1,2,3,4],
    "linechart":[1,2,3,4],
    "piechart":[1,2,3,4],
    "scatter":[1,2,3]
}

exports.addSub = async function(reqBody){
    const {token,chartstr} = reqBody;
    if ((!token)||(!chartstr)){
        return {
            code: '001',
            info: '参数缺失'
        }
    }
    if(chartstr.indexOf('-')===-1){
        return {
            code: '003',
            info: '无效chartstr'
        }
    }
    const [chartType, chartId] = chartstr.split('-');
    if(!chartMap[chartType] || !chartMap[chartType].includes(Number(chartId))){
        return {
            code: '003',
            info: '无效chartstr'
        }
    }
    try{
        var user = await User.findOne({ token }).exec();
        if(user){
            if(user.subList.indexOf(chartstr)!==-1){
                return {
                    code: '004',
                    info: '无效订阅'
                }
            }
            user.subList.push(chartstr);
            user.save();
            return {
                code: '000',
                info: '订阅成功',
                data: user.subList
            }
        } else {
            return {
                code: '002',
                info: '无效证书'
            }
        }
    }catch(err){
        return {
            code: '005',
            info: '数据库错误'
        }
    } 
}

exports.changeSub = async function(reqBody){
    const {token, needSub} = reqBody;
    if ((!token)||(typeof needSub !== 'boolean')){
        return {
            code: '001',
            info: '参数缺失'
        }
    }
    try{
        var user = await User.findOne({ token }).exec();
        if(user){
            user.needSub = needSub;
            user.save();
            return {
                code: '000',
                info: '配置成功',
                data: user.needSub
            }
        } else {
            return {
                code: '002',
                info: '无效证书'
            }
        }
    }catch(err){
        return {
            code: '004',
            info: '数据库错误'
        }
    }
}

exports.confSubList = async function(reqBody){
    const {token, subList} = reqBody;
    if ((!token)||(!subList)){
        return {
            code: '001',
            info: '参数缺失'
        }
    }
    try{
        var user = await User.findOne({ token }).exec();
        if(user){
            user.subList = subList;
            user.save();
            return {
                code: '000',
                info: '配置成功',
                data: user.subList
            }
        } else {
            return {
                code: '002',
                info: '无效证书'
            }
        }
    }catch(err){
        return {
            code: '004',
            info: '数据库错误'
        }
    }
}