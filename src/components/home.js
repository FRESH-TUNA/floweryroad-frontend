import React from 'react'
import styles from '../css/home.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    // changeFlowerDetailModalstate = () => {
    //     ////// modal-style
    //     // const flowerDetailModal = document.getElementsByClassName('flower-detail-modal')[0]
    //     // if (flowerDetailModal.style.display === 'flex')
    //     //     flowerDetailModal.style.display = 'none'
    //     // else
    //     //     flowerDetailModal.style.display = 'flex
    // }
    
    // blockPropagate = (event) => {event.stopPropagation()}

    render() {
        return (
            <div className="home">
                <header>풀꽃길</header>
                <nav>
                    <button class="search"></button>
                    <button class="auth"></button>
                </nav>
                <div class="main-functions">
                    
                    <div onClick={() => this.props.history.push('/flowerDetail')}>
                        <img src="https://image.flaticon.com/icons/svg/1087/1087436.svg" />
                        <p>진리는 나의 빛</p>
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
                        <img src="https://image.flaticon.com/icons/svg/1087/1087422.svg" />
                        <p>꽃과의 만남</p>
                    </div>
                    <div>
                        <img src="https://image.flaticon.com/icons/svg/1898/1898786.svg" />
                        <p>꽃 도감</p>
                    </div>
                    <div>
                        <img src="https://image.flaticon.com/icons/svg/1670/1670017.svg" />
                        <p>풀꽃집</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);