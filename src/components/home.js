import React from 'react'
import styles from '../css/home.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import FlowerDetail from '../components/flowerDetail'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowerData: {
                "id": null,
                "name": null,
                "floriography": null,	
                "description" : null,
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
                this.setState({flowerData: response.data[0]})
            })
    }
    
    render() {
        return (
            <div className="home">
                <header>풀꽃길</header>
                <nav>
                    <button class="search"></button>
                    <button class="auth"></button>
                </nav>
                <div class="main-functions">
                    
                    <div onClick={() => this.props.history.push('/todayFlower')}>
                        <img src="https://image.flaticon.com/icons/svg/1087/1087436.svg" />
                        <p>{this.state.flowerData.name}</p>
                    </div>
        
                    <div onClick="changeFlowerRecommendModalstate()">
                        <img src="https://image.flaticon.com/icons/svg/185/185755.svg" />
                        <p>꽃 추천받기</p>
                    </div>
                    <div>
                        <img src="https://image.flaticon.com/icons/svg/185/185788.svg" />
                        <p>화제의 꽃</p>
                    </div>
                    <div onClick={() => this.props.history.push('/meetup')}>
                        <img src="https://image.flaticon.com/icons/svg/1898/1898786.svg" />
                        <p>꽃 도감</p>
                    </div>
                </div>
                <Route path='/todayFlower' component={() => <FlowerDetail flowerData={this.state.flowerData} />} />
            </div>
        );
    }
}

export default withRouter(Home);