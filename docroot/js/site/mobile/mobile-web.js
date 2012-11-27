/* AJAX Server requests */
var VIDEO_VISITS_MOBILE = {
    jQueryDocument : $(document),
    jQueryWindow   : $(window)
};

VIDEO_VISITS_MOBILE.Path = {
	    global : {
	        error : 'error.htm',
	        expired : 'logout.htm'
	    },
	    login : {
	        ajaxurl : 'submitlogin.json'
	    }
};
/*END - AJAX Server requests  */



// Hides address bar on page load
/mobile/i.test(navigator.userAgent)
&& !window.location.hash
&& setTimeout(function () {
window.scrollTo(0,0);
}, 0);


function modalShow(){
	$("#modal").removeClass("hideMe").hide().fadeIn(200);
	return false;
}

function modalHide(){
	$("#modal").fadeOut(200);
	return false;
}

function scrollMe(){
	$('html, body').animate({scrollTop:0}, 'slow');
	return false;
}

function hidesAppAlert (){

$(".app-alert").addClass("hide-me");
$("#login-form").removeClass("hide-me");
	// return false;
}



$(document).ready(function() {
	$(".modal-window .close-button").click(modalHide);
	$(".scrollup").click(scrollMe);
	// Shows and hides scroll to top button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 160) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});
	// scrolls to top for anchor page states on load
	scrollMe();
	
	$('#overlay, #modal').on('touchmove', function (event) {
		// locking these elements, so they can't be moved when dragging the div
		event.preventDefault();
	});
	
	
	// for focus and blur events
	$("form :input").focus(function() {
		$(this).parent().addClass("form-focus");
	}).blur(function() {
			$(this).parent().removeClass("form-focus");
	});

	// Validations on blur of some text fields
	$("#last_name,#mrn,#birth_year").blur(function (event) {
		
		var elementId = event.target.id;
		var value = $(this).val();
		var errorMessage = "";
		
		// Clear the global error if any
		$("#globalError").addClass("hide-me").removeClass("error");
		
		if(elementId == "last_name"){
			errorMessage = "name entered doesn't match our records (sample message)";
		}
		else if(elementId == "mrn"){
			errorMessage = "invalid number (sample message)";
		}
		else if(elementId == "birth_year"){
			errorMessage = "Please enter year in a 4-digit format (for example: 1952) (sample msg)";
			if (value == "99") {
				
				$(this).next(".failmessage").text(errorMessage);
				$(this).next(".failmessage").removeClass("hide-me");
				$(this).parent().addClass("error");
			}
			else {
				$(this).next(".failmessage").addClass("hide-me");
				$(this).parent().removeClass("error");
			}
		}
		
	});

	
	// Click of "I have it Installed button"
	$("#btn-i-have-it").click(hidesAppAlert);
	
	
	// Login button submit click
	$("#login-submit").click(function(event) {
		event.preventDefault();
		loginSubmit();
	});
	
	$(".button-launch-visit").click(function(event) {	
		event.preventDefault();
		
		var megaMeetingId = $(this).attr("megameetingid");
		var lastName = $(this).attr("lastname");
		var firstName = $(this).attr("firstname");

		launchVideoVisit(megaMeetingId, lastName, firstName);

	});
	
});

/**
 * Called on the click of the Launch button
 * @param megaMeetingId
 * @param lastName
 * @param firstName
 */
function launchVideoVisit(megaMeetingId, lastName, firstName){
	var name = lastName + " " + firstName;
	var megaMeetingUrl = "tpmg:kaiserm3.videoconferencinginfo.com/guest/&id=" + megaMeetingId  +  "&name=" + name + "&title=Kaiser&go=1&agree=1"; 
	window.location.replace(megaMeetingUrl);
	
}

/**
 * Called on the click of the Sign in button
 * @param megaMeetingId
 * @param lastName
 * @param firstName
 */
function loginSubmit(){
	
	
    // Prepare data from pertinent fields for POSTing
    // Format birth_month
    var birth_month = $('input[name=birth_month]').val();
    if (birth_month.length == 1) {
        birth_month = "0" + birth_month;
    }
    // Format birth_day
    var birth_day = $('input[name=birth_day]').val();
    if (birth_day.length == 1) {
        birth_day = "0" + birth_day;
    }
    
    // Parameters sent to the server
	var postdata = 'last_name=' + $('input[name=last_name]').val() + '&mrn=' + $('input[name=mrn]').val() + '&birth_month=' + birth_month + '&birth_year=' + $('input[name=birth_year]').val() + '&birth_day=' + birth_day ;

	$.ajax({
        type: "POST",
        url: VIDEO_VISITS_MOBILE.Path.login.ajaxurl,
        data: postdata, 
        success: function(returndata) {
            returndata = $.trim(returndata);
           
            var LOGIN_STATUS_SUCCESS = "1";
        	var LOGIN_STATUS_PATIENT_NOT_FOUND_ERROR = "3";
        	var LOGIN_STATUS_CODE_ERROR = "4";
        	
            switch (returndata) {
                case LOGIN_STATUS_SUCCESS:
                	window.location.replace("mobilepatientmeetings.htm");
                    break;

               case LOGIN_STATUS_PATIENT_NOT_FOUND_ERROR:
            	  
            	   $("#globalError").text("We could not find this patient.  Please try entering the information again.");
            	   $("#globalError").removeClass("hide-me").addClass("error");

                    break;
                // TODO- Do we ge this value ?
                case LOGIN_STATUS_CODE_ERROR:
                	$("#globalError").text("The code entered did not match. Please try again (you can click the code image to generate a new one if needed).");
             	   	$("#globalError").removeClass("hide-me").addClass("error");
                    break;
                default:
                	$("#globalError").text("There was an error submitting your login.");
         	   		$("#globalError").removeClass("hide-me").addClass("error");
                   
                    break;
            }

        },
        error: function() {
        	$("#globalError").text("There was an error submitting your login.");
 	   		$("#globalError").removeClass("hide-me").addClass("error");
            
            
        }
    });
	
	return false;
}



