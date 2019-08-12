import React from 'react'
import'../../css/components/searchSubHeader.css'

class Meetup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="sub-header">
                <div class="content-wrapper">
                    <h4>이름</h4>
                    <h4>계절</h4>
                    <h4>꽃말</h4>
                    <h4>색깔</h4>
                    <h4>목적</h4>
                </div>
            </div>
        );
    }
}

export default Meetup;