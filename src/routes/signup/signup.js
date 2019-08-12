import React from 'react'
import '../../css/routes/signup.css'
import { withRouter } from "react-router-dom";
import { Extra, Required } from "../../components/signup"
// import Extra from "../../components/signup/extra"
// import Required from "../../components/signup/required"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                "email": null,
                "password": null,
            },
            componentState: 0
        };
        this.testChangeComponent = this.testChangeComponent.bind(this)
    }

    render() {
        return (
            this.state.componentState === 0 ?
            <Required testChangeComponent={this.testChangeComponent} /> : <Extra/>
        );
    }

    testChangeComponent() {
        this.setState({componentState: 1})
    }
}

export default withRouter(Signup);