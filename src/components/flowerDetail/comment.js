import React from 'react'
import '../../css/components/comment.css'

class SearchHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="comment">
                <div className="header">
                    <h4>{this.props.comment.user.nickname ? 
                        this.props.comment.user.nickname : '어나니머스'}</h4>
                    <div className="star">
                        <img src="https://image.flaticon.com/icons/svg/291/291205.svg"/>
                        <h4>{this.props.comment.star}</h4>
                    </div>
                    <div className="like">
                        <img src="https://image.flaticon.com/icons/svg/148/148836.svg"/>
                        <h4>{this.props.comment.like}</h4>
                    </div>
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        );
    }
}

export default SearchHeader;