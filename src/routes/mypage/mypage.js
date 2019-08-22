import React from 'react'
import SearchHeader from '../../components/common/searchHeader'
import axios from 'axios'
import getQuery from 'query-string'

import '../../css/routes/mypage.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Auth from '../../actions/authAction';


class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNickname: '',
            passwordForChangeNickname: '',
            passwordForChangePassword: '',
            password1: '',
            password2: '',
        }
        this.errorHandler = this.errorHandler.bind(this)
        this.changeNickname = this.changeNickname.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.passwordChangeValidator = this.passwordChangeValidator.bind(this)
    }
    componentDidMount() {
        if(this.props.access === '' | this.props.access === null | this.props.access === undefined) {
            alert('세션이 만료되었습니다 다시로그인해주세요!')
            this.props.history.replace('/signin')
        }
    }
    onChangeHandler(event) {
        let newState = {...this.state}
        const target = event.target.name

        if(target === "nickname")
            newState.newNickname = event.target.value
        else if(target === "passwordForChangeNickname")
            newState.passwordForChangeNickname = event.target.value 
        else if(target === "passwordForChangePassword")
            newState.passwordForChangePassword = event.target.value 
        else if(target === "password1")
            newState.password1 = event.target.value 
        else if(target === "password2")
            newState.password2 = event.target.value 
        
        this.setState({...newState})
    }
    nicknameChangeValidator() {
        let error = '다음 칸들을 입력하고 다시 시도해주세요\n'
        let errorState = false;

        if(this.state.newNickname === '') {
            errorState = true
            error += '새로운 닉네임\n'
        }
        if(this.state.passwordForChangeNickname === '') {
            errorState = true
            error += '현재 패스워드\n'
        }
    
        if(errorState)
            return error
        else
            return null
    }

    passwordChangeValidator() {
        let error = '다음 칸들을 입력하고 다시 시도해주세요\n'
        let errorState = false;

        if(this.state.passwordForChangePassword === '') {
            errorState = true
            error += '현재 패스워드\n'
        }
        if(this.state.password1 === '') {
            errorState = true
            error += '새로운 패스워드\n'
        }
        if(this.state.password2 === '') {
            errorState = true
            error += '새로운 비밀번호 다시 입력\n'
        }

        if(errorState)
            return error
        else if(this.state.password1 !== this.state.password2)
            return '새로운 비밀번호와 재입력한 새로운 비밀번호가 일치하지 않습니다.\n'
        else
            return null
    }

    async errorHandler(response, func, payload) {
        if(response.status === 401) {
            if(response.data.password)
                alert('패스워드가 잘못되었습니다!')
            else if(this.props.isLogin) {
                await this.props.Auth.refreshToken()
                if(this.props.error) {
                    await this.props.Auth.logout()
                    alert('세션이 만료되었습니다 다시로그인해주세요') 
                    this.props.history.replace('/signin')
                }
                else
                    func(payload)
            }
            else
                alert('로그인 이후에 이용해주세요!') 
        }
        else
            alert('서버 장애입니다 관리자에게 문의하세요')
    }


    async changeNickname() {
        const error = this.nicknameChangeValidator()
        if(error === null) {
            const data = {
                email: this.props.email, password: this.state.passwordForChangeNickname,
                nickname: this.state.newNickname
            }
            await this.props.Auth.changeNickname(data)
            if(this.props.error)
                this.errorHandler(this.props.errorContext, this.changeNickname, null)
            else 
                alert('닉네임이 변경됬습니다!')
        }
        else
            alert(error)
    }

    changePassword() {
        const error = this.passwordChangeValidator()
        if(error === null) {
            const data = {
                email: this.props.email, password: this.state.passwordForChangePassword ,
                password1: this.state.password1 ,password2: this.state.password2
            }
            axios({
                method: 'put',
                url: '/password',
                data,
                headers: { authorization: 'Bearer ' + this.props.access },
            }).then(() => {
                this.props.Auth.logout()
            }).then((response) => {
                alert('비밀번호가 변경되었습니다! 다시 로그인 해주세요')
                this.props.history.replace('/signin')
            }).catch(error => {
                this.errorHandler(error.response, this.changePassword, data)
            })
        }
        else 
            alert(error)
    }

    render() {
        return (
            <div className="mypage" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
                <SearchHeader />
                
                <div className="change-nickname">
                    <h3>닉네임 변경</h3>
                    <h3>현재 닉네임: {this.props.nickname ? this.props.nickname : '어나니머스'}</h3>
                    <div className="input-box">
                        <input type="text" placeholder="새로운 닉네임" name="nickname"
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="현재 비밀번호" name="passwordForChangeNickname"
                            onChange={event => this.onChangeHandler(event)}
                        />
                    </div>
                    <button className="login-button" onClick={this.changeNickname}>닉네임 변경</button>
                </div>

                <div className="change-password">
                    <h3>비밀번호 변경</h3>
                    <div className="input-box">
                        <input type="password" placeholder="현재 비밀번호" name="passwordForChangePassword"
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="새로운 비밀번호" name="password1"
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="새로운 비밀번호 다시 입력" name="password2"
                            onChange={event => this.onChangeHandler(event)}
                        />
                    </div>
                    <button className="login-button" onClick={this.changePassword}>패스워드 변경</button>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        loading: state.auth.pending,
        error: state.auth.error,
        errorContext: state.auth.errorContext,
        isLogin: state.auth.isLogin,
        access: state.auth.data.access,
        email: state.auth.data.email,
        nickname: state.auth.data.nickname,
        status: state.auth.status
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(Mypage));