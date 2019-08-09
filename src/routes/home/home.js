import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import FlowerDetail from '../../routes/flowerDetail/homeFlowerDetail_modal'
import Recommend from '../../routes/recommend/recommend'
import HomeFlower from '../../components/Home/homeFlower'

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
    }

    handleQuery(event) {
        this.setState({search: event.target.value});
    }

    componentDidMount() {
        // fetch('http://demo4393270.mockable.io/flower?month=3&day=20')
        //     .then(response => {
        //         return response.json()
        //     })
        //     .then(response => {
        //         this.setState({ flowerData: response.data[0] })
        //     })
    }

    render() {
        // const settings = {
        //     dots: true,
        //     speed: 500,
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        // };

        return (
            <div className="home">
                <h1>풀꽃길</h1>
                <div className="search-bar">
                    <input type="text" placeholder="족보 검색하기" onChange={(e) => {this.handleQuery(e)}}/>
                    <button type="button" onClick={() => this.props.history.push('/search?search=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button type="button" onClick={() => this.props.history.push('/recommend')}>화제의 꽃</button>
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