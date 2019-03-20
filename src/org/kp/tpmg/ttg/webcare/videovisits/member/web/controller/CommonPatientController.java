package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import static org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.WebUtil.LOG_ENTERED;
import static org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.WebUtil.LOG_EXITING;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.EnvironmentCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.context.WebAppContext;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.data.VideoVisitParamsDTO;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.utils.WebUtil;
import org.kp.tpmg.videovisit.model.meeting.MeetingDO;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public abstract class CommonPatientController implements Controller {

	public final Logger logger = Logger.getLogger(getClass());
	
	private static final String JSONMAPPING = "jsonData";

	private EnvironmentCommand environmentCommand;
	private String vidyoUrl;
	private String hostName;

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		logger.info(LOG_ENTERED);
		try {
			final WebAppContext ctx = WebAppContext.getWebAppContext(request);
			if (ctx != null) {

				final VideoVisitParamsDTO videoVisitParams = new VideoVisitParamsDTO();
				videoVisitParams.setWebrtc(String.valueOf(WebUtil.isChromeOrFFBrowser(request)));
				final List<MeetingDO> meetings = ctx.getMyMeetings();
				if (meetings != null) {
					for (MeetingDO meeting : meetings) {
						if (meeting != null && meeting.getMeetingId().equals(request.getParameter("meetingId"))) {
							videoVisitParams.setHostFirstName(meeting.getHost().getFirstName());
							videoVisitParams.setHostLastName(meeting.getHost().getLastName());
							if (meeting.getHost().getTitle() != null && meeting.getHost().getTitle().length() > 0) {
								videoVisitParams.setHostTitle(meeting.getHost().getTitle());
							} else {
								videoVisitParams.setHostTitle("");
							}
							videoVisitParams.setPatientFirstName(meeting.getMember().getFirstName());
							videoVisitParams.setPatientLastName(meeting.getMember().getLastName());
							videoVisitParams.setPatientMiddleName(meeting.getMember().getMiddleName());
							videoVisitParams.setParticipant(meeting.getParticipant());
							videoVisitParams.setCaregiver(meeting.getCaregiver());
							Calendar cal = Calendar.getInstance();
							cal.setTimeInMillis(Long.parseLong(meeting.getMeetingTime()));
							SimpleDateFormat sfdate = new SimpleDateFormat("MMM dd");
							SimpleDateFormat sftime = new SimpleDateFormat("hh:mm a");
							videoVisitParams.setMeetingDate(sfdate.format(cal.getTime()));
							videoVisitParams.setMeetingTime(sftime.format(cal.getTime()));
							videoVisitParams.setVendor(meeting.getVendor());
						}
					}
				}

				if ("Y".equalsIgnoreCase(request.getParameter("isMember"))) {
					videoVisitParams.setVidyoUrl(request.getParameter("vidyoUrl"));
					videoVisitParams.setUserName(request.getParameter("attendeeName"));
					videoVisitParams.setMeetingId(request.getParameter("meetingId"));
					videoVisitParams.setGuestName(request.getParameter("guestName"));
					videoVisitParams.setIsProvider(request.getParameter("isProvider"));
					videoVisitParams.setGuestUrl(request.getParameter("guestUrl"));
					videoVisitParams.setIsMember("true");
					videoVisitParams.setIsProxyMeeting(request.getParameter("isProxyMeeting"));
					ctx.setVideoVisit(videoVisitParams);
				} else {
					videoVisitParams.setVidyoUrl(request.getParameter("vidyoUrl"));
					videoVisitParams.setMeetingId(request.getParameter("meetingId"));
					videoVisitParams.setMeetingCode(request.getParameter("meetingCode"));
					videoVisitParams.setCaregiverId(request.getParameter("caregiverId"));
					videoVisitParams.setUserName(request.getParameter("guestName"));
					videoVisitParams.setGuestName(request.getParameter("guestName"));
					videoVisitParams.setIsProvider(request.getParameter("isProvider"));
					videoVisitParams.setGuestUrl(request.getParameter("guestUrl"));
					videoVisitParams.setIsMember("false");

					ctx.setVideoVisit(videoVisitParams);
				}

				logger.debug("Video Visit data:" + videoVisitParams.toString());
			}
			logger.info("bandwidth:" + ctx.getBandwidth());
		} catch (Exception e) {
			logger.error("System Error" + e.getMessage(), e);
		}
		
		final ModelAndView modelAndView = new ModelAndView(JSONMAPPING);
		logger.info(LOG_EXITING);
		return modelAndView;
	}

	/**
	 * @return the environmentCommand
	 */
	public EnvironmentCommand getEnvironmentCommand() {
		return environmentCommand;
	}

	/**
	 * @param environmentCommand
	 *            the environmentCommand to set
	 */
	public void setEnvironmentCommand(EnvironmentCommand environmentCommand) {
		this.environmentCommand = environmentCommand;
	}

	/**
	 * @return the vidyoUrl
	 */
	public String getVidyoUrl() {
		return vidyoUrl;
	}

	/**
	 * @param vidyoUrl
	 *            the vidyoUrl to set
	 */
	public void setVidyoUrl(String vidyoUrl) {
		this.vidyoUrl = vidyoUrl;
	}

	/**
	 * @return the hostName
	 */
	public String getHostName() {
		return hostName;
	}

	/**
	 * @param hostName
	 *            the hostName to set
	 */
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

}
