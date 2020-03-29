const User = require('../init_db').User;
var chartMap = {
    "WeatherNow":[],
    "AirNow":[],
    "WeatherHistory":[]
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
    const [city,chart,time] = chartstr.split('-')
    let haveCity = (function(city){
        let cityList = ["beijing","shanghai","tianjin","chongqing","haikou","sanya","danzhou","sansha","yinchuan","shizuishan","wuzhong","zhongwei","guyuan","lasa","rikaze","linzhi","shannan","changdu","ali","naqu","xining","haixi","haidong","hainan","haibei","yushu","huangnan","guoluo","xiamen","fuzhou","quanzhou","zhangzhou","putian","ningde","nanping","longyan","sanming","changchun","jilin","yanbian","siping","tonghua","songyuan","baishan","liaoyuan","baicheng","guiyang","zunyi","qiandongnan","qiannan","anshun","qianxinan","bijie","liupanshui","tongren","xian","xianyang","weinan","baoji","yulin","hanzhong","yanan","ankang","shangluo","tongchuan","taiyuan","jinzhong","datong","yuncheng","linfen","changzhi","xinzhou","lvliang","jincheng","yangquan","shuozhou","hangzhou","ningbo","wenzhou","jiaxing","jinhua","shaoxing","taizhou","huzhou","zhoushan","lishui","quzhou","nanchang","ganzhou","jiujiang","shangrao","yichun","fuzhou","jian","jingdezhen","yingtan","xinyu","pingxiang","shijiazhuang","baoding","tangshan","langfang","handan","qinhuangdao","cangzhou","xingtai","zhangjiakou","chengde","hengshui","huhehaote","baotou","eerduosi","hulunbeier","chifeng","tongliao","wulanchabu","xilinguole","bayannaoer","xinganmeng","wuhai","alashanmeng","haerbin","daqing","qiqihaer","mudanjiang","jiamusi","suihua","jixi","shuangyashan","yichun","heihe","hegang","daxinganling","qitaihe","wuhan","yichang","xiangyang","jingzhou","xiaogan","huanggang","huangshi","xianning","enshi","shiyan","jingmen","ezhou","suizhou","nanjing","suzhou","wuxi","changzhou","nantong","xuzhou","zhenjiang","yangzhou","yancheng","taizhou","huaian","lianyungang","suqian","nanning","guilin","liuzhou","yulin","beihai","wuzhou","baise","qinzhou","guigang","hechi","hezhou","fangchenggang","laibin","chongzuo","changsha","zhuzhou","hengyang","yueyang","xiangtan","changde","chenzhou","shaoyang","huaihua","loudi","yongzhou","yiyang","xiangxi","zhangjiajie","shenyang","dalian","anshan","dandong","fushun","yingkou","panjin","jinzhou","huludao","liaoyang","benxi","fuxin","tieling","chaoyang","lanzhou","jiuquan","tianshui","zhangye","jiayuguan","baiyin","dingxi","qingyang","pingliang","wuwei","jinchang","longnan","linxia","gannan","wulumuqi","kelamayi","bayinguoleng","yili","changji","hami","akesu","kashi","aletai","tacheng","tulufan","boertala","hetian","kezhou","kunming","lijiang","dali","honghe","qujing","xishuangbanna","yuxi","chuxiong","dehong","wenshan","baoshan","puer","lincang","diqing","zhaotong","nujiang","hefei","wuhu","bengbu","maanshan","chuzhou","anqing","luan","fuyang","xuancheng","huangshan","huainan","suzhou","tongling","huaibei","bozhou","chizhou","qingdao","jinan","yantai","weifang","weihai","linyi","jining","zibo","taian","dongying","dezhou","rizhao","liaocheng","heze","binzhou","zaozhuang","laiwu","zhengzhou","luoyang","nanyang","xinxiang","xinyang","kaifeng","shangqiu","xuchang","anyang","pingdingshan","zhumadian","jiaozuo","zhoukou","luohe","puyang","sanmenxia","hebi","chengdu","mianyang","nanchong","leshan","deyang","yibin","luzhou","meishan","neijiang","suining","yaan","ziyang","liangshan","dazhou","guangan","zigong","guangyuan","panzhihua","aba","bazhong","ganzi","guangzhou","shenzhen","dongguan","foshan","zhuhai","huizhou","zhongshan","jiangmen","shantou","zhanjiang","zhaoqing","jieyang","qingyuan","chaozhou","meizhou","maoming","shaoguan","yangjiang","heyuan","shanwei","yunfu"]
        if(cityList.indexOf(city)==-1){
            return false;
        }
        return true;
    })(city)
    let safeName = (function(chart,time){
        for(c in chartMap){
            if(c===chart){
                if((!chartMap[c].length)&&(!time)){
                    return true;
                }
                if(chartMap[c].indexOf(time)!==-1){
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    })(chart,time)
    if(!(haveCity&&safeName)){
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
            code: '004',
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