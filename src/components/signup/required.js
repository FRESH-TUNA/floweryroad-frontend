import React from 'react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'

import * as Auth from '../../actions/authAction';
import '../../css/routes/signup.css'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": '',
            "password1": '',
            "password2": '',
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.signup = this.signup.bind(this)
    }

    handleInputChange(event) { this.setState({[event.target.name]: event.target.value}) }

    signup() {
        axios({
            method: 'post', url: '/signup', data: this.state,
        }).then((response) => {
            this.props.Auth.obtainTokenSuccess(response.data)
        }).then(() => {
            alert('회원가입이 완료되었습니다!')
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className="signup">
                <div className="body">
                    <h1>조인 어스</h1>
                    <div className="input-box">
                        <input type="text" placeholder="email" name="email" onChange={(event) => this.handleInputChange(event)}/>
                        <input type="text" placeholder="password" name="password1" onChange={(event) => this.handleInputChange(event)}/>
                        <input type="text" placeholder="repeat password"  name="password2" onChange={(event) => this.handleInputChange(event)}/>
                    </div>
                    <button onClick={this.signup}>회원가입</button>
                    {/* <button onClick={this.props.testChangeComponent}>회원가입</button> */}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        loading: state.auth.pending,
        error: state.auth.error,
        isLogin: state.auth.isLogin,
        access: state.auth.data.access
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(Signup));