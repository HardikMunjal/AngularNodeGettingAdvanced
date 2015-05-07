
var mysql = require('mysql');

var events = require('events'), emitter = new events.EventEmitter();
//----------------------------------------------Connection With MSQL -------------------------------------------------------------------------
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



var Details2 = {
	    userList: function (onResult) {
	        var query = connection.query('select  *   from demo.reviews r inner join demo.images i on r.id=i.review_id ', function (err, result) {
	            //console.log('Result:' + result.length)
	            var dataOutput = [];
	            var lookup = {};
	            var imageOutput = [];
	            var finalOutput = [];
	            for (i = 0; i < result.length; i++) {
	                var id = JSON.stringify(result[i].review_id);
	                result[i].Image = result[i].Image.toString().split(',').map(function (value) {
	                    imageOutput.push(({ Images: value, Review_Id: result[i].review_id }));
	                });
	                if (!(id in lookup)) {
	                    lookup[id] = 1;
	                    dataOutput.push(({ Result: result[i], Id: id }));
	                }
	            }

	            for (i = 0; i < dataOutput.length; i++) {
	                var id = dataOutput[i].Id;
	                finalOutput.push({ Result: dataOutput[i].Result, Images: getImage(id, imageOutput) });
	            }
	            console.log(('filtered Data:' + finalOutput));
	            onResult(finalOutput);

	        });
	    }
	}

exports.Details2= Details2;

var Details = {
    userList: function (onResult) {
        var query = connection.query('select  *   from demo.reviews r inner join demo.images i on r.id=i.review_id ', function (err, result) {
            //console.log('Result:' + result.length)
            var ids = [];
            var lookup = {};
            //for (i = 0; i < result.length; i++) {
              //  var id = JSON.stringify(result[i].Id);
                //if (!(id in lookup)) {
                  //  lookup[id] = 1;
                    //ids.push(id);
                //}
            //}

              //ids.forEach(function (id) {
                //    console.log('ID:' + id);
                //});
            //var outputJSON = [];
            //var img = [];
            //var finalresult = [];
            //console.log('Id:'+result.Id);
            //result.forEach(function (row) {
            //  row.Image = row.Image.toString().split(',').map(function (value) {
            //    outputJSON.push({ Images: String(value) });
            //});
            //delete row.Image;
            //img.push({ Images: outputJSON });
            //img.push(result[0]);

            //});
            //finalresult.push(img);
            //onResult(finalresult);
            if (err)
                console.log(err);
            else {

                onResult(result);
            }
        });
    },

    imgList: function (onResult) {
        var query = connection.query('select  *  from demo.images  ', function (err, result) {
            var outputJSON = [];
            //var img = [];
            //var finalresult = [];
            //console.log('Id:'+result.Id);
            console.log('Result:' + JSON.stringify(result));
            result.forEach(function (row) {
                row.Image = row.Image.toString().split(',').map(function (value) {
                    outputJSON.push({ Images: String(value) });
                });


                delete row.Image;
                //img.push({ Images: outputJSON });
                //img.push(result[0]);

            });

            onResult(outputJSON);
            //finalresult.push(img);
            //onResult(finalresult);
            //if (err)
            //  console.log(err);
            //else {
            //  console.log('ID:' + JSON.stringify([0].Id));
            //onResult(result);
            //   }
        });
    }

}

exports.Details = Details;
//console.log(query.sql);


function getImage(id, imageOutput) {
    var arr = [];
    for (k = 0; k < imageOutput.length; k++) {
        if (imageOutput[k].Review_Id == id) {
            arr.push({image:imageOutput[k].Images});
        }
    }
    return arr;
};