package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.MeetingCommand;
import org.springframework.web.servlet.ModelAndView;

public class LaunchMeetingForMemberDesktopController extends SimplePageController {

	public static Logger logger = Logger.getLogger(UserPresentInMeetingController.class);
	private static String JSONMAPPING = "jsonData";

	public ModelAndView handlePageRequest(ModelAndView modelAndView, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String data = null;
		logger.info("Entered LaunchMeetingForMemberDesktopController handlePageRequest");
		try {
			data = MeetingCommand.launchMeetingForMemberDesktop(request, response);
			modelAndView.setViewName(JSONMAPPING);
			modelAndView.addObject("data", data);
		} catch (Exception e) {
			logger.error("System Error" + e.getMessage(), e);
		}
		logger.info("Exiting LaunchMeetingForMemberDesktopController-handleRequest-data=" + data);
		return (modelAndView);
	}
}
