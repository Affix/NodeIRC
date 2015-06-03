/* BOT CONFIGURATION */
var nick = "AffixNode";
var server = "irc.freenode.net";
var serverPort = 6667;
var chan = "#Affix";

var net = require('net');

var client = net.createConnection({port: serverPort, host: server},
    function() {
  console.log("Connected to " + server + "!");
  client.write("NICK "+ nick +"\r\n");
  client.write("USER node node node node\r\n")
  client.write("JOIN "+ chan +"\r\n")
});

client.on('data', function(data) {
  console.log(data.toString());
  /* Split used for IRC Messages */
  data = data.toString();
  data = data.replace(/\r\n/gi, "");
  var split = data.split(" ");
  try{
    /* Split used to get commands */
    var cmd = data.toString().split(":")[2].toString().split(" ");

    if(split[0] == "PING")
    {
      console.log("PONG " + split[1]);
      client.write("PONG " + split[1] + "\r\n");
    }

    if(cmd[0] == "!version")
    {
      console.log("Client Command : VERSION");
      client.write("PRIVMSG " + chan + " :I am a NodeJS Bot Written by Affix!\r\n");
    }
  } 
  catch (TypeError)
  {
    console.log("Caught TypeError with ");
  } 
});

client.on('end', function() {
  console.log("disconnected from server");
});
