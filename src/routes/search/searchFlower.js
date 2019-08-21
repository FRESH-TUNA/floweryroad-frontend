import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import SearchFlowerDetail from '../../components/search/searchFlowerDetail'
import getQuery from 'query-string'
import {reload} from '.'

import SearchHeader from '../../components/common/searchHeader'
import SearchSubheader from '../../components/search/searchSubheader'
import '../../css/routes/search.css'

class Meetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flowerData: [],
        }
        this.reload = reload.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) 
            this.reload(nextProps.location.search)
    }

    componentDidMount() {
        this.reload(this.props.location.search)
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