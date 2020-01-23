import React from "react";
import BackendService from '../../services/backendService.js';

import './header.less';

class header extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
                userDetails: {}
            };
            this.signOffMethod = this.signOffMethod.bind(this);
        }
        componentWillMount() {
            //if(this.props.userDetails && this.props.userDetails.userDetails){
            if (localStorage.getItem('userDetails')) {
                const data = JSON.parse(localStorage.getItem('userDetails'));
                this.state.userDetails = data;
                //const data = this.props.userDetails.userDetails;
                this.setState({
                    name: data.lastName.toLowerCase() + ', ' + data.firstName.toLowerCase()
                });
            }
        }
        signOffMethod() {
            localStorage.clear();
            var loginType;
            var headers = {},
                data = this.state.userDetails;
            if (data.isTempAccess) {
                headers.authtoken = data.ssoSession;
                loginType = "tempAccess"
            } else {
                headers.ssoSession = data.ssoSession;
                loginType = "sso";
            }
            BackendService.logout(headers, loginType).subscribe((response) => {
                if (response.data != "" && response.data != null && response.data.statusCode == 200) {
                    this.props.history.push('/login');
                } else {
                    this.props.history.push('/login');
                }
            }, (err) => {
                this.props.history.push('/login');

            });


        }
        render() {
                return (
                        <div className = "container-fluid">
                <div className = "row header-content">
                <div className = "col-md-8 banner-content">
                <div className = "logo"> 
                </div> 
                <div className = "title" >
                <p className = "m-0" >Video Visits< /p> 
                <p className = "text-uppercase m-0 sub-title" >The Permanente Medical Group< /p> 
                < /div > 
                </div> 
                <div className = "col-md-4 text-right user-details" >
                <ul >
                <li className = "text-capitalize" > 
                {this.state.name ? this.state.name : ''} 
                </li>
                 <li className = "text-capitalize" > 
                 {this.state.name ? '|' : ''} 
                 < /li> 
                 <li > 
                 < a href = "https://mydoctor.kaiserpermanente.org/ncal/videovisit/#/faq/mobile"
                className = "help-link"
                target = "_blank" >Help< /a>
                </li >
                <li > 
                {this.state.name ? '|' : ''} < /li> 
                <li className = "text-capitalize" > 
                {this.state.name ? < a className = "sign-off" onClick = {this.signOffMethod}>Sign out< /a> :''}
                </li >
                </ul> 
                < /div >
                </div> 
                < /div >
                );
            }
        }


        export default header;