<h3 class="sso-page-title">Please sign on for your Video Visit</h3>
<div  style="width: 40%; margin-left: 84px;float: left">
<p class="sso-login">Use your kp.org user name and password</p>
<form id="ssoLoginForm" method="post" action="" style="overflow:auto;">
    <div>
	    <ul class="sso-form-block">
	        <li><input type="text" name="username" id="username" placeholder="kp.org user name" tabindex="1"></li>
	        <li><input type="password" name="password" id="password" placeholder="password" tabindex="2"></li>
	  	</ul>
	  	<div class="sso-submit-block" style="overflow:auto;">
	        <input type="submit" name="ssologin" value="Sign on" id="ssologin" class="button" tabindex="3" disabled="disabled" >
	    </div>
	    
	    <a href="login.htm" id="temp-access"> Temporary access </a>
  	</div> 
</form>
</div>
<div id="ssoLoginError" style="float: right">
    <p id="globalError">There was an error authenticating your account. Please sign in using temporary access.</p>
</div> 
<!--<p class="error error-login"><a name="errors"></a></p>-->

<script type="text/javascript">

	var browserInfo = getBrowserInfo();
	var browserVersion = (browserInfo.version).split(".")[0];
	
	if(browserInfo.isChrome) {

		var browserNotSupportedMsgForPatient = "Video Visits does not currently support your browser version.";
		browserNotSupportedMsgForPatient += "<br /><br />";
		/*US17810*/
		browserNotSupportedMsgForPatient += "Please download the <a target='_blank' href='https://mydoctor.kaiserpermanente.org/ncal/mdo/presentation/healthpromotionpage/index.jsp?promotion=kppreventivecare'>My Doctor Online app</a> or use Internet Explorer for Windows or Safari for Mac. ";

		if(navigator.appVersion.indexOf("Mac") != -1 && browserVersion >= 39) {
			$('p#globalError').html(browserNotSupportedMsgForPatient);
			$('#ssoLoginError p').css("display", "block");
			
			document.getElementById("username").disabled = true;
			document.getElementById("password").disabled = true;

			$('#temp-access').css('cursor', 'default');
            $('#temp-access').css('opacity', '0.5');
            $('#temp-access').css('pointer-events', 'none');
		}
		else if(navigator.appVersion.indexOf("Win") != -1) {
			if((browserInfo.is32BitOS == false && browserVersion >= 40) || (browserVersion >= 42)){
				$('p#globalError').html(browserNotSupportedMsgForPatient);
				$('#ssoLoginError p').css("display", "block");
				
				document.getElementById("username").disabled = true;
				document.getElementById("password").disabled = true;

				$('#temp-access').css('cursor', 'default');
	            $('#temp-access').css('opacity', '0.5');
	            $('#temp-access').css('pointer-events', 'none');
			}
		}
	}
</script>
