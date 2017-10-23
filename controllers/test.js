var t = require('../lib/dom');
var data = {"url":"我是你爹"};
t.selectData("user",data,function(r){
    console.log(r);
});
