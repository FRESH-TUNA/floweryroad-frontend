import React from 'react'
import '../../css/components/searchHeader.css'
import { withRouter } from "react-router-dom";

class SearchHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            search: ""
        }
    }
    render() {
        return (
            <div className="searchHeader">
                <h3 onClick={() => this.props.history.push('/')}>풀꽃길</h3>
                <div className="search-bar">
                    <input type="text" placeholder="꽃 검색하기" onChange={(event) => this.setState({search: event.target.value})}/>
                    <button type="button" onClick={() => this.props.history.push('/search?search=' + this.state.search)}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button className="auth"></button>
            </div>
        );
    }
}

export default withRouter(SearchHeader);