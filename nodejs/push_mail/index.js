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
  var msg = {
    from: "qwang<alfredqwang@163.com>", // 收件人显示的发件人信息

    to: "3163299800@qq.com", // 目标邮箱号

    subject: "Hello ✔",

    text: 'first push' // 发送的内容
  };
  email.sendMail(msg, function(err, data) {
    console.log(err,data)
    //email.close();
  });
