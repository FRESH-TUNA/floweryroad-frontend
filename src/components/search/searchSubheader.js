import React from 'react'
import'../../css/components/searchSubHeader.css'
import { withRouter, Link} from 'react-router-dom'

class SearchSubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectColorState: false,
            selectSeasonState: false,
        }
    }

    changeSelectColorState() {
        if(this.state.selectColorState)
            this.setState({'selectColorState':false})
        else
            this.setState({'selectColorState':true})
    }

    render() {
        const queryString = require('query-string');
        let {query} = queryString.parse(this.props.location.search);

        if(query === undefined)
            query = ''

        return (
            <div className="sub-header">
                <div className="content-wrapper">
                    <Link to={"/search?query=" + query}><h4>전체검색</h4></Link>
                    <Link to={"/search?query=" + query + "&name=" + query}><h4>이름</h4></Link>
                    <Link to={"/search?query=" + query + "&language=" + query}><h4>꽃말</h4></Link>
                    <Link to={"/search?query=" + query + "&purpose=" + query}><h4>목적</h4></Link>
                    {/* <Link to={query + "&?name=" + parsed.search}><h4>색상</h4></Link> */}

                    <Link to={"/search?query=" + query + "&season=0"}><h4>봄</h4></Link>
                    <Link to={"/search?query=" + query + "&season=1"}><h4>여름</h4></Link>
                    <Link to={"/search?query=" + query + "&season=2"}><h4>가을</h4></Link>
                    <Link to={"/search?query=" + query + "&season=3"}><h4>겨울</h4></Link>

                    {/* <button onClick={() => this.changeSelectColorState()}></button>

                    {this.state.selectColorState &&
                        <div className="select-colors">
                            <Link to={"/search?query=" + query + "&color=0"}><h4>빨간색</h4></Link>
                            <Link to={"/search?query=" + query + "&color=1"}><h4>파란색</h4></Link>
                            <Link to={"/search?query=" + query + "&color=2"}><h4>노란색</h4></Link>
                            <Link to={"/search?query=" + query + "&color=3"}><h4>주황색</h4></Link>
                        </div>
                    } */}
                </div>
            </div>
        );
    }
}

export default withRouter(SearchSubHeader);

