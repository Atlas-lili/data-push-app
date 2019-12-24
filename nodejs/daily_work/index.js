const fs = require('fs');
const schedule = require('node-schedule');
const {User} = require('../init_db');
const {pushMail} = require('../push_mail')
const puppeteer = require("puppeteer");   //引入 puppeteer
const {join} = require('path');

async function shotImg (chartstr,date){
  const [city,chart,time] = chartstr.split("-")
  const chartConf = {
    "WeatherNow":{
      url:"push/weather-air-now/",
      clip:{x:66,y:0,width:542,height:360}
    },
    "AirNow":{
      url:"push/weather-air-now/",
      clip:{x:758,y:0,width:542,height:360}
    }
  }
  const browser = await puppeteer.launch({ headless:true,args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://www.alfredqwang.cn/#/${chartConf[chart].url}${city}`);
  await page.setViewport({
    width:1368,
    height:625
  }) 
  try{
    fs.mkdirSync(join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}`), { recursive: false });
  }catch(err){}
  await page.screenshot({ path: join(__dirname,`../assets/charts/${date.y}-${date.m}-${date.d}/${chartstr}.png`),clip:chartConf[chart].clip});
  browser.close();
}

exports.scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('* * 13 * * *',async function(){
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
          html+=`<div><p>${sub}</p><img src="${src}" alt="${sub}" /></div>`
        }
        pushMail({
          to: u.email,
          html,
        })
      }
    }); 
}
