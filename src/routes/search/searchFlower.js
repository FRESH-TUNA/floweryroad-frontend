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
        fetch('http://demo4393270.mockable.io/flower?month=2&day=30')
            .then(response => {
                return response.json()
            })
            .then(response => {
                return this.setState({ flowerData: response.data, isLoading: false })
            })
    }
    render() {
        return (
            <div className="search">
                <SearchHeader/>
                <SearchSubheader/>
                <div className="result">
                    {/* {this.state.isLoading ? (
                        <div className="loading">
                            <p>loading...</p>
                        </div>
                    ) : (
                        this.state.flowerData.map((value, index) => {
                            return <SearchFlowerDetail
                                key={index}
                                onClick={() => this.props.history.push('/flower/' + value.id)}
                            >{value.name}</SearchFlowerDetail>
                        })
                    )} */}
                    <SearchFlowerDetail/>
                    <SearchFlowerDetail/>
                    <SearchFlowerDetail/>
                    <SearchFlowerDetail/>
                </div>
                {/* <Route exact path='/meetup/:flowerPk' component={() => <SearchFlowerDetail />} /> */}
            </div>
        );
    }
}

export default withRouter(Meetup);