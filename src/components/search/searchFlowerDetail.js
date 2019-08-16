import React from 'react'
import  '../../css/components/searchFlowerDetail.css'
import { Link, withRouter } from "react-router-dom";

class SearchFlowerDetail extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="search-flower-detail">
                <div className="content">
                    <div className="title">
                        <h3 className="flowerName">{this.props.flower.name}</h3>
                        <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="star"/>
                        <h3>{
                            this.props.flower.star ?
                            this.props.flower.star : '평가없음'
                        }</h3>
                    </div>
                    <div className="purposes">
                        {this.props.flower.purposes.map((value, index) => {
                            return <Link to={"/search?purpose=" + value.name} onClick={(event) => event.stopPropagation()}>
                                <h4 className="purpose">{value.name}</h4>
                            </Link>;
                        })}
                    </div>
                </div>
                <img className="flower-img" src={this.props.flower.image.url}/>
            </div>
        );
    }

}

export default withRouter(SearchFlowerDetail);