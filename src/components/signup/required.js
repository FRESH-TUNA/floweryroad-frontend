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
        this.errorHandling = this.errorHandling.bind(this)
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
        }).catch((error) => {
            this.errorHandling(error.status)
        })
    }

    errorHandling(status) {
        if(status === 401)
            alert('비밀번호나 이메일이 잘못되었습니다!')
        else if(
            this.state.password1 !== '' && 
            this.state.password2 !== '' &&
            this.state.password1 !== this.state.password2){
                alert('비밀번호와 재입력 비밀번호가 일치하지 않습니다.\n')
        }
        else {
            let error = '다음 필드가 비어있습니다!\n'
            if(this.state.email === '')
                error += '이메일\n'
            if(this.state.password1 === '')
                error += '비밀번호\n'
            if(this.state.password2 === '')
                error += '재입력 비밀번호\n'
            alert(error)
        }
    }

    render() {
        return (
            <div className="signup">
                <div className="body">
                    <h1>조인 어스</h1>
                    <div className="input-box">
                        <input type="text" placeholder="email" name="email" onChange={(event) => this.handleInputChange(event)}/>
                        <input type="password" placeholder="password" name="password1" onChange={(event) => this.handleInputChange(event)}/>
                        <input type="password" placeholder="repeat password"  name="password2" onChange={(event) => this.handleInputChange(event)}/>
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