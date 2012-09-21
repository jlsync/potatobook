var Pusher = require('pusher');

var pusher = new Pusher({
  appId:  'YOUR_PUSHER_APP_ID',
  appKey: 'YOUR_PUSHER_APP_KEY',
  secret: 'YOUR_PUSHER_SECRET_KEY'
});

exports.start = function(req, res){

  console.log( "start");

  var channel = pusher.channel('sync');

  var data = { name: "Joe", message_count: 23 };

  channel.trigger('my_event', data, function(err, request, response) {
    // do something (this callback is optional)
    console.log( err, request, response);
  });


  res.send("respond with a resource");
};