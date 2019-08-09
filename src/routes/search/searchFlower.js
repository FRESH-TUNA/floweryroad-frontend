import React from 'react'
import SearchHeader from '../../components/common/searchHeader'
import SearchSubheader from '../../components/search/searchSubheader'
import '../../css/routes/search.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import SearchFlowerDetail from '../../components/search/searchFlowerDetail'

class Meetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flowerData: []
        }
    }
    componentDidMount() {
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);
        
        fetch('http://127.0.0.1:8000/flowers?search=' + parsed.search)
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log(response)
                this.setState({ flowerData: response.flowers, isLoading: false })
            })
    }
    render() {
        return (
            <div className="search">
                <SearchHeader/>
                <SearchSubheader/>
                <div className="result">
                    {this.state.isLoading ? (
                        <div className="loading">
                            <p>loading...</p>
                        </div>
                    ) : (
                        this.state.flowerData.map((value, index) => {
                            return <SearchFlowerDetail
                                flower={value}
                            />
                        })
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Meetup);