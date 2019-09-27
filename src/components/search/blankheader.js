import React from 'react'
import'../../css/components/searchSubHeader.css'
import { withRouter } from 'react-router-dom'

class SearchSubHeader extends React.Component {
    render() {
        return (
            <div className="sub-header">
                <div className="content-wrapper">
                </div>
            </div>
        );
    }
}

export default withRouter(SearchSubHeader);
