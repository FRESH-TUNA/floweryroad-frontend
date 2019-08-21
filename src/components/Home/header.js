import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import * as Auth from '../../actions/authAction';
import '../../css/components/mainHeader.css'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            ...this.state,
            search: props.search
        }
        this.mypage = this.mypage.bind(this)
        this.logout = this.logout.bind(this)
        this.refresh = this.refresh.bind(this)
        this.verify = this.verify.bind(this)
    }
    verify() {
        return axios({
            method: 'post',
            url: '/token/verify',
            data: { token: this.props.access },
        })
    }
    refresh() {
        this.props.Auth.refreshToken()
        .then(() => {
            this.props.history.push('/mypage')
        }).catch(() => {
            this.props.Auth.logout()
            .then(() => {
                alert('세션이 만료되었습니다. 다시 로그인해주세요')
                this.props.history.push('/signin')
            })
        })
    }

    mypage() {
            this.verify()
            .then(() => {
                this.props.history.push('/mypage')
            }).catch(() => {
                this.refresh()   
            })
    }

    logout(event) {
        if(window.confirm('로그아웃 하시겠습니까?')) {
            this.props.Auth.logout()
        }
        event.stopPropagation()
    }
    render() {
        return (
            <div className="main-header">
                <button 
                    className="auth" 
                    onClick={(event) => {
                        document.getElementsByClassName('menu')[0].style.display = 'initial';
                        event.stopPropagation()
                    }}
                />
                
                {
                    this.props.isLogin ? (
                    <ul className="menu">
                        <li onClick={this.mypage}>My page</li>
                        <li><button onClick={this.logout}>로그아웃</button></li>
                    </ul>) : (
                    <ul className="menu">
                        <Link to="/signin"><li>로그인</li></Link>
                        <Link to="/signup"><li >회원가입</li></Link>
                    </ul>)
                }    
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
)(withRouter(Header));
