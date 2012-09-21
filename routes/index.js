
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.pusher = function(req, res){
  res.render('pusher', { title: 'Express' });
};