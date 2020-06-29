const fs = require('fs');
const schedule = require('node-schedule');
const {User} = require('../init_db');
const {pushMail} = require('../push_mail')
const puppeteer = require("puppeteer");   //引入 puppeteer
const {join} = require('path');

const chartConf = {
  'histogram-1': {
    name: '柱状图动画延迟',
    url:"push/histogram/",
    href:"http://www.alfredqwang.cn/#/Sys/histogram",
    clip:{x:24,y:24,width:366,height:400},
    mount: true
  },
  'histogram-2': {
    name: 'Bar with Background',
    url:"push/histogram/",
    href:"http://www.alfredqwang.cn/#/Sys/histogram",
    clip:{x:410,y:24,width:366,height:400}
  },
  'histogram-3': {
    name: '极坐标系下的堆叠柱状图',
    url:"push/histogram/",
    href:"http://www.alfredqwang.cn/#/Sys/histogram",
    clip:{x:24,y:424,width:366,height:400},
    mount: true
  },
  'histogram-4': {
    name: '正负条形图',
    url:"push/histogram/",
    href:"http://www.alfredqwang.cn/#/Sys/histogram",
    clip:{x:410,y:424,width:366,height:400},
    mount: true
  },
}

function holdTime(ms) {
  return new Promise((rej) => {
    setTimeout(() => {
      rej();
    }, ms)
  })
}

async function shotImg (chartstr,date){
  if (fs.existsSync(join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}/${chartstr}.png`))) {
    return;
  }
  const browser = await puppeteer.launch({ headless:true,args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://${process.env.NODE_ENV==='production'? "www.alfredqwang.cn" : "localhost:8080"}/#/${chartConf[chartstr].url}`);
  await page.setViewport({
    width:800,
    height:848
  }) 
  try{
    var dir = join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }catch(err){}
  if (chartConf[chartstr].mount) {
    await holdTime(800);
  }
  await page.screenshot({ path: join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}/${chartstr}.png`),clip:chartConf[chartstr].clip});
  browser.close();
}

exports.scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:30 * * * * *  0 0 5 * * *
    schedule.scheduleJob('0 0 5 * * *',async function(){
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth()+1;
      var y = date.getFullYear();
      var userList = await User.find({ needSub: true}).exec();
      for(u of userList){
        let html = ''
        for(sub of u.subList){
          await shotImg(sub,{d,m,y});
          const src = `http://www.alfredqwang.cn/charts/${y}-${m}-${d}/${sub}.png`
          html+=`<div><p>${chartConf[sub].name}---<a href="${chartConf[sub].href}">查看详情</a></p><img src="${src}" alt="${sub}" /></div>`
        }
        if(html){
          pushMail({
            to: u.email,
            html,
            subject: `${y}年${m}月${d}日-给${u.ID}的数据报表`,
          })
        }
      }
    }); 
}
