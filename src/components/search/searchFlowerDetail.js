import React from 'react'
import  '../../css/components/searchFlowerDetail.css'
import { withRouter } from "react-router-dom";

class SearchFlowerDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="search-flower-detail">
                <div className="content">
                    <div className="title">
                        <h3 className="flowerName">풀꽃</h3>
                        <img src="https://image.flaticon.com/icons/svg/1000/1000997.svg" className="star"/>
                        <h3>4.5</h3>
                    </div>
                    <div className="purposes">
                        <h4 className="purpose">풀꽃</h4>
                        <h4 className="purpose">벼어얼</h4>
                        <h4 className="purpose">풀꽃</h4>
                        <h4 className="purpose">벼어얼</h4>
                        <h4 className="purpose">풀꽃</h4>
                        <h4 className="purpose">벼어얼</h4>
                    </div>
                </div>
                <img className="flower-img"/>
            </div>
        );
    }

}

export default withRouter(SearchFlowerDetail);