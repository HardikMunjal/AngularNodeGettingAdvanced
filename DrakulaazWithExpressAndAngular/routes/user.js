
/*
 * GET users listing.
 */

 var user = require('../Controllers/Details.js');
exports.list = function (req, res) {
    
        var obj = user.Details.userList(function onResult(result) {
        // res.render('hardik', { title:''})
      // res.render('NewUser', {title:'', data:result})
        res.render('Details', {title:'', data:result})
    });


}

exports.list = function (req, res) {
    
    var obj = user.Details2.userList(function onResult(result) {
    // res.render('hardik', { title:''})
  // res.render('NewUser', {title:'', data:result})
    res.render('Details', {title:'', data:result})
});


}