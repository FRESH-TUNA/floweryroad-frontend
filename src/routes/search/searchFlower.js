import React from 'react'
import SearchHeader from '../../components/common/searchHeader'
import SearchSubheader from '../../components/search/searchSubheader'
import '../../css/routes/search.css'
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import SearchFlowerDetail from '../../components/search/searchFlowerDetail'
import axios from 'axios'
import getQuery from 'query-string'
class Meetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flowerData: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            let queryString = require('query-string');
            queryString = queryString.parse(nextProps.location.search);
            let url = '/flowers?'
            document.documentElement.scrollTop = 0;
            
            if (queryString.name)
                url = '/flowers?name=' + queryString.name
            else if (queryString.purpose)
                url = '/flowers?purpose=' + queryString.purpose
            else if (queryString.language)
                url = '/flowers?language=' + queryString.language
            else if (queryString.season) {
                url = queryString.query ? ('/flowers?search=' + queryString.query + '&season=' + queryString.season)
                    : ('/flowers?season=' + queryString.season)
            }
            else
                url = '/flowers?search=' + queryString.query

            this.setState({ isLoading: true },
                () => {
                    axios(url)
                        .then(response => {
                            this.setState({ flowerData: response.data.flowers, isLoading: false })
                        })
                })
        }
    }

    componentDidMount() {
        let queryString = require('query-string');
        let url = '/flowers?'
        queryString = queryString.parse(this.props.location.search);
        document.documentElement.scrollTop = 0;
        
        if (queryString.name)
            url = '/flowers?name=' + queryString.name
        else if (queryString.purpose)
            url = '/flowers?purpose=' + queryString.purpose
        else if (queryString.language)
            url = '/flowers?language=' + queryString.language
        else if (queryString.season) {
            url = queryString.query ? ('/flowers?search=' + queryString.query + '&season=' + queryString.season)
                : ('/flowers?season=' + queryString.season)
        }
        else
            url = '/flowers?search=' + queryString.query

        this.setState({ isLoading: true },
            () => {
                axios(url)
                    .then(response => {
                        this.setState({ flowerData: response.data.flowers, isLoading: false })
                    })
            })
    }
    render() {
        return (
            <div className="search" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
                <SearchHeader />
                {(getQuery.parse(this.props.location.search).query) &&
                    <SearchSubheader />
                }
                <div className="result">
                    {this.state.isLoading ? (
                        <div className="loading">
                            <p>loading...</p>
                        </div>
                    ) : (
                            this.state.flowerData.map((value, index) => {
                                return <Link to={"/flowers/" + value.id} key={index} ><SearchFlowerDetail flower={value} /></Link>
                            })
                        )}
                </div>
            </div>
        );
    }
}

export default withRouter(Meetup);