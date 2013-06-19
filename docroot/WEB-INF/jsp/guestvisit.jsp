	
<div id="guest-join-now-modal" class="join-now-modal" style="display:none" title="Join Now">
	<%@ include file="guestJoinNowModal.jsp" %>
</div>


<!--  Quit Meeting dialog -->
<div id="quitMeetingGuestModal"  title="Quit Meeting">
	<div class="modalWrapper">
		<h2><span>Quit Meeting</span></h2>
		<p class="modalParagraph">Are you sure you want to quit this meeting?</p>
		<div class="pagination">
			<ul>
				<li><a id="quitMeetingGuestNo" class="button">No &rsaquo;&rsaquo;</a></li>
				<li><a id="quitMeetingGuestYes" class="button" quitmeetingid="${WebAppContext.meetings[0].meetingId}" caregiverId="${param.caregiverId}">Yes &rsaquo;&rsaquo;</a></li>
			</ul>
		</div>
	</div>
</div>

