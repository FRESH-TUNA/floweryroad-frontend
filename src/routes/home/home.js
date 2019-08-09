import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import FlowerDetail from '../../routes/flowerDetail/homeFlowerDetail'
import Recommend from '../../routes/recommend/recommend'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/routes/home.css'

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
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
        };

        return (
            <div className="home">
                <h1>풀꽃길</h1>
                <div className="search-bar">
                    <input type="text" placeholder="족보 검색하기" />
                    <button type="button" onClick={() => this.props.history.push('/search')}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button type="button" onClick={() => this.props.history.push('/recommend')}>화제의 꽃</button>
                <div className="slider">
                    <Slider {...settings}>
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
                    </Slider>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);