import React from 'react'
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
        this.logout = this.logout.bind(this)
    }
    search(event) {
        if(event.keyCode === 13)
            document.getElementsByClassName('search-button')[0].click()
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
                    <input type="text" placeholder="이름, 꽃말, 목적, 색상 으로 검색하기" onChange={(event) => this.setState({search: event.target.value})} onKeyUp ={(event) => this.search(event)}/>
                    <button type="button" className="search-button" onClick={() => this.props.history.push('/search?query=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
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
                        <li><Link to="/signin">My page</Link></li>
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
)(withRouter(SearchHeader));

