var nodemailer = require("nodemailer");

var email = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 587,
    secure: true, //465为true,其他为false
    auth: {
      user: "alfredqwang@163.com", // 自己的邮箱
      pass: "wq329429"
    }
  });
  
  exports.pushMail = function(obj){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    var msg = {
      from: "天气订阅平台<alfredqwang@163.com>",
      to: "3163299800@qq.com",
      subject: `${y}年${m}月${d}日-天气报表`,
    };
    return new Promise(function(res, rej) {
      email.sendMail({
        ...msg,
        ...obj
      }, function(err,data){
        if(err){
          rej(new Error(err));
        } else {
          res('success')
        }
      });
    })
  }