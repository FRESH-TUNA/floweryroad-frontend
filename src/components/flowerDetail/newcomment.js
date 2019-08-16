import React from 'react'
import ReactStars from 'react-stars'

import '../../css/components/comment.css'
import '../../css/components/newcomment.css'

class SearchHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            star: 0
        }
    }

    render() {
        return (
            <div className="comment newcomment">
                <div className="header">
                    <h4>새로운 댓글</h4>
                    <div className="star">
                        <ReactStars
                            count={5}
                            onChange={(newRating) => this.setState({star: newRating})} 
                            value={this.state.star}
                            size={16}
                            color2={'#ffd700'} 
                        />
                    </div>
                </div>
                <textarea 
                    onChange={(event) => this.setState({content: event.target.value})} 
                    value={this.state.content}>
                </textarea>
                <div className="buttons">
                    <button onClick={() => this.props.newComment(this.state)}>쓰기</button>
                    <button onClick={() => this.props.closeNewComment(true)}>취소</button>
                </div>
            </div>
        );
    }
}

export default SearchHeader;