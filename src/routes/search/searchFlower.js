import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import getQuery from 'query-string'
import { reload, additonalLoading } from '.'

import SearchFlowerDetail from '../../components/search/searchFlowerDetail'
import SearchHeader from '../../components/common/searchHeader'
import SearchSubheader from '../../components/search/searchSubheader'
import BlankHeader from '../../components/search/blankheader'
import Loading from '../../components/loading'

import '../../css/routes/search.css'

class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      flowerData: null,
    }
    this.reload = reload.bind(this)
    this.additonalLoading = additonalLoading.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location)
      this.reload(nextProps.location.search)
  }

  componentDidMount() {
    this.reload(this.props.location.search)
    document.getElementsByClassName('result')[0].addEventListener('scroll', (event) => this.additonalLoading(event))
  }

  render() {
    return (
      <div className="search" onClick={() => document.getElementsByClassName('menu')[0].style.display = 'none'}>
        <SearchHeader />
        {this.state.isLoading ? (
          <Loading />
        ) : null}

        {getQuery.parse(this.props.location.search).query !== undefined ?
          (<SearchSubheader />) : (<BlankHeader />)
        }

        <div className="result">
          {this.state.flowerData === null ? (
            null
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
