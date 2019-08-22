import React from 'react'
import Slider from "react-slick";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SearchHeader from '../../components/common/searchHeader';
import Comment from '../../components/flowerDetail/comment';
import NewComment from '../../components/flowerDetail/newcomment';
import * as Auth from '../../actions/authAction';
import '../../css/routes/flowerDetail.css'

import {
    readFlowerData,
    openNewComment, 
    closeNewComment,
    readComments,
    checkComments,
    newComment,
    errorHandler
} from '.'

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            flower: {},
            newCommentState: false,
            commentsCount: 6,
            lastCommentPage: 1,
            lastCommentPosition: 0
        }
        this.readFlowerData = readFlowerData.bind(this)
        this.newComment = newComment.bind(this)
        this.openNewComment = openNewComment.bind(this)
        this.closeNewComment = closeNewComment.bind(this)
        this.readComments = readComments.bind(this)
        this.checkComments = checkComments.bind(this)
        this.errorHandler = errorHandler.bind(this)
    }
    componentDidMount() {
        this.readFlowerData()
    }

    render() {
        const settings = {
            dots: false, infinite: false, speed: 500,
            slidesToShow: 3, slidesToScroll: 3,
            afterChange: (index) => { this.checkComments(index) }
        };

        return (
            <div className="flower-detail" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
                <SearchHeader />
                {this.state.isLoading ?
                    (<div className="main"><h1>loading...</h1></div>) :
                    (<div className="main">
                        <img src={this.state.flower.images[0].url} />
                        <div className="flower-header">
                            <div className="title">
                                <h2>{this.state.flower.name}</h2>
                                <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="star" />
                                <h2>{this.state.flower.star ? this.state.flower.star : '평가없음'}</h2>
                            </div>
                            <div className="languages">
                                <h3>꽃말</h3>
                                <div>
                                    {this.state.flower.languages.map((value, index) => {
                                        return <Link to={"/search?language=" + value.name} onClick={(event) => event.stopPropagation()}>
                                            <h5 className="purpose" key={index}>{value.name}</h5></Link>
                                    })}
                                </div>
                            </div>
                            <div className="purposes">
                                <h3>목적</h3>
                                <div>
                                    {this.state.flower.purposes.map((value, index) => {
                                        return <Link to={"/search?purpose=" + value.name} onClick={(event) => event.stopPropagation()}>
                                            <h5 className="purpose" key={index}>{value.name}</h5>
                                        </Link>;
                                    })}
                                </div>
                            </div>
                            <div className="colors">
                                <h3>색상</h3>
                                <div>
                                    {this.state.flower.colors.map((value, index) => {
                                        return <h5 key={index}>{value.name}</h5>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                {this.state.isLoading ?
                    (<div className="description" />) : (
                        <div className="description">
                            <h3>꽃 설명</h3>
                            <p>{this.state.flower.description}</p>
                        </div>)
                }

                {this.state.isLoading ?
                    (<div className="comments" />) : (
                        <div className="comments">
                            <h3>댓글</h3>
                            <div className="slide-wrapper">
                                <Slider ref={slider => (this.slider = slider)} {...settings} className="comment-slides">
                                    {this.state.newCommentState ?
                                        <NewComment newComment={this.newComment} closeNewComment={this.closeNewComment} /> : null}
                                    {this.state.comments.map((value, index) => {
                                        return <Comment comment={value} key={index}/>
                                    })}
                                </Slider>
                            </div>
                            <button onClick={this.openNewComment}>댓글쓰기</button>
                        </div>)
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
)(withRouter(FlowerDetail));