$(document).ready(function() {
  var streams = ["ESL_CSGO", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var streamUrl = "https://api.twitch.tv/kraken/streams/";
  var offline = [];
  var online = [];
  var statuses = [];
  var games = [];
  var links = [];
  var pics = [];

  //define j outside of the for loop so it doesn't reset an repeat channels
  var j = 0;
  var k = 0;
  //define status function to get the status and data of the channels from the streams var
 

  function status(a) {
    $.ajax({
      type: "GET",
      url: streamUrl + streams[a],
      //client-id from twitch needs to be setup as a header to avoid error being returned from twitch api
      headers: {
        "Client-ID": "35xbghab5njaoblimnvg4q1qvb4v07q"
      },
      success: function(sData) {
        //get stream data from twitch, if null channel is offline
        if (sData.stream === null) {
          offline.push(streams[a]);
          for (k; k < offline.length; k++) {
            $(".offline").append('<div class="box channel container"><img src="https://tse2.mm.bing.net/th?id=OIP.Mdbb611ce91c9a2863503ba210a7a1693o0&pid=15.1" class="logo img-responsive col-xs-1"><p class="col-xs-3 text-center">' + offline[k] + '</p><pclass="col-xs-3 text-center">Offline</p><p class="col-xs-3 text-center"></p></a></div>');
            //if stream data is available the channel is live. get the logo, channel name, game being played, and channel description, and record the link
          }
        } else {
          online.push(sData.stream.channel.display_name);
          pics.push(sData.stream.channel.logo);
          statuses.push(sData.stream.channel.status);
          games.push(sData.stream.channel.game);
          links.push("https://www.twitch.tv/" + streams[a]);
          for (j; j < online.length; j++) {
            $(".online").append('<div class="box channel container"><a href="' + links[j] + '" target="_tab"><img src=' + pics[j] + ' class="logo img-responsive col-xs-1"><p class="col-xs-3 text-center">' + online[j] + '</p><p class="col-xs-3 text-center">Playing: ' + games[j] + '</p><p class="col-xs-4 text-center">' + statuses[j] + '</p></a></div>');
          }
        }
      }
    });
  }
  for (var i = 0; i < streams.length; i++) {
    status(i);
  }

  //console.log(online);
});
