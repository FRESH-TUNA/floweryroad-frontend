import React from 'react'
import  '../../css/routes/flowerDetail.css'
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import SearchHeader from '../../components/common/searchHeader';
import Comment from '../../components/flowerDetail/comment';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            flower: { }
        }
    }

    componentDidMount() {
        axios('/flowers/' + this.props.match.params.id)
            .then(response => this.setState({ flower: response.data }))
            .then(() => {
                return axios(
                    '/flowers/' + 
                    this.props.match.params.id +
                    '/comments')})
            .then(response => {this.setState({comments: response.data.comments, isLoading: false});})
    }
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
        };

        return (
            <div className="flower-detail">
                <SearchHeader/>
                    {this.state.isLoading ? 
                    (<div className="main"><h1>loading...</h1></div>) :
                    (<div className="main">
                        <img src={this.state.flower.images[0].url}/>
                        <div className="flower-header">
                            <div className="title">
                                <h2>{this.state.flower.name}</h2>
                                <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="star"/>
                                <h2>{this.state.flower.star ? this.state.flower.star : '평가없음'}</h2>
                            </div>
                            <div className="languages">
                                <h3>꽃말</h3>
                                <div>
                                    {this.state.flower.languages.map(value => {
                                        return <Link to={"/search?language=" + value.name} onClick={(event) => event.stopPropagation()}>
                                        <h5 className="purpose">{value.name}</h5></Link>
                                    })}
                                </div>
                            </div>
                            <div className="purposes">
                                <h3>목적</h3>
                                <div>
                                    {this.state.flower.purposes.map(value => {
                                        return <Link to={"/search?purpose=" + value.name} onClick={(event) => event.stopPropagation()}>
                                        <h5 className="purpose">{value.name}</h5>
                                    </Link>;
                                    })}
                                </div>
                            </div>
                            <div className="colors">
                                <h3>색상</h3>
                                <div>
                                    {this.state.flower.colors.map(value => {
                                        return <h5>{value.name}</h5>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                { this.state.isLoading ? 
                    (<div className="description"/>) : (
                    <div className="description">
                        <h3>꽃 설명</h3>
                        <p>{this.state.flower.description}</p>
                    </div>)
                }

                { this.state.isLoading ? 
                    (<div className="comments"/>) : (
                    <div className="comments">
                        <h3>댓글</h3>
                        <div className="slide-wrapper">
                            <Slider {...settings}>
                                {this.state.comments.map(value => {
                                    return <Comment comment={value}/> 
                                })}
                            </Slider>
                        </div>
                    </div>)
                }
            </div>
        );
    }

}

export default withRouter(FlowerDetail);