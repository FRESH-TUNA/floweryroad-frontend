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
            password: '',
            password1: '',
            password2: '',
        }
        this.errorHandler = this.errorHandler.bind(this)
        this.changeNickname = this.changeNickname.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    
    onChangeHandler(event) {
        let newState = {...this.state}
        const target = event.target.placeholder

        if(target === "새로운 닉네임")
            newState.newNickname = event.target.value
        else if(target === "현재 비밀번호")
            newState.password = event.target.value 
        else if(target === "새로운 비밀번호")
            newState.password1 = event.target.value 
        else if(target === "새로운 비밀번호 다시 입력")
            newState.password2 = event.target.value 
        
        this.setState({...newState})
    }

    async errorHandler(status, func, payload) {
        const funcname = func.name.substring(6)

        if(status === 401) {
            if(this.props.isLogin) {
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
        else if(funcname === 'changePassword'){
            let error = '다음 칸들을 입력하고 다시 시도해주세요\n'
            if(payload.password === '')
                error += '현재 패스워드\n'
            if(payload.password1 === '')
                error += '새로운 패스워드\n'
            if(payload.password1 === '')
                error += '새로운 비밀번호 다시 입력\n'
            alert(error)
        }
    }

    async changeNickname() {
        const data = {
            email: this.props.email, password: this.state.password ,
            nickname: this.state.newNickname
        }
        await this.props.Auth.changeNickname(data)
        if(this.props.error)
            this.errorHandler(this.props.status, this.changeNickname, null)
        else 
            alert('닉네임이 변경됬습니다!')
    }

    changePassword() {
        const data = {
            email: this.props.email, password: this.state.password ,
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
            this.errorHandler(error.response.status, this.changePassword, data)
        })
    }

    render() {
        return (
            <div className="mypage" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
                <SearchHeader />
                
                <div className="change-nickname">
                    <h3>닉네임 변경</h3>
                    <h3>현재 닉네임: {this.props.nickname ? this.props.nickname : '어나니머스'}</h3>
                    <div className="input-box">
                        <input type="text" placeholder="새로운 닉네임" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="현재 비밀번호" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                    </div>
                    <button className="login-button" onClick={this.changeNickname}>로그인</button>
                </div>

                <div className="change-password">
                    <h3>비밀번호 변경</h3>
                    <div className="input-box">
                        <input type="password" placeholder="현재 비밀번호" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="새로운 비밀번호" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                        <input type="password" placeholder="새로운 비밀번호 다시 입력" 
                            onChange={event => this.onChangeHandler(event)}
                        />
                    </div>
                    <button className="login-button" onClick={this.changePassword}>변경</button>
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
        access: state.auth.data.access,
        email: state.auth.data.email,
        nickname: state.auth.data.nickname,
        status: state.auth.status
    }),
    (dispatch) => ({
        Auth: bindActionCreators(Auth, dispatch)
    })
)(withRouter(Mypage));