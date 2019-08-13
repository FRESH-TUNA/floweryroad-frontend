import React from 'react'
import '../../css/components/searchHeader.css'
import { withRouter, Link } from "react-router-dom";


class SearchHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            search: props.search
        }
        this.search = this.search.bind(this)
    }
    search(event) {
        if(event.keyCode === 13)
            document.getElementsByClassName('search-button')[0].click()
    }
    render() {
        return (
            <div className="searchHeader">
                <Link to="/"><h3 onClick={() => this.props.history.push('/')}>풀꽃길</h3></Link>
                <div className="search-bar">
                    <input type="text" placeholder="이름, 꽃말, 목적, 색상 으로 검색하기" onChange={(event) => this.setState({search: event.target.value})} onKeyUp ={(event) => this.search(event)}/>
                    <button type="button" className="search-button" onClick={() => this.props.history.push('/search?query=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button className="auth"></button>
            </div>
        );
    }
}

export default withRouter(SearchHeader);