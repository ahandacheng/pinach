var mongoose = require('mongodb').MongoClient;
var path = require('path');
var fs = require('fs');
var async = require('async');
//连接数据库
exports.connect = function (callback) {
    async.waterfall([
        function (callback) {
            //读取config文件
            fs.readFile(path.join(__dirname, '../config/database.config.json'), function (err, file) {
                //读取错误抛出异常
                if (err && err.code === 'ENOENT') {
                    var err = {
                        type: 'system',
                        error: 'database.config.js 文件不存在'
                    };
                    return callback(err);
                } else if (err) {
                    err.type = 'system';
                    return callback(err);
                }
                
                var config = JSON.parse(file);
                //配置连接参数
                var databaseConfig = {
                    host: config.host,
                    port: config.port,
                    db: config.db,
                    user: config.user,
                    pass: config.pass
                };
                
                callback(null, databaseConfig);
            });
        },
        function (config, callback) {
            mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db, {
                user: config.user,
                pass: config.pass
            }, function (err,db) {
                if (err) {
                    err.type = 'database';
                    return callback(err);
                }
                console.log('连接成功');
                callback(db);
            });
        }
    ], function (err) {
      if (err) return callback(err);
      callback();
    });
};


