const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const User = require('../init_db').User;

function toHashToken(str){
    hash.update(str+'233333');
    return hash.digest('hex')
}
function deletePass_V_index_FromObj(obj){
    let dup = JSON.parse(JSON.stringify(obj))
    delete dup.pass;
    delete dup.__v;
    delete dup._id;
    return dup;
}

exports.login = async function (reqBody){
    const info = {
        ID: reqBody.ID||'',
        pass: reqBody.pass||'',
    }
    let error = []
    for(key in info){
        if(info[key]===''){
            error.push(key)
            continue;
        }
    }
    if(error.length){
        return {
            code: '001',
            info: '参数缺失',
            error
        }
    }
    error = [];
    if(!/^[\w\d_]{6,8}$/.test(info['ID'])){
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(info['ID'])){
            error.push('ID');
        }else{
            info.email = info.ID;
            delete info.ID;
        }
    }
    !/^[\w\d_]{6,8}$/.test(info['pass'])&&error.push('pass');
    if(error.length){
        return {
            code: '002',
            info: '参数格式错误',
            error
        }
    }
    if(info.ID){
        try{
            var r1 = await User.find({ ID: info.ID}).exec();
            if(r1.length){
                let have = false;
                let i = null;
                have = r1.some(function(item){
                    (item.pass===info.pass)&&(i=item);
                    return item.pass===info.pass
                })
                if(have){
                    return {
                        code: '000',
                        info: '登录成功',
                        data: deletePass_V_index_FromObj(i)
                    }
                } else {
                    return {
                        code: '003',
                        info: 'ID和密码输入错误'
                    }
                }
            }
        }catch(err){
            return {
                code: '004',
                info: '数据库错误'
            }
        }
    } else if(info.email){
        try{
            var r2 = await User.find({ email: info.email}).exec();
            if(r2.length){
                let have = false;
                let i = null;
                have = r2.some(function(item){
                    (item.pass===info.pass)&&(i=item);
                    return item.pass===info.pass
                })
                if(have){
                    return {
                        code: '000',
                        info: '登录成功',
                        data: deletePass_V_index_FromObj(i)
                    }
                } else {
                    return {
                        code: '003',
                        info: 'ID和密码输入错误'
                    }
                }
            } else {
                return {
                    code: '003',
                    info: 'ID和密码输入错误'
                }
            }
        } catch (err){
            return {
                code: '004',
                info: '数据库错误'
            }
        }
    }
}
exports.logon = async function (reqBody){
    const info = {
        ID: reqBody.ID||'',
        pass: reqBody.pass||'',
        email: reqBody.email||''
    }
    let error = []
    for(key in info){
        if(info[key]===''){
            error.push(key)
            continue;
        }
    }
    if(error.length){
        return {
            code: '001',
            info: '参数缺失',
            error
        }
    }
    error = [];
    !/^[\w\d_]{6,8}$/.test(info['ID'])&&error.push('ID');
    !/^[\w\d_]{6,8}$/.test(info['pass'])&&error.push('pass');
    !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(info['email'])&&error.push('email');
    if(error.length){
        return {
            code: '002',
            info: '参数格式错误',
            error
        }
    }
    info.token = toHashToken(info.pass)
    let u = new User(info)
    try{
        var r = await u.save();
    }catch(err){
        if(err.code ===11000){
            return{
                code: '003',
                info: 'ID已被占用',
                error: []
            }
        }
        return{
            code: '004',
            info: '数据库错误',
            error: []
        }
    }
    return {
        code: '000',
        info: '注册成功',
        error: [],
        data: deletePass_V_index_FromObj(info)
    }
}
exports.testUniqueID = async function(reqBody){
    try{
        var r = await User.find({ ID: reqBody.ID}).exec();
        if(r.length){
            return {
                code: '003',
                info: 'ID已被占用'
            }
        } else {
            return {
                code: '000',
                info: 'ID准入'
            }
        }
    }catch(err){
        return {
            code: '004',
            info: '数据库错误'
        }
    } 
}