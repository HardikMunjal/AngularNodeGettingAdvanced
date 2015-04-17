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


var text = 'insert into demo.merchant SET ?';
exports.getJSON = function (options, onResult) {
    console.log("rest::getJSON");
    var post = options;
    var output = '';
    var query = connection.query(text, post, function (err, result) {
        debugger;
        if (err)
            console.log(err);
        else
            emitter.emit('result', result);
    });

    emitter.on('result', function (result) {
        console.log(JSON.parse(JSON.stringify(result)));
        var obj = JSON.parse(JSON.stringify(result));
        onResult(result);
    }
);
};
    
    





