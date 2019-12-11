var mongoose = require('mongoose');

exports.init = function() {
    var dbname = (process.env.NODE_ENV==='production')? "test" : "AppData";
    mongoose.connect("mongodb://localhost:27017/" + dbname, {useNewUrlParser:true,useUnifiedTopology: true}, function(err){
    　　if(err){
    　　　　console.log('Connection Error:' + err)
    　　} else {
            console.log('Connection DONE')
    　　}
    })
}

exports.User = (function(){
    var UserSchema = mongoose.Schema({
        ID: {type: String, index: {unique: true, dropDups: true}},
        pass: String,
        email: String,
        token: String
    });
    return mongoose.model('User', UserSchema);
})()
