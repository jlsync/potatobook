var Pusher = require('node-pusher');

var pusher = new Pusher({
  appId:  '28172',
  key:    '10408a3c620b760edd45',
  secret: '0cc6684219419a631339'
});

var gameCount = 0
  , awaitingGame = null;

exports.index = function(req, res){
  res.render('index', { title: 'PotatoBook' });
};

exports.start_game = function(req, res){
  var privateChannel;
  if( !!awaitingGame ) {
    privateChannel = awaitingGame;
    awaitingGame = null;
  } else {
    privateChannel = awaitingGame = "private-game"+(gameCount++)
  }
  res.send(200, { channel: privateChannel, awaiting: !!awaitingGame });
};

exports.pusher_auth = function(req, res){
  res.send(pusher.auth(req.body['socket_id'], req.body['channel_name']));
};

//exports.start = function(req, res){
//
//  var data = { name: "Joe", message_count: 23 };
//
//  pusher.trigger('test_channel','my_event', data, undefined, function(err, request, response) {
//    // do something (this callback is optional)
//    console.log( "send event", err);
//  });
//
//  res.send("message sent...");
//};






