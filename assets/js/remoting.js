(function(window, Pusher) {

  var pusher = new Pusher('10408a3c620b760edd45')
    , channel = null;

  // User details need to be set by mobile app
  var user = {id:'123',
              name:"Jo Blogs",
              picture:"https://secure.gravatar.com/avatar/83495e6101c2561c3f7332db3bbe82f9?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-org-420.png"};

  function printMove(move) {
    var messages = document.getElementById("message");
    messages.innerHTML += "<strong>"+move.user.name+"</strong>, moved: "+move.x+":"+move.y+"<br/>";
  }

  function printJoined(user) {
    var messages = document.getElementById("message");
    messages.innerHTML += "<strong>"+user.name+"</strong>, joined<br/>";
  }

  function initRemoting(user) {
    $.ajax("http://potatobook.herokuapp.com/api/start_game")
      .done(function(data) {
        Pusher.channel_auth_endpoint = 'http://potatobook.herokuapp.com/api/pusher_auth';

        channel = pusher.subscribe(data.channel);

        channel.bind('pusher:subscription_succeeded', function() {
          channel.trigger('client-joined', user);
          printJoined(user);
        });

        channel.bind('client-joined', printJoined);
        channel.bind('client-moved', printMove);
      });
  }

  initRemoting(user);

  window.sendMove = function sendMove(x,y) {
    var move = {x: x,
                y: y,
                user: user};
    channel.trigger('client-moved', move);
  }


})(window, Pusher);

// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};
