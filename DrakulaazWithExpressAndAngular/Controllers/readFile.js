var fs = require('fs');

var mime = require('mime');

var path = require('path');
var uploadpath = path.resolve('../DrakulaazWithExpressAndAngular/public/images/uploads/');
console.log("be happy");
console.log(uploadpath);
var mysql = require('mysql');

var events = require('events'), emitter = new events.EventEmitter();
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root'
});

connection.connect(function (err) {
    if (err)
        console.log('');
    //console.log('Connected');
    // connected! (unless `err` is set)
});

exports.readFile = function (file, post, OnResult) {

    fs.readFile(file.path, function (err, data) {
        fs.stat(file.path, function (err, stats) {
            //console.log(stats.size / 1024);
            if ((stats.size / 1024) < 1000) {
                //res.end('Sorry File is too large');
                var newpath = uploadpath + '\\' + new Date().getTime()+file.name;
                var filename = new Date().getTime()+file.name;
                //console.log('Welcome');
                fs.writeFile(newpath, data, function (err) {
                	console.log("new path");
                    console.log(newpath);
                    //console.log('Done');
                    //console.log("rest::getJSON");
                    var output = '';
                    var obj = post + "'" + filename + "'," + "'0'";
                    console.log(obj);
                    //console.log(obj);
                    connection.query("CALL demo.upload_image(" + obj + ")", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(results[0][0].result_bit);
                            if (results[0][0].result_bit == 1) {
                                console.log('Image saved successfully');
                                OnResult(results[0][0].result_bit);
                            }

                        }
                    });

                });
            }


        });
    });

}