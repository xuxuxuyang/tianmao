// 百度ai的评论观点抽取
var AipNlpClient = require("baidu-aip-sdk").nlp;

// 设置APPID/AK/SK
var APP_ID = "百度APP_ID";
var API_KEY = "百度API_KEY";
var SECRET_KEY = "百度SECRET_KEY";

const options = {};
options["type"] = "12";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY)

module.exports = {options,client}