import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import FlowerDetail from '../../routes/flowerDetail/homeFlowerDetail_modal'
import Recommend from '../../routes/recommend/recommend'
import HomeFlower from '../../components/Home/homeFlower'
import Header from '../../components/Home/header'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/routes/home.css'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.handleQuery = this.handleQuery.bind(this)
        this.search = this.search.bind(this)
    }

    handleQuery(event) {
        this.setState({search: event.target.value});
    }

    search(event) {
        if(event.keyCode === 13)
            document.getElementsByClassName('search-button')[0].click()
    }

    render() {
        // const settings = {
        //     dots: true,
        //     speed: 500,
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        // };

        return (
            <div className="home" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
                <Header />
                <h1>풀꽃길</h1>
                <div className="search-bar">
                    <input type="text" placeholder="이름, 꽃말, 목적, 색상 으로 검색하기" onChange={(e) => {this.handleQuery(e)}} onKeyUp ={(event) => this.search(event)}/>
                    <button type="button" className="search-button" onClick={() => this.props.history.push('/search?query=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                {/* <button type="button" onClick={() => this.props.history.push('/recommend')}>화제의 꽃</button> */}
                {/* <div className="slider">
                    <Slider {...settings}>
                        <div>

                        </div>
                        <HomeFlower>
                        </HomeFlower>
                        <HomeFlower>
                        </HomeFlower>
                        <HomeFlower>
                        </HomeFlower>
                        <HomeFlower>
                        </HomeFlower>
                    </Slider>
                </div> */}
            </div>
        );
    }
}

export default withRouter(Home);