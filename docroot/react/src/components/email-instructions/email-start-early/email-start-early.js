import React, { Component } from "react";
import BackendService from "../../../services/backendService";
import './email-start-early.less';
import Utilities from '../../../services/utilities-service.js';
import GlobalConfig from "../../../services/global.config";
import PermanenteHeader  from '../../../assets/email/pm-tpmg-blue.svg';
import Logo from '../../../assets/email/kp-logo.png';
import FooterLogo from '../../../assets/email/pm-tpmg-white.webp';

class emailStartEarly extends Component {
    constructor(props) {
        super(props);
        this.state = {emailContentDetails:props.data,staticData:{}};
    }

    componentDidMount() {
      let data = require('../../../lang/'+this.state.emailContentDetails.lang+'.json');
      this.setState({
          staticData: data.email.startEarly
      });
    }
    getHoursAndMinutes(millis, type,lang) {
        if (!millis) {
            return;
        }
        return Utilities.formatDateAndTimeForEmails(new Date(parseInt(millis)), type,lang);
    }
    
    render() { 
      let details = this.state.staticData; 
      return ( <div>
        <div className="container">
                          <div className="row">
                                  
                                  <div className="col-md-12">
                                  <h3 className="instruct-header">{details.heading} </h3>
                                  {details.subHeading} {this.getHoursAndMinutes(this.state.emailContentDetails.meetingTimeStamp,'date',this.state.emailContentDetails.lang)}{details.atText}{this.getHoursAndMinutes(this.state.emailContentDetails.meetingTimeStamp,'time',this.state.emailContentDetails.lang)} {details.timeZone}{details.subHeading2}</div>
                                  <div className="col-md-12 mt-3">{details.subHeading3} </div>
                                  <div className="col-md-12 mb-2"><a href="http://kpdoc.org/mdoapp" target="_blank" className="email-data-link">{details.subHeading4}</a> {details.subHeading5} <a href="http://kpdoc.org/videovisits" target="_blank" className="email-data-link">{details.subHeading10}</a></div>                                  
                                  <div className="visit-rules">
                                  <ul>
                                    <li style={{ fontWeight:'bold' }}>{details.rule1}</li>
                                    <li>{details.rule2}</li>
                                    <li>{details.rule3}</li>
                                    <li style={{marginBottom:'12px'}}>{details.rule4}</li>
                                  </ul>
                                </div>
                                
                          </div>
                          <div className="row">
                            <div className="col-md-12 text-center mb-4"><a href={this.state.emailContentDetails.meetingURL} target="_blank" className="start-visit">{details.startVisit}</a></div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">{details.needHelp1}{details.subHeading6}</div>
                            <div className="col-md-12">{details.needHelp1}{details.subHeading7}</div>
                            <div className="col-md-12 mb-4"><a href={this.state.emailContentDetails.guestHelpUrl} className="email-data-link" target="_blank">{details.subHeading8} </a></div>
                          </div>
                          <div className="row">
                            <div className="col-md-12"><a href={this.state.emailContentDetails.signInUrl} className="email-data-link" target="_blank">{details.needHelp1} </a>{details.needHelp2}</div>
                          </div>
          </div>
    </div>) }
  }
  

export default emailStartEarly;
