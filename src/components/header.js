import React from 'react'
import'../css/header.css'
import { withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header" onClick={() => this.props.history.push('/')}>
                <h2>풀꽃길</h2>
                <nav>
                    <button class="auth"></button>
                </nav>
            </div>
        );
    }
}
export default withRouter(Header);