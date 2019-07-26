import React from 'react'
import'../css/meetupSubHeader.css'

class Meetup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="sub-header">
                <div class="content-wrapper">
                    <h1>풀꽃 도감</h1>
                    <div class="search-bar">
                        <input type="text"></input>
                        <button></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Meetup;