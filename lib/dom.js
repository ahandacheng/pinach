const async = require('async');
const mongo = require('../controllers/JDBC');

module.exports = {
    insert:function(table,data,callback){
        mongo.connect(function(db){
            async.waterfall([function(callback){
                let collection = db.collection(table);
                collection.insert(data, function(err, result) {
                    if(err)
                    {
                        callback(err);
                        return;
                    }
                    callback(null,result);
                });
            },
            function(result,callback){
                db.close();
                callback(result);
            }],
            function (err) {
                if (err) return callback(err);
                callback();
            })
        })
    },
    updateData:function(table,whereStr,data,callback){
        mongo.connect(function(db){
            async.waterfall([function(callback){
                let collection = db.collection(table);
                let updateStr = {$set: data};
                collection.update(whereStr,updateStr,{multi:true},function(err, result) {
                    if(err)
                    {
                        callback(err);
                        return;
                    }     
                    callback(null,result);
                });
            },
            function(result,callback){
                db.close();
                callback(result);
            }],
            function (err) {
                if (err) return callback(err);
                callback();
            })
        })
    },
    delData:function(table,data,callback){
        mongo.connect(function(db){
            async.waterfall([function(callback){
                let collection = db.collection(table);
                collection.remove(data, function(err, result) {
                    if(err)
                    {
                        callback(err);
                        return;
                    }
                    callback(null,result);
                });
            },
            function(result,callback){
                db.close();
                callback(result);
            }],
            function (err) {
                if (err) return callback(err);
                callback();
            })
        })
    },
    selectData:function(table,data,callback){
        mongo.connect(function(db){
            async.waterfall([function(callback){
                let collection = db.collection(table);
                collection.find(data).toArray(function(err, result) {
                    if(err)
                    {
                        callback(err);
                        return;
                    }
                    callback(null,result);
                });
            },
            function(result,callback){
                db.close();
                callback(result);
            }],
            function (err) {
                if (err) return callback(err);
                callback();
            })
        })
    }
}
