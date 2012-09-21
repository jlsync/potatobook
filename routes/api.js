var Pusher = require('node-pusher');

var pusher = new Pusher({
  appId:  '28172',
  key:    '10408a3c620b760edd45',
  secret: '0cc6684219419a631339'
});

exports.index = function(req, res){
  res.render('api', { title: 'API Test' });
};

exports.start = function(req, res){

  var data = { name: "Joe", message_count: 23 };

  pusher.trigger('test_channel','my_event', data, undefined, function(err, request, response) {
    // do something (this callback is optional)
    console.log( "send event", err);
  });


  res.send("message sent...");
};


exports.pusher_auth = function(req, res){
  var result = pusher.auth(req.body['socket_id'], req.body['channel_name']);
//  console.log( req );
  console.log( "private connection..." );
  res.send(result);
};