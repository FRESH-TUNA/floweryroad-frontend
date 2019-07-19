import React from 'react'
import Header from './header'
import SubHeader from './meetupSubheader'
import'../css/meetupList.css'

class Meetup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="meetup-list">
                <Header/>
                <SubHeader/>
                <div className="meetups">
                    <div className="meetup">

                    </div>
                    <div className="meetup">

                    </div>
                    <div className="meetup">

                    </div>
                    <div className="meetup">

                    </div>
                    <div className="meetup">

</div>
<div className="meetup">

</div>
<div className="meetup">

</div>
<div className="meetup">

</div>
                </div>
            </div>
        );
    }
}

export default Meetup;