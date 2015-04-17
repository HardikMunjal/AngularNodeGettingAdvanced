var util = require('util');
var readFile = require('../Controllers/readFile.js');
var path = require('path');
var finalInsert = require('../Controllers/finalInsert.js');


exports.imageForm = function (req, res) {
    res.render('newIndex', { title: 'New Index Page' });
};

exports.uploadImage = function (req, res, next) {
    var message = req.body.message;
    var review = req.body.review;
    var category = req.body.category;
    var pro_name = req.body.pro_name;
    var pro_spec = req.body.pro_spec;
    var length = ([].concat(req.files.image)).length;
    console.log(length);

    //database starts here
    var post = "  '1' , " + "'" + message + "'," + "'" + review + "'," + "'0' , " + "'" + pro_name + "'," + "'" + pro_spec + "'," + "'" + category + "'";

    finalInsert.finalInsert(post, function (result) {
        console.log(result);
        if (result == 1) {
            if (length == 1) {
                //    console.log(req.files.image);
                var imagepost = "  '1' , " + "'" + message + "'," + "'" + review + "',";
                readFile.readFile(req.files.image, imagepost, function (output) {
                    console.log(output);

                });
            }
            else {
                for (var i = 0; i < length; i++) {
                    var imagepost = "  '1' , " + "'" + message + "'," + "'" + review + "'," ;
                    readFile.readFile(req.files.image[i], imagepost, function (output) {
                        console.log(output);
                    });
                    //console.log(req.files.image[i], imagepost);
                }
            }
        }
    });
    res.render('MainView', { title: '' });
};