import React from 'react'
import axios from 'axios'
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../css/components/comment.css'
import * as Auth from '../../actions/authAction';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: this.props.comment.like,
            is_like: this.props.comment.is_like,
        }
        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
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

    like() {
        axios({
            method: 'post',
            url: '/comments/' + this.props.comment.id + '/likes',
            headers: {
                authorization: 'Bearer ' + this.props.access
            },
        }).then((response) => {
            this.setState({...response.data})
        }).catch(error => {
            this.errorHandler(error.response, this.like)
        })
    }
    dislike() {
        axios({
            method: 'delete',
            url: '/comments/' + this.props.comment.id + '/likes',
            headers: {
                authorization: 'Bearer ' + this.props.access
            },
        }).then((response) => {
            this.setState({...response.data})
        }).catch(error => {
            this.errorHandler(error.response, this.like)
        })
    }
    render() {
        return (
            <div className="comment">
                <div className="header">
                    <h4>{this.props.comment.user.nickname ? 
                        this.props.comment.user.nickname : '어나니머스'}</h4>
                    <div className="star">
                        <img src="https://image.flaticon.com/icons/svg/291/291205.svg"/>
                        <h4>{this.props.comment.star}</h4>
                    </div>
                    <div className="like">
                        <img 
                            src="https://image.flaticon.com/icons/svg/148/148836.svg"
                            onClick={() => {
                                this.state.is_like ?
                                    this.dislike() : this.like()
                            }}
                        />
                        <h4>{this.state.count}</h4>
                    </div>
                </div>
                <p>{this.props.comment.content}</p>
                {this.props.comment.is_owner ? 
                    <button className="delete" onClick={() => this.props.deleteComment({id: this.props.comment.id})}>삭제</button> : null
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
)(withRouter(Comment));
