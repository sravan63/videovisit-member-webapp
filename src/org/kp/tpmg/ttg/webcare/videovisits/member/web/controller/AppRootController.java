package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.EnvironmentCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.WebAppContextCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.context.WebAppContext;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.FaqParser;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.IconPromoParser;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.PromoParser;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.VideoLinkParser;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.faq;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.iconpromo;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.promo;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.parser.videolink;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.MeetingCommand;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class AppRootController implements Controller {

	public static Logger logger = Logger.getLogger(AppRootController.class);

	private WebAppContextCommand webAppContextCommand;
	private EnvironmentCommand environmentCommand;
	private String contextIdParameter;
	private String homePageRedirect;
	private String viewName;
	private String navigation;
	private String subNavigation;
	private String megaMeetingURL = null;
	private String megaMeetingMobileURL = null;
	private String clinicianSingleSignOnURL = null;
	
	public AppRootController() {
		ResourceBundle rbInfo = ResourceBundle.getBundle("configuration");
		megaMeetingURL = rbInfo.getString ("MEGA_MEETING_URL");	
		megaMeetingMobileURL = rbInfo.getString ("MEGA_MEETING_MOBILE_URL");	
		clinicianSingleSignOnURL = rbInfo.getString ("CLINICIAN_SINGLE_SIGNON_URL");	
		
		
	}
	
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		logger.info("In AppRootController");
		WebAppContext ctx = WebAppContext.getWebAppContext(request);
		if (ctx == null){
			logger.info("context is null");
			faq f = FaqParser.parse();
			List<promo> promos = PromoParser.parse();
			List<iconpromo> iconpromos = IconPromoParser.parse();
			videolink videoLink = VideoLinkParser.parse();
			ctx = WebAppContextCommand.createContext(request, "0");
			WebAppContext.setWebAppContext(request, ctx);
			ctx.setMegaMeetingURL(megaMeetingURL);	
			ctx.setMegaMeetingMobileURL(megaMeetingMobileURL);
			ctx.setClinicianSingleSignOnURL(clinicianSingleSignOnURL);
			ctx.setFaq(f);
			ctx.setPromo(promos);
			ctx.setIconPromo(iconpromos);
			ctx.setVideoLink(videoLink);
		}
		else
			logger.info("Context is not null");
		
		//Set Plugin Data to Context - uncomment this once IE activex issues is resolved for plugin upgrade
		//if(ctx != null && ctx.getVendorPlugin() == null){
			//String pluginJSON = MeetingCommand.getVendorPluginData(request, response);
			//logger.info("AppRootController: Plugin data in context has been set: " + pluginJSON);
		//}
		ModelAndView modelAndView = new ModelAndView(getViewName());
		getEnvironmentCommand().loadDependencies(modelAndView, getNavigation(), getSubNavigation());
		return (modelAndView);
	}

	public WebAppContextCommand getWebAppContextCommand() {
		return webAppContextCommand;
	}

	public void setWebAppContextCommand(WebAppContextCommand webAppContextCommand) {
		this.webAppContextCommand = webAppContextCommand;
	}

	public EnvironmentCommand getEnvironmentCommand() {
		return environmentCommand;
	}

	public void setEnvironmentCommand(EnvironmentCommand environmentCommand) {
		this.environmentCommand = environmentCommand;
	}

	public String getContextIdParameter() {
		return contextIdParameter;
	}

	public void setContextIdParameter(String contextIdParameter) {
		this.contextIdParameter = contextIdParameter;
	}

	public String getHomePageRedirect() {
		return homePageRedirect;
	}

	public void setHomePageRedirect(String homePageRedirect) {
		this.homePageRedirect = homePageRedirect;
	}
	public String getViewName() {
		return viewName;
	}
	
	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	
	public String getNavigation() {
		return navigation;
	}
	
	public void setNavigation(String navigation) {
		this.navigation = navigation;
	}
	
	public String getSubNavigation() {
		return subNavigation;
	}
	
	public void setSubNavigation(String subNavigation) {
		this.subNavigation = subNavigation;
	}
	

}
