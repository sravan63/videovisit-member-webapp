<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.context.*"%>
<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.command.*"%>
<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.*" %>
<%@ page import="org.kp.tpmg.videovisit.webserviceobject.xsd.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>

<%
String timezone = WebUtil.getCurrentDateTimeZone();
%>
<c:if test="${WebAppContext.totalmeetings>0}">
	<div id="landing-portal-ready">
		<c:forEach var="meeting" items="${WebAppContext.meetings}">
			<p class="login" style="padding:0px;">Children age 11 or younger may not use this website alone. A parent or legal guardian may use this website and have the child with them during the visit.</p>
	      	<p class="guest-config-info login" style="padding:0px;">To ensure your webcam and speakers are configured correctly, please use our <a href="setup.htm?isGuest=Y" target="_blank">Setup Wizard</a> before proceeding.</p>
			<div class="landing-portal-single-container">				
				<div class="landing-portal-details guest">
					<div class="hidden timestamp">${meeting.scheduledTimestamp}</div>
					<h3>Your visit is scheduled for </h3>
					<p class="guest-directive">Please enter the following information to join this visit:</p> 
					<label for="patient_last_name">Patient Last Name
						  <input type="text" name="patient_last_name" id="patient_last_name" maxlength="35"></input>
	            	</label>
					<a id="joinNowBtn" class="btn" meetingid="${meeting.meetingId}"	href="${meeting.mmMeetingName}">Click to continue</a>										
				</div>				
			</div>
			<p class="error error-guest-login"></p>
		</c:forEach>
	</div>
</c:if>

<c:if test="${WebAppContext.totalmeetings<=0}">
	<div id="landing-portal-none">
		<p> The video visit you are trying to join is not currently available. </p>
	</div>
</c:if>

<input type="hidden" id="tz" value="<%=timezone%>" /> 

<style>
	a#joinNowBtn{
		opacity: 0.5;
		pointer-events: none;
		cursor: none;
	}
</style>

<script type="text/javascript">

	var browserInfo = getBrowserInfo();
	var browserVersion = (browserInfo.version).split(".")[0];
	
	/*if(browserInfo.isIE) {
		if (((browserInfo.version == 8 || browserInfo.version == 9 || browserInfo.version == 10 || browserInfo.version == 11) && !browserInfo.is32Bit) || browserInfo.version <= 7) {
			
			var browserNotSupportedMsgIE = "Video Visits is supported on 32 bit browsers only.";
			browserNotSupportedMsgIE += "<br /><br />";
			browserNotSupportedMsgIE += "Your current browser is unsupported.";
			browserNotSupportedMsgIE += "<br /><br />";
			browserNotSupportedMsgIE += "Please <a href='mdohelp.htm' target='_blank'>Download a 32 bit browser</a>";
			
			$('p.error').html(browserNotSupportedMsgIE);
			
			document.getElementById("patient_last_name").disabled = true;
			document.getElementById("joinNowBtn").disabled = true;
		}
	}*/
	if(browserInfo.isChrome) {
		var browserNotSupportedMsgForPatient = "Video Visits does not currently support your browser version.";
		browserNotSupportedMsgForPatient += "<br /><br />";
		browserNotSupportedMsgForPatient += "Please try again using Internet Explorer for Windows or Safari for Mac.";

		if(navigator.appVersion.indexOf("Mac") != -1 && browserVersion >= 39) {
			$('p.error').html(browserNotSupportedMsgForPatient);

			document.getElementById("patient_last_name").disabled = true;
			//document.getElementById("joinNowBtn").disabled = true;
		}
		else if(navigator.appVersion.indexOf("Win") != -1) {
			if((browserInfo.is32BitOS == false && browserVersion >= 40) || (browserVersion >= 42)){
				$('p.error').html(browserNotSupportedMsgForPatient);

				document.getElementById("patient_last_name").disabled = true;
				//document.getElementById("joinNowBtn").disabled = true;
			}
		}
	}
	
</script>
