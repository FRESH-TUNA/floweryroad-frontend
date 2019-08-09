import React from 'react'
import '../../css/searchHeader.css'

class SearchHeader extends React.Component {
    render() {
        return (
            <div className="searchHeader">
                <h3>풀꽃길</h3>
                <div className="search-bar">
                    <input type="text" placeholder="족보 검색하기" />
                    <button type="button" onClick={() => this.props.history.push('/meetup')}><img src="https://image.flaticon.com/icons/svg/149/149852.svg" /></button>
                </div>
                <button className="auth">휴휴후후</button>
            </div>
        );
    }
}

export default SearchHeader;