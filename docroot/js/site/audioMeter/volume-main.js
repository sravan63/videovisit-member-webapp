var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=100;
var HEIGHT=50;
var rafID = null;
var firefox;

window.onload = function() {
	var browserInfoForAM = getBrowserInfo();
//	var browserInfo = new Object();
//	browserInfo.isIE = false;
//	
//	var jqBrowserInfoObj = $.browser; 
//
//	//browserInfo.version = jqBrowserInfoObj.version;
//	
//	if ( jqBrowserInfoObj.mozilla) {
//		browserInfo.isFirefox = true;
//	} else if ( jqBrowserInfoObj.msie){
//		browserInfo.isIE = true;
//	} else if ( jqBrowserInfoObj.chrome){
//		browserInfo.isChrome = true;
//	} else if ( jqBrowserInfoObj.safari){
//		browserInfo.isSafari = true;
//	}
	
	console.log("FF: "+browserInfoForAM.isFirefox);
	console.log("IE: "+browserInfoForAM.isIE);
	console.log("CH: "+browserInfoForAM.isChrome);
	console.log("SF: "+browserInfoForAM.isSafari);
	
	if (browserInfoForAM.isFirefox == true || browserInfoForAM.isChrome == true){
		console.log("Browser supported for Audio Meter");
		
	    // grab our canvas
		canvasContext = document.getElementById( "meter" ).getContext("2d");
	
	    // monkeypatch Web Audio
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
	    // grab an audio context
	    audioContext = new AudioContext();
	
	    // Attempt to get audio input
	    try {
	        // monkeypatch getUserMedia
	        navigator.getUserMedia = 
	        	navigator.getUserMedia ||
	        	navigator.webkitGetUserMedia ||
	        	navigator.mozGetUserMedia;
	        
	        firefox = /Firefox/i.test(navigator.userAgent);
	
	        // ask for an audio input
	        navigator.getUserMedia({audio:true}, gotStream, didntGetStream);
	    } catch (e) {
	        alert('getUserMedia threw exception :' + e);
	    }
	}
	else if(browserInfoForAM.isIE == true){
		console.log("IE Browser - doesn't support Audio Meter");
		$("#mic-demo").css('color', 'black');
		$("#mic-demo").html("<span style='text-align:left; padding:10px; width:auto;'> To adjust mic volume: <ul style='margin:0;'> <li>Go to Control Panel > Hardware and Sound.</li><li>Under Sound, go to <span style='font-weight:bold; display:inline;'>Manage audio</span> devices.</li><li>Click <span style='font-weight:bold; display:inline;'>Recording</span> tab</li><li>Click <span style='font-weight:bold; display:inline;'>Properties</span> button.</li><li>Click <span style='font-weight:bold; display:inline;'>Levels</span> tab</li> </ul> </span>");
		$("#mic-instructions").html(" ");
	}
	else{
		console.log("Unknown Browser - doesn't support Audio Meter");
		$("#mic-demo").css('color', 'black');
		$("#mic-demo").html(" ");
		$("#mic-instructions").html(" ");
	}

};


function didntGetStream() {
    alert('Stream generation failed.');
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
	meter = createAudioMeter(audioContext);
	mediaStreamSource.connect(meter);
	if (firefox){
		window.source = audioContext.createMediaStreamSource(stream);
		//source.connect(audioContext.destination);
	}
    // kick off the visual updating
    drawLoop();
}

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*2.4, HEIGHT);

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}
