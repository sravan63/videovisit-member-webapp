import React from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import Footer from '../footer/footer';
import { connect } from 'react-redux';
import axios from 'axios';

//import * as main from '../../miscellaneous/test'

import './login.less';

class Login extends React.Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.state = { username: '', password: '', userDetails: {} };
        this.getLoginUserDetails = this.getLoginUserDetails.bind(this);
    }
    getLoginUserDetails() {
        localStorage.clear();
        axios.post('/videovisit/ssosubmitlogin.json?username=' + this.state.username + '&password=' + this.state.password, {}).then((response) => {
            if (response && response.data && response.data.statusCode && response.data.statusCode == '200' && response.data.data && response.data.data.memberInfo && response.data.data.ssoSession) {
                var data = response.data.data.memberInfo;
                data.isTempAccess = false;
                data.ssoSession = response.data.data.ssoSession;
                localStorage.setItem('userDetails', JSON.stringify(data));
                this.props.history.push('/secure/myMeetings');
            }
        }, (err) => {
            console.log(err);
        });
    }
    redirectToTempAccessPage() {
        //main.bodyLoaded();
        this.props.history.push('/tempaccess');
    }
    handleChange(key, event) {
        //var innerObj = this.state.innerObj;
        //innerObj.obj2 = event.target.value;
        //this.setState({innerObj});//setting inner level property
        //this.setState({[key]: event.target.value});
        this.setState({
            [key]: event.target.value });
    }
    render() {
        return (
            <div id='container' className="ssologin-page">
		<Header/>
		<Sidebar/>		
			 <div className="main-content">
						<div className="row">
							<div className="col-12 text-right help-icon p-0">
								<small><a href="javascript:void(0)">Help</a></small>
							</div>
						</div>
						<div className="row mt-5">
							<div className="col-12">
								<h3 className="member-head-msg">Please sign on for your Video Visit</h3>
								<p>Children age 11 or younger must have a parent or legal guardian with them during the Video Visit.</p>
							</div>
						</div>
					<div className="row mt-1 mb-5">
						<form class="col-sm-12">
							<div className="form-group row">
								<label for="lastName" className="col-md-2 col-sm-3 col-form-label">Patient's Last Name</label>
								<div className="col-sm-4">
								<input type="text" className="form-control rounded-0 p-0 shadow-none no-outline" id="plname" />
								</div>
							</div>
							<div className="form-group row">
								<label for="medicalRecordNumber" className="col-md-2 col-sm-3 col-form-label">Medical Record Number</label>
								<div className="col-sm-4">
								<input type="text" className="form-control rounded-0 p-0 shadow-none outline-no" id="mrn" />
								</div>
							</div>
							<div className="form-group row">
								<label for="dateOfBirth" className="col-md-2 col-sm-3 col-form-label">Date of Birth</label>
								<div className="col-md-2 col-sm-3">
									<input type="text" className="form-control rounded-0 shadow-none outline-none" id="dob-month" placeholder="mm" />
								</div>
								<div className="col-md-2 col-sm-3">
									<input type="text" className="form-control rounded-0 shadow-none" id="dob-year" placeholder="yyyy" />
								</div>
							</div>
							<div className="form-group row mt-5">
								<div className="col-sm-4">
								</div>
								<div className="col-sm-2">
								<input type="submit" name="login" value="Sign On" className="form-control rounded-0 p-0 shadow-none login-submit" id="login" />
								</div>
							</div>
						</form>
					</div>
					<Footer/>
			</div>  
		 </div>
        );
    }
}

export default Login;