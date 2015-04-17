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
    console.log('Connected');
    // connected! (unless `err` is set)
});

exports.finalInsert = function (data, onResult) {
    console.log(data);
    console.log("rest::getJSON");
    var output = '';
    connection.query("CALL demo.CreateReviews(" + data + ")", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results[0][0].result_status);
            onResult(results[0][0].result_status);
        }
    });
};