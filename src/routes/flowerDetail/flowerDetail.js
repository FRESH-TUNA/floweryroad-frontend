import React from 'react'
import  '../../css/routes/flowerDetail.css'
import { withRouter } from "react-router-dom";

import SearchHeader from '../../components/common/searchHeader';
import Comment from '../../components/flowerDetail/comment';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
        };

        return (
            <div className="flower-detail">
                <SearchHeader/>
                <div className="main">
                    <img src="https://image.flaticon.com/icons/svg/1898/1898786.svg"/>
                    <div>
                        <div className="title">
                            <h1>풀꽃</h1>
                            <img src="https://image.flaticon.com/icons/svg/1000/1000997.svg" className="star"/>
                            <h1>4.0</h1>
                        </div>
                        <div className="languages">
                        <h3>색상</h3>
                            <div>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                            </div>
                        </div>
                        <div className="purposes">
                        <h3>색상</h3>
                            <div>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                            </div>
                        </div>
                        <div className="colors">
                            <h3>색상</h3>
                            <div>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                                <h4 className="purpose">풀꽃</h4>
                                <h4 className="purpose">벼어얼</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <h3>꽃 설명</h3>
                    <p>ㅁㄴㅇㄹㅁㄴ아ㅣㅓ롬낭러ㅗㅁ나ㅣ어ㅗㄹ마너오람너ㄴㅇㄹㄴㅁㅇㄹㅁㄴㅇ라ㅓㅁㄴㅇ라ㅓㅁㄴㅇ라ㅓㅁㄴㅇ라ㅓㄴㄹ아ㅓㅁㄴ라먼ㅇㄹㅁ나ㅓㅇㄹㅁ나ㅓㅇㄹ마넝라넘ㅇ럼ㄴㅇㄹㄴㅁ아ㅓ</p>
                </div>
                <div className="comments">
                    <h3>댓글</h3>
                    <Slider {...settings}>
                        <Comment>
                            <img src="http://placekitten.com/g/400/200" />
                        </Comment>
                        <Comment>
                            <img src="http://placekitten.com/g/400/200" />
                        </Comment>
                        <Comment>
                            <img src="http://placekitten.com/g/400/200" />
                        </Comment>
                        <Comment>
                            <img src="http://placekitten.com/g/400/200" />
                        </Comment>
                    </Slider>
                </div>
            </div>
        );
    }

}

export default withRouter(FlowerDetail);