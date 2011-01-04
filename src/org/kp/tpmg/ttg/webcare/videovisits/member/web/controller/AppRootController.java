package org.kp.tpmg.ttg.webcare.videovisits.member.web.controller;

import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.EnvironmentCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.command.WebAppContextCommand;
import org.kp.tpmg.ttg.webcare.videovisits.member.web.context.WebAppContext;
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

	public AppRootController() {
		ResourceBundle rbInfo = ResourceBundle.getBundle("configuration");
		megaMeetingURL = rbInfo.getString ("MEGA_MEETING_URL");
		
	}
	
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		WebAppContext ctx = WebAppContext.getWebAppContext(request);
		if (ctx == null){
			ctx = WebAppContextCommand.createContext(request, "0");
			WebAppContext.setWebAppContext(request, ctx);
			ctx.setMegaMeetingURL(megaMeetingURL);

		}
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
