const xlsx = require('xlsx');
const path = require('path');
function readXLSXtoJSON (XLSXpath) {
    const workbook = xlsx.readFile(XLSXpath);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    return xlsx.utils.sheet_to_json(worksheet,{raw:false});
}
function rewriteTime(json){
    for (let item of json){
        let [monthInde,day,year] = item.date.split('/');
        monthInde--;
        year = '20'+year;
        let [hours,minutes,seconds] = item.time.split(':');
        item.time = new Date(year,monthInde,day,hours,minutes,seconds).getTime();
    }
    return json;
}
var data = rewriteTime(readXLSXtoJSON(path.join( __dirname, './2018_01.xlsx')));
module.exports = data