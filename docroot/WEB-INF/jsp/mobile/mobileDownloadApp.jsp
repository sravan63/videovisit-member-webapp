<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script>
	$(document).ready(function(){
		$("head").append("<meta name='apple-itunes-app' content='app-id=497468339'>");
		$("head").append("<meta name='google-play-app' content='app-id=org.kp.tpmg.preventivecare'>");
	});
	
	var app={
		launchApp: function(){
			window.location.replace("kppc://videovisit");
				this.timer = setTimeout(this.openWebApp, 1000);
		},
		openWebApp: function(){
			var os = getAppOS();
			
			if(os == "iOS"){
				window.location.replace("https://itunes.apple.com/us/app/kp-preventive-care-for-northern/id497468339?mt=8");
			}
			else if(os == "Android"){
				window.location.replace("https://play.google.com/store/apps/details?id=org.kp.tpmg.preventivecare&hl=en");
			}
			else{
				// we should never reach this condition
				alert("No device detected");
			}
		}
	}
</script>

<div id="content-window">
	<div id="contents">
		<h1> Join Your Video Visit </h1>
		<p> Get KP Preventive Care to start your visit with your doctor. </p>
		<button type="button" onclick="app.launchApp();">Open</button>
	</div>
	<img src="images/mobile/phone.png"></img>
</div>