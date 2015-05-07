
/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var formidable = require('formidable');

var mime = require('mime');

var mysql = require('mysql');

var events = require('events'), emitter = new events.EventEmitter();

var app = express();

var insert = require('./Controllers/Insert.js');

var finalInsert = require('./Controllers/finalInsert.js');

var user1 = require('./Controllers/Details.js');



var util = require('util');

var common = require('./routes/common')

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser({
        uploadDir: __dirname + '/public/images/uploads',
        keepExtensions: true
    }))
    app.use(express.limit('5mb'));

});


app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/users', user.list);

app.get('/spec', routes.spec);

app.get('/action', common.imageForm);
app.get('/partials/:filename', routes.partials);


app.get('/MainView', function (req, res) {
    res.render('MainView', { title: 'Main View' });
    
      

});

app.get('/robes', function (req, res) {
    res.render('AngularMagic', { title: 'Main View' });
});


app.get('/basic', function (req, res) {
    res.render('AngularBasic', { title: 'Main View' });
});


app.get('/dynamic', function (req, res) {
    res.render('AngularDynamicForms', { title: 'Main View' });
});



app.get('/data/100',function(req,res){
	
	 fs.readFile('./data.json', function (err, data) {
	 if(err)
		 {
		 console.log(err);
		 }
	 else{
	res.end(data);	 
	 }
	 
	 }
);
	
	
});



app.get('/template/100',function(req,res){
	
	 fs.readFile('./template.json', function (err, data) {
	 if(err)
		 {
		 console.log(err);
		 }
	 else{
	res.end(data);	 
	 }
	 
	 }
);
	
	
});

app.get('/paytm', function (req, res) {
    res.render('PaytmAngularGrid', { title: 'Main View' });
});


app.get('/paytmTest', function (req, res) {
    res.render('PaytmAngularGridTest1', { title: 'Main View' });
});


app.get('/dynamicExcelExport', function (req, res) {
    res.render('AngularDynamicMapping', { title: 'Main View' });
});


app.get('/dynamicMappingAndExcelExport', function (req, res) {
    res.render('AngularDynamicMappingAndCsvExport', { title: 'Main View' });
});

app.get('/dynamicMapping', function (req, res) {
    res.render('AngularRealDynamicMapping', { title: 'Main View' });
});



app.get('/demo2', function (req, res) {
    var obj = user1.Details2.userList(function onResult(result) {
        // res.render('hardik', { title:''})
        // res.render('NewUser', {title:'', data:result})
        console.log(result);
        res.end(JSON.stringify(result));
        // res.JSON(result);
    });
});


app.get('/demo', function (req, res) {
    var obj = user1.Details.userList(function onResult(result) {
        // res.render('hardik', { title:''})
        // res.render('NewUser', {title:'', data:result})
        console.log(result);
        res.end(JSON.stringify(result));
        // res.JSON(result);
    });
});







app.get('/images', function (req, res) {
    var obj = user1.Details.imgList(function onResult(result) {
        // res.render('hardik', { title:''})
        // res.render('NewUser', {title:'', data:result})
        console.log(result);
        res.end(JSON.stringify(result));
        // res.JSON(result);
    });
});

app.post('/action', common.uploadImage);

app.post('/', function (req, res) {
    var files = req.files.files[0];
    var post = { UserId: req.body.name, Description: req.body.message, Reviews: req.body.review, LastModifiedDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), LastModifiedBy: 1 };
    insert.getJSON(post, function (result) {
        console.log(result);
        res.end('thanks');
    });
    for (var i = 0; i < files.length; i++) {
        readFile.finalInsert(files[i]);
    }
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


