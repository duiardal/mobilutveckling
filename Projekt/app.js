// A Painter application that uses MQTT to distribute draw events
// to all other devices running this app.

//Object that holds application data and functions.
var app = {};

var host = 'vernemq.evothings.com';
var port = 8084;
var user = 'anon';
var password = 'ymous';

app.connected = false;
app.ready = false;

// Simple function to generate a color from the device UUID
app.generateColor = function(uuid) {
	var code = parseInt(uuid.split('-')[0], 16)
	var blue = (code >> 16) & 31;
	var green = (code >> 21) & 31;
	var red = (code >> 27) & 31;
	return "rgb(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ")"
}

app.initialize = function() {
	document.addEventListener(
		'deviceready',
		app.onReady,
		false);
}

app.onReady = function() {
	if (!app.ready) {
		app.color = app.generateColor(device.uuid); // Generate our own color from UUID
		app.pubTopic = '/paint/' + device.uuid + '/evt'; // We publish to our own device topic
		app.subTopic = '/paint/+/evt'; // We subscribe to all devices using "+" wildcard
		//app.setupCanvas();
		app.setupConnection();
		app.ready = true;
	}
}

app.setupConnection = function() {
  app.status("Connecting to " + host + ":" + port + " as " + device.uuid);
	app.client = new Paho.MQTT.Client(host, port, device.uuid);
	app.client.onConnectionLost = app.onConnectionLost;
	app.client.onMessageArrived = app.onMessageArrived;
	var options = {
    useSSL: true,
    onSuccess: app.onConnect,
    onFailure: app.onConnectFailure
  }
	app.client.connect(options);
}

app.publish = function(json) {
	message = new Paho.MQTT.Message(json);
	message.destinationName = app.pubTopic;
	//device.uuid = user;
	//console.log(device.uuid);
	//document.getElementById("allUsers").innerHTML += "<li>"+ user + "</li>";
	//retain = true;
	app.client.send(message);
	//console.log(json);
};



app.subscribe = function() {
	app.client.subscribe(app.subTopic);
	console.log("Subscribed: " + app.subTopic);
}

app.unsubscribe = function() {
	app.client.unsubscribe(app.subTopic);
	console.log("Unsubscribed: " + app.subTopic);
}

app.onMessageArrived = function(message) {
	var o = JSON.parse(message.payloadString);
	var username = document.getElementById("nickname").value;
	if (o.sendTo == "all") {
		document.getElementById("text").innerHTML += "<div style='color:"+o.color+"'>" + o.user + ": " + o.message + "<br></div>";
	}
	if (o.sendTo == username) {
		document.getElementById("text").innerHTML += "<div style='color:"+o.color+"'>" + o.user + ": " + o.message + "<br></div>";
	}
	
}


app.onConnect = function(context) {
	app.subscribe();
	app.status("Connected!");
	app.connected = true;
}

app.onConnectFailure = function(e){
  console.log("Failed to connect: " + JSON.stringify(e));
}

app.onConnectionLost = function(responseObject) {
	app.status("Connection lost!");
	console.log("Connection lost: " + responseObject.errorMessage);
	app.connected = false;
}

app.status = function(s) {
	var info = document.getElementById("info");
	info.innerHTML = s;
}

var sendMsg = function(type) {

	var text = document.getElementById("input");
	text = text.value;

	if (type == "text") {
		text = document.getElementById("input");
	}

	var nickname = document.getElementById("nickname");
	user = nickname.value;

	var toUser = document.getElementById("user");
	toUser = toUser.value;

	if (toUser) {

	}
	else {
		toUser = "all"
	}

	var msg = JSON.stringify({user: user, message: text.value, sendTo: toUser, color: app.color})
	app.publish(msg);
	document.getElementById("input").value = "";
}


app.initialize();