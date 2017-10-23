var t = require('../lib/dom');
var data = {"url":"我是你爹"};
t.updateData("user",{"name":'菜鸟教程'},data,function(r){
    console.log(r);
});
