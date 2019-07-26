import React from 'react'
import  '../css/flowerDetail.css'
import { withRouter } from "react-router-dom";

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.blockPropagate = this.blockPropagate.bind(this)
    }
    blockPropagate(event) {
        event.stopPropagation()
    }
    render() {
        return (
            <div className="flower-detail-modal" onClick={() => this.props.history.goBack()}>
                <div className="flower-detail-modal-body" onClick={(event) => this.blockPropagate(event)}>
                    <h1>{this.props.flowerData.name}</h1>
                    <div className="main-section">
                    <img src="https://image.flaticon.com/icons/svg/1898/1898786.svg" />
                    <h3>{this.props.flowerData.floriography}</h3>
                    <p>프로포즈, 상견례 에 사용해요!</p>
                    </div>
                    <div className="description"><p>{this.props.flowerData.description}</p></div>
                    <button>풀꽃집 찾아보기</button>
                </div>
            </div>
        );
    }

}

export default withRouter(FlowerDetail);