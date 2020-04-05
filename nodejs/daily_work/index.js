const fs = require('fs');
const schedule = require('node-schedule');
const {User} = require('../init_db');
const {pushMail} = require('../push_mail')
const puppeteer = require("puppeteer");   //引入 puppeteer
const {join} = require('path');

const chartConf = {
  "WeatherNow":{
    url:"push/weather-air-now/",
    href:"http://www.alfredqwang.cn/#/Sys/weather-air-now",
    clip:{x:66,y:0,width:542,height:360}
  },
  "AirNow":{
    url:"push/weather-air-now/",
    href:"http://www.alfredqwang.cn/#/Sys/weather-air-now",
    clip:{x:758,y:0,width:542,height:360}
  },
  "WeatherHistory":{
    url:"push/weather-history/",
    href:"http://www.alfredqwang.cn/#/Sys/weather-history",
    clip:{x:145,y:0,width:1084,height:502},
    mount: true
  }
}

function holdTime(ms) {
  return new Promise((rej) => {
    setTimeout(() => {
      rej();
    }, ms)
  })
}

async function shotImg (chartstr,date){
  const [city,chart,time] = chartstr.split("-")
  const browser = await puppeteer.launch({ headless:true,args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://www.alfredqwang.cn/#/${chartConf[chart].url}${city}`);
  await page.setViewport({
    width:1368,
    height:625
  }) 
  try{
    var dir = join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }catch(err){}
  if (chartConf[chart].mount) {
    await holdTime(500);
  }
  await page.screenshot({ path: join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}/${chartstr}.png`),clip:chartConf[chart].clip});
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
          const chart = sub.split("-")[1]
          const src = `http://www.alfredqwang.cn/charts/${y}-${m}-${d}/${sub}.png`
          html+=`<div><p>${sub}---<a href="${chartConf[chart].href}">查看详情</a></p><img src="${src}" alt="${sub}" /></div>`
        }
        if(html){
          pushMail({
            to: u.email,
            html,
            subject: `${y}年${m}月${d}日-给${u.ID}的天气报表`,
          })
        }
      }
    }); 
}
