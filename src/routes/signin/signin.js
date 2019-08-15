import React from 'react'
import '../../css/routes/signin.css'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Auth from '../../actions/authAction';
import axios from 'axios'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                "email": null,
                "password": null,
            }
        };
        this.login = this.login.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.errorHandling = this.errorHandling.bind(this)
    }

    async login() {
        await this.props.Auth.obtainToken(this.state.userData)
        this.props.error ? 
        this.errorHandling(this.props.error) :
        this.props.history.push('/')
    }
    errorHandling(error) {
        console.log(error)
    }
    onChangeHandler(event) {
        var newState = {...this.state}

        event.target.placeholder === "email" ?
        newState.userData.email = event.target.value :
        newState.userData.password = event.target.value

        this.setState({newState})
    }

    render() {
        return (
            <div className="signin">
                <div className="body">
                    <h1>풀꽃길</h1>
                    <div className="input-box">
                        <input type="text" placeholder="email" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="text" placeholder="password" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                    </div>
                    <button className="login-button" onClick={this.login}>로그인</button>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => ({
        loading: state.auth.pending,
        error: state.auth.error,
        isLogin: state.auth.isLogin
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(Signin));