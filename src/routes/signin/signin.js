import React from 'react'
import '../../css/signin.css'
import { withRouter } from "react-router-dom";


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                "email": null,
                "password": null,
            }
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="signin">
                <div className="body">
                    <h1>풀꽃길</h1>
                    <div className="input-box">
                        <input type="text" placeholder="email"/>
                        <input type="text" placeholder="password"/>
                    </div>
                    <button>로그인</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Signin);