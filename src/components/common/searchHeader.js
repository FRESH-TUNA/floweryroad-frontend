import React from 'react'
import axios from 'axios'
import '../../css/components/searchHeader.css'
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Auth from '../../actions/authAction';
class SearchHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            ...this.state,
            search: props.search
        }
        this.search = this.search.bind(this)
        this.mypage = this.mypage.bind(this)
        this.logout = this.logout.bind(this)
        this.refresh = this.refresh.bind(this)
        this.verify = this.verify.bind(this)
    }
    search(event) {
        if(event.keyCode === 13)
            document.getElementsByClassName('search-button')[0].click()
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
            <div className="searchHeader">
                <Link to="/"><h3 onClick={() => this.props.history.push('/')}>풀꽃길</h3></Link>
                <div className="search-bar">
                    <input type="text" onChange={(event) => this.setState({search: event.target.value})} onKeyUp ={(event) => this.search(event)}/>
                    <button type="button" className="search-button" onClick={() => this.props.history.push('/search?query=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button 
                    className="auth" 
                    onClick={(event) => {
                        const menu = document.getElementsByClassName('menu')[0]
                        if(menu.style.display === 'initial')
                            menu.style.display = 'none';
                        else
                            menu.style.display = 'initial';
                        event.stopPropagation()
                    }}
                />

                {
                    this.props.isLogin ? (
                    <ul className="menu">
                        <li onClick={this.mypage}><Link to="/mypage">My page</Link></li>
                        <li onClick={this.logout}><button >로그아웃</button></li>
                    </ul>) : (
                    <ul className="menu">
                        <Link to={{pathname: '/signin', state: { prevPath: this.props.history.location.pathname }}}><li>로그인</li></Link>
                        <Link to={{pathname: '/signup', state: { prevPath: this.props.history.location.pathname }}}><li >회원가입</li></Link>
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
)(withRouter(SearchHeader));

