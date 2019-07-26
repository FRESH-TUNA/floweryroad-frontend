import React from 'react'
import  '../css/flowerDetail.css'
import { withRouter } from "react-router-dom";

class SearchFlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flowerData: {},
            isLoading: true
        }
        this.blockPropagate = this.blockPropagate.bind(this)
    }
    componentDidMount() {
        console.log(this.props)
        fetch('http://demo4393270.mockable.io/flower/' + this.props.match.params.flowerPk)
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({flowerData: response.data, isLoading: false})
            })
    }
    blockPropagate(event) {
        event.stopPropagation()
    }
    render() {
        return (
            <div className="flower-detail-modal" onClick={() => this.props.history.goBack()}>
                {
                    this.state.isLoading ? (
                        <div className="flower-detail-modal-body" onClick={(event) => this.blockPropagate(event)}>
                            <h1>...loading</h1>
                        </div>
                    ) : (
                        <div className="flower-detail-modal-body" onClick={(event) => this.blockPropagate(event)}>
                            <h1>{this.state.flowerData.name}</h1>
                            <div className="main-section">
                            <img src="https://image.flaticon.com/icons/svg/1898/1898786.svg" />
                            <h3>{this.state.flowerData.floriography}</h3>
                            <p>프로포즈, 상견례 에 사용해요!</p>
                            </div>
                            <div className="description"><p>{this.state.flowerData.description}</p></div>
                            <button>풀꽃집 찾아보기</button>
                        </div>
                    )
                }
            </div>
        );
    }

}

export default withRouter(SearchFlowerDetail);