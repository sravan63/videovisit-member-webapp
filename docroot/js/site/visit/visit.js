$(document).ready(function() {

    // To access the GET variable
    function $_GET(q,s) {
        s = (s) ? s : window.location.search;
        var re = new RegExp('&'+q+'=([^&]*)','i');
        return (s=s.replace(/^\?/,'&').match(re)) ? s=s[1] : s='';
    }

    // Grab the GET variable
    var iframedata = $_GET('iframedata');
    
    // Load it into the iframe's source attribute'
    $("iframe").attr('src', decodeURIComponent(iframedata));

    // Setup the quit meeting modal and make it draggable
    $( '#quitMeetingModal' ).jqm().jqDrag('.jqDrag');

    $('#quitMeetingLink').click(function(){
        var quitMeetingIdData = 'meetingId=' + $(this).attr('quitmeetingid');
        $.ajax({
            type: 'POST',
            url: VIDEO_VISITS.Path.visit.quitmeeting,
            data: quitMeetingIdData,
            success: function(returndata) {
                window.location.replace(VIDEO_VISITS.Path.visit.logout);
            },
            //error receives the XMLHTTPRequest object, a string describing the type of error and an exception object if one exists
            error: function(theRequest, textStatus, errorThrown) {
                window.location.replace(VIDEO_VISITS.Path.global.error);
            }
        });
        return false;
    })
});

