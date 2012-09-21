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

  console.log( "start");

  var channel = pusher.channel('test_channel');

  var data = { name: "Joe", message_count: 23 };

  channel.trigger('my_event', data, function(err, request, response) {
    // do something (this callback is optional)
    console.log( "send event", err);
  });


  res.send("message sent...");
};