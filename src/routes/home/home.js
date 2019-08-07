import React from 'react'
import styles from '../../css/home.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import FlowerDetail from '../../routes/flowerDetail/homeFlowerDetail'
import Recommend from '../../routes/recommend/recommend'
import Slider from "react-slick";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowerData: {
                "id": null,
                "name": null,
                "floriography": null,
                "description": null,
                "gender": null,
                "age": null,
                "color": null,
                "night": null,
                "month": null,
                "day": null,
                "like": null,
                "searchAmount": null,
                "imageAddress": null
            }
        };
    }

    componentDidMount() {
        fetch('http://demo4393270.mockable.io/flower?month=3&day=20')
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({ flowerData: response.data[0] })
            })
    }

    render() {
        var settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="home">
                <h1>풀꽃길</h1>
                <div className="search-bar">
                    <input type="text" placeholder="족보 검색하기" />
                    <button type="button" onClick={() => this.props.history.push('/meetup')}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button type="button" onClick={() => this.props.history.push('/meetup')}>화제의 꽃</button>
                {/* <Slider {...settings}>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                </Slider> */}
                {/* <div class="main-functions"> */}
                {/* window.location.assign("/todayFlower") */}
                {/* <div onClick={() => this.props.history.push('/todayFlower')}>
                        <img src="https://image.flaticon.com/icons/svg/1087/1087436.svg" />
                        <p>{this.state.flowerData.name}</p>
                    </div>
        
                    <div onClick={() => this.props.history.push('/recommend')}>
                        <img src="https://image.flaticon.com/icons/svg/185/185755.svg" />
                        <p>꽃 추천받기</p>
                    </div>
                    <div>
                        <img src="https://image.flaticon.com/icons/svg/185/185788.svg" />
                        <p>화제의 꽃</p>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default withRouter(Home);