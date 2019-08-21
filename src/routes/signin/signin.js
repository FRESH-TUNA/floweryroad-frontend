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
                "email": '',
                "password": '',
            }
        };
        this.login = this.login.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.errorHandling = this.errorHandling.bind(this)
        this.validater = this.validater.bind(this)
    }
    validater() {
        let error = '다음 필드가 비어있습니다!\n'
        let errorState = false

        if(this.state.userData.email === '') {
            error += '이메일\n'
            errorState = true
        }
            
        if(this.state.userData.password === '') {
            error += '비밀번호\n'
            errorState = true
        }
        if(errorState)
            return error
        else
            return null
    }
    async login() {
        const isValid = this.validater()
        if(isValid === null) {
            await this.props.Auth.obtainToken(this.state.userData)
            this.props.error ? 
            this.errorHandling() :
            this.props.history.push('/')
        }
        else
            alert(isValid)
    }
    errorHandling() {
        if(this.props.status === 401)
            alert('비밀번호나 이메일이 잘못되었습니다!')
        else {
            alert('서버 장애입니다 관리자에게 문의하세요')
        }
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
                        <input type="password" placeholder="password" 
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
        isLogin: state.auth.isLogin,
        status: state.auth.status
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(Signin));