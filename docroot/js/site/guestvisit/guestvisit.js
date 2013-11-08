$(document).ready(function() {

    // To access the GET variable
    function $_GET(q,s) {
        s = (s) ? s : window.location.search;
        var re = new RegExp('&'+q+'=([^&]*)','i');
        return (s=s.replace(/^\?/,'&').match(re)) ? s=s[1] : s='';
    }

	 // Grab the GET variable
	var iframedata = $_GET('iframedata');
	
	
	// INITIALIZE Join now modal.
	initializeJoinNowModal();
	initializeQuitMeetingModal();
    
    showJoinNowModal(decodeURIComponent(iframedata));
    
    // Quit meeting button on the Quit Meeting modal 
    $('#quitMeetingGuestId').click(function() { 
    	$("#quitMeetingGuestModal").dialog( "open" );
    });
   
    $('#quitMeetingGuestNo').click(function(){
    	$("#quitMeetingGuestModal").dialog( "close" );
    });

    $('#quitMeetingGuestYes').click(function(){
        var quitMeetingIdData = 'meetingCode=' + gup("meetingCode") +  '&caregiverId=' + $(this).attr('caregiverId')  + '&meetingId=' + $(this).attr('quitmeetingid');
        
        $.ajax({
            type: 'POST',
            url: VIDEO_VISITS.Path.guestvisit.quitmeeting,
            data: quitMeetingIdData,
            success: function(returndata) {
                //window.location.replace(VIDEO_VISITS.Path.guestvisit.logout);
            	window.location.replace(VIDEO_VISITS.Path.guestvisit.logout);
            },
            //error receives the XMLHTTPRequest object, a string describing the type of error and an exception object if one exists
            error: function(theRequest, textStatus, errorThrown) {
                window.location.replace(VIDEO_VISITS.Path.guestglobal.error);
            }
        });
        return false;
    });
    
    
});

var GuestReadyPage =
{
		keepALiveDelay: ( 5 * 60 * 1000),
		keepALiveTimerId:'',
	
		keepALive: function()
		{
			GuestReadyPage.keepALiveClearTimeOut();
			GuestReadyPage.keepALiveTimerId = setTimeout( GuestReadyPage.keepALiveAction, GuestReadyPage.keepALiveDelay );
		},
		keepALiveClearTimeOut: function()
		{
			if (GuestReadyPage.keepALiveTimerId)
				clearTimeout( GuestReadyPage.keepALiveTimerId );
		},
		keepALiveAction: function()
		{
			$.post(VIDEO_VISITS.Path.guestready.keepALive, {},function(data){	
				
			});
			GuestReadyPage.keepALive();
		}
}


function showJoinNowModal(encodedHrefLocation){

	// Grab the GET variable
    var iframedata = encodedHrefLocation;
//  <!-- Commented by Srini  08/27 -->	
    // Load it into the iframe's source attribute'
   // $("iframe").attr('src', decodeURIComponent(iframedata));
    $("iframe").attr('src', iframedata);
    
    var finalHeight = $(window).height();
	$('#guest-join-now-modal').css({"height": finalHeight*0.90});
	
    $("#guest-join-now-modal").dialog( "open" );
    GuestReadyPage.keepALive();
    
    return false;
}




function initializeJoinNowModal(){
	$("#guest-join-now-modal").dialog({
	      autoOpen: false,
	      width: "98%",
	      modal: true,
	      dialogClass:'hide-modal-title'
	});

}



function initializeQuitMeetingModal(){

	$("#quitMeetingGuestModal").dialog({
		 autoOpen: false,
	      width: "23%",
	      height: 160,
	      modal: true,
	      resizable:false,
	      dialogClass:'hide-modal-title'
	});
    
    
    
}

