// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};
// Flash fallback logging - don't include this in production
WEB_SOCKET_DEBUG = true;

// User details need to be set by mobile app
var user = {name:"Jo Blogs",
  picture:"https://secure.gravatar.com/avatar/83495e6101c2561c3f7332db3bbe82f9?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-org-420.png"};

Pusher.channel_auth_endpoint = '/api/pusher_auth';
var pusher = new Pusher('10408a3c620b760edd45'),
    channel = pusher.subscribe(channelId);

function printMove(move) {
  var messages = document.getElementById("message");
  messages.innerHTML += "<strong>"+move.user.name+"</strong>, moved: "+move.x+":"+move.y+"<br/>";
}

function printJoined(user) {
  var messages = document.getElementById("message");
  messages.innerHTML += "<strong>"+user.name+"</strong>, joined<br/>";
}

channel.bind('pusher:subscription_succeeded', function(data) {
  channel.trigger('client-joined', user);
  printJoined(user);
});
channel.bind('client-joined', printJoined);
channel.bind('client-moved', printMove);

function sendMove() {
  var move = {x: Math.floor(Math.random()*5),
    y:Math.floor(Math.random()*5),
    user: user};
  printMove(move);
  channel.trigger('client-moved', move);
}

