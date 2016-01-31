$(document).ready(function() {
    for(i = 1; i <=4; i++) {
        moveSlider(i);
    }

    setInterval(pushData, 5000);
});

var ws = new WebSocket("ws://" + window.location.host + ":4444/");
//var ws = new WebSocket("ws://captaingoujon.co.uk:4444/");
//var ws = new WebSocket("ws://192.168.1.108:4444/");

var connected = false;

var slider1 = 0.0;
var slider2 = 0.0;
var slider3 = 0.0;
var slider4 = 0.0;

ws.onopen = function() {
	console.log("Opened");
    var command = '{"Command":"Handshake", "Client":"Implementer"}';
    ws.send(command);
    connected = true;
};

ws.onmessage = function (evt) {
    console.log("Message: " + evt.data);
    obj = JSON.parse(evt.data);

    if(obj.Command == "SwitchDevice") {
        var port = obj.Port;
        port += 1;
    	switchDevice(obj.Port, obj.Status);
    }
};

ws.onclose = function() {
    console.log("Closed");
    connected = false;
};

ws.onerror = function(err) {
    console.log("Error: " + err);
    connected = false;
};

function switchDevice(num, state) {
    num += 1;

	if(state == true) {
		document.getElementById("led"+num).style.backgroundColor = "#00ff00";
        if(num == 1) {
            document.getElementById("static").style.display = "inline";
        }
        if(num == 2) {
            document.getElementById("playColour").style.display = "inline";
            document.getElementById("pauseColour").style.display = "inline";
        }
        if(num == 3) {
            audio.play();
        }
        if(num == 4) {
            document.getElementById("lamp").src = "res/lampOn.gif";
            document.getElementById("light").style.display = "inline";
        }
    }

	if(state == false) {
		document.getElementById("led"+num).style.backgroundColor = "red";
        if(num == 1) {
            document.getElementById("static").style.display = "none";
        }
        if(num == 2) {
            document.getElementById("playColour").style.display = "none";
            document.getElementById("pauseColour").style.display = "none";
        }
        if(num == 3) {
            audio.pause();
        }
        if(num == 4) {
            document.getElementById("lamp").src = "res/lampOff.gif";
            document.getElementById("light").style.display = "none";
        }
    }
}

function moveSlider(num) {
    var val = document.getElementById("slider"+num).value;
    val = Math.round(Math.pow(val,2))/100;
    document.getElementById("textbox"+num).value = "  Power: " + 
    val + " W";

    window["slider"+num] = val / 240;
    
}

function pushData() {
    if(connected) {
        var command = '{"Command":"PushData","Voltage":240.0,"Current":['+
        slider1+','+
        slider2+','+
        slider3+','+
        slider4+']}';

        ws.send(command);
        console.log(command);
    }
}
