<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.context.*"%>
<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.command.*"%>
<%@ page import="org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.*" %>
<%@ page import="org.kp.tpmg.videovisit.model.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='fn' uri='http://java.sun.com/jsp/jstl/functions' %>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>

<%
	MeetingCommand.retrieveMeetingForCaregiver(request, response);
	String timezone = WebUtil.getCurrentDateTimeZone();
	
	WebAppContext ctx = WebAppContext.getWebAppContext(request);
	
	String meetingCode = ctx.getMeetingCode();
	String patientLastName = ctx.getPatientLastName();
	String nocache = ctx.getNocache();
	String meetingId = ctx.getGuestMeetingId();

%>

<div class="sub-banner">
  <div class="heading">Your Video Visits for Today</div>
  <div class="links">
  	<!-- US31770 -->
    <a href="javascript:getGuestMeetings();">Refresh page</a>
    <!-- US31770 -->
    <span>|</span>
    <a href="mdohelp.htm" target="_blank">Help</a>
  </div>
</div>
<!-- US31768 -->
<div class="my-meetings-no-meetings-grid my-meets-grid">
  <div id="landing-portal-ready" class="guestPortalReady my-meetings-grid" style="width:90%; margin-top:0px; font-family:Avenir Next, sans-serif;">
  
  </div>
  <div id="landing-portal-none" class="no-meetings-grid display-none-cls">
		<p>You do not have a video visit scheduled in the next 15 minutes. Please check back later.</p>
	</div>
</div>
<!-- US31768 -->
<input type="hidden" id="tz" value="<%=timezone%>" /> 
<input type="hidden" id="meetingCode" value="<%=meetingCode%>" /> 
<input type="hidden" id="patientLastName" value="<%=patientLastName%>" /> 
<input type="hidden" id="nocache" value="<%=nocache%>" /> 
<input type="hidden" id="meetingId" value="<%=meetingId%>" /> 
