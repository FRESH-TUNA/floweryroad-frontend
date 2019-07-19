import React from 'react'
import'../css/header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <h2>풀꽃길</h2>
                <nav>
                    <h4>꽃과의 만남</h4>
                    <h4>꽃 도감</h4>
                    <h4>풀꽃집</h4>
                    <button class="auth"></button>
                </nav>
            </div>
        );
    }
}
export default Header;