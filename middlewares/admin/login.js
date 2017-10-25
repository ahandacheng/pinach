const dom = require('../../lib/dom')

exports.selectadmin = function(data,cb){
    dom.selectData('adminuser',data,function(result){
        cb(result);
    })
}