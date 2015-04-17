
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.spec = function (req, res) {
    res.render('spec', {title:'Full Specification'})
};

exports.action = function (req, res) {
    res.render('MainView', {title:'New Index Page'})
};

exports.ZoomCustomize = function (req, res) {
    var id = req.params.id;


}
exports.partials = function(req, res){
	  var filename = req.params.filename;
	  if(!filename) return;  // might want to change this
	  res.render("partials/" + filename );
	};