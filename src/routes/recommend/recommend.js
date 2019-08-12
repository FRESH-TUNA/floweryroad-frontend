import React from 'react'
import  '../../css/components/recommend.css'
import { withRouter } from "react-router-dom";
import SelectColor from "../../components/recommend/selectColor"
import SelectPurpose from "../../components/recommend/selectPurpose"

class FlowerDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 1
        }
        this.blockPropagate = this.blockPropagate.bind(this)
    }
    blockPropagate(event) {
        event.stopPropagation()
    }
    render() {
        return (
            <div className="recommend-modal" onClick={() => this.props.history.goBack()}>
                <div className="body" onClick={(event) => this.blockPropagate(event)}>
                    <SelectColor/>
                    <SelectPurpose/>
                </div>
            </div>
        );
    }

}

export default withRouter(FlowerDetail);