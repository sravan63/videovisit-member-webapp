package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import org.kp.tpmg.videovisit.member.serviceapi.webserviceobject.xsd.*;
import org.kp.tpmg.webservice.client.videovisit.member.*;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.context.*;

import java.util.Date;
import java.io.*;
import javax.servlet.http.*;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import nl.captcha.Captcha;

public class SubmitLoginController extends SimplePageController {
	public static Logger logger = Logger.getLogger(SubmitLoginController.class);
	//private CaseCommand caseCommand;


	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) 
	{
		try 
		{
				String lastName  	= "";
				String mrn8Digit	= "";
				String birth_month 	= "";
				String birth_year  	= "";
				String consentVersion  = "";
				String answer		= "";
				String sessionID  	= request.getSession().getId();
				PrintWriter out 	= response.getWriter();
				WebAppContext ctx  	= WebAppContext.getWebAppContext(request);

				// DEBUG
				System.out.println("LoginController-handlePageReques 1...");
				if (request.getParameter("last_name") != null &&
						!request.getParameter("last_name").equals("")) {
					lastName = request.getParameter("last_name");
				} 
				if (request.getParameter("mrn") != null &&
						!request.getParameter("mrn").equals("")) {
					mrn8Digit = request.getParameter("mrn");
				} 
				if (request.getParameter("birth_month") != null &&
						!request.getParameter("birth_month").equals("")) {
					birth_month = request.getParameter("birth_month");
				} 
				if (request.getParameter("birth_year") != null &&
						!request.getParameter("birth_year").equals("")) {
					birth_year = request.getParameter("birth_year");
				} 
				if (request.getParameter("consentVersion") != null &&
						!request.getParameter("consentVersion").equals("")) {
					consentVersion = request.getParameter("consentVersion");
				}

				if (request.getParameter("captcha") != null &&
						!request.getParameter("captcha").equals("")) 
				{
					answer = request.getParameter("captcha");
					Captcha captcha = (Captcha) request.getSession().getAttribute(Captcha.NAME);
				    if (captcha == null || !captcha.isCorrect(answer))
				    {
				    		//don't match, return error
							System.out.println("Captcha failed. answer is=" + answer);
							//modelAndView.setViewName("login");
							//return (modelAndView);
							out.println ("4");
							return (null);
				    }	
				}
				
				// Validation  

				//VerifyMemberResponseWrapper result = verifyMember(lastName, mrn8Digit,birth_month + "-" + birth_year,	consentVersion,	sessionID);
				System.out.println("LoginController-handlePageRequest 2...");

				// simulation
				VerifyMemberResponseWrapper member = new VerifyMemberResponseWrapper();
				member.setSuccess(true);
				member.setErrorMessage("");
				MemberWSO fakemember = new MemberWSO();
				member.setResult(fakemember);
				member.getResult().setLastName(lastName);	
				member.getResult().setFirstName("John");		
				member.getResult().setMrn8Digit(mrn8Digit);		

				// Analyse Results and forward.	
																	
				//  user
				if (member.getResult().getLastName().equals("two") ||
						member.getResult().getLastName().equals("three"))
				{
					System.out.println("LoginController-handlePageRequest 5...");
					if (ctx != null)
						{
						ctx.member = member.getResult();
						}
/*
						//RetrieveMeetingResponseWrapper response = retrieveMeetingsForMember(member.getResult().getMrn8Digit(), pastMinutes, futureMinutes, sessionID);
						//MeetingWSO meetings[] = response.getResult();
						// loop through meetings 
						 
*/
						// simulation start
						RetrieveMeetingResponseWrapper result = new RetrieveMeetingResponseWrapper();												// no meeting.
						result.setSuccess(true);
						MeetingWSO meeting = new MeetingWSO();
						ProviderWSO fakeprovider = new ProviderWSO();
						meeting.setHost(fakeprovider);
						
						meeting.getHost().setFirstName("John");
						meeting.getHost().setLastName("Lim");
						meeting.getHost().setTitle("PDM");
						meeting.getHost().setImageUrl("http://www.permanente.net/kaiser/pictures/30290.jpg");
						meeting.getHost().setHomePageUrl("http://www.permanente.net/homepage/kaiser/pages/c13556-top.html");
						
						meeting.setMmMeetingName("385bne");
						
						//  simulation end
						
						// save data using WebAppContext
						if (ctx != null)
						{
							ctx.meeting = meeting;
						}
						// save data using Spring model and view
						// modelAndView.clear();
						
						// there is no meeting
						//if (result.getSuccess())
						if (member.getResult().getLastName().equals("two"))

						{
							System.out.println("LoginController-handlePageReques..8.");
							//request.getSession().setAttribute("MemberWSO", member.getResult());
							
							//modelAndView.setViewName("landingnone");
							//modelAndView.addObject("member", member);
							//return new ModelAndView ("redirect:landingnone.htm");
							out.println ("2");
							return (null); 

						}
						// there is  meeting.
						else
						{
							System.out.println("LoginController-handlePageReques...9");
							//modelAndView.setViewName("redirect:landingready.htm");
							//modelAndView.addObject("host", meeting.getHost());
							//modelAndView.addObject("member", member);
							out.println ("1");
							return (null); 
						}
				}
				else
				{
						System.out.println("LoginController-handlePageRequest 3...");
						//modelAndView.setViewName("login");
						//member.setErrorMessage("Invalid user name. Please try again.");
						out.println ("3");
						return (null);

				}
						
		}
		catch  (Exception e)
		{
			e.printStackTrace();
			//modelAndView.setViewName("help");
		}
		//getEnvironmentCommand().loadDependencies(modelAndView, getNavigation(), getSubNavigation());
		System.out.println("LoginController-handlePageReques...10");
		//return modelAndView;
		return null;
	}
}

