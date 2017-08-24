package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.MeetingCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.context.WebAppContext;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.WebUtil;

import javax.servlet.http.*;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;

public class SubmitLoginController extends SimplePageController {
	public static Logger logger = Logger.getLogger(SubmitLoginController.class);
	private static String JSONMAPPING = "jsonData";

	public ModelAndView handlePageRequest(ModelAndView modelAndView, HttpServletRequest request, HttpServletResponse response) throws Exception
	{
		
		 logger.info("Entering SubmitLoginController");
		String data = null;
		WebAppContext ctx  	= WebAppContext.getWebAppContext(request);

		try
		{
			if(ctx != null && StringUtils.isBlank(ctx.getWebrtcSessionManager())){
				ctx.setWebrtcSessionManager(WebUtil.VIDYO_WEBRTC_SESSION_MANGER);
			}
			//verify member from web service and perform meeting analysis.
			 data = MeetingCommand.verifyMember(request, response);
			 
			 logger.info("SubmitLoginController:data:" + data);
	}
		catch (Exception e)
		{
			// log error
			logger.error("System Error" + e.getMessage(),e);
		}
		//put data into buffer
		logger.info("SubmitLoginController-handleRequest-data="+data);
		modelAndView.setViewName(JSONMAPPING);
		modelAndView.addObject("data", data);
		return (modelAndView);
	}
}

