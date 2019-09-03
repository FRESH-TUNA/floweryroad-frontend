import axios from 'axios'

export const reload = function (query) {
    let queryString = require('query-string');
    queryString = queryString.parse(query);
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
                    this.setState({ 
                        flowerData: response.data.flowers, 
                        links: response.data.links,
                        isLoading: false 
                    })
                })
        })
}

export const additonalLoading = function() {
    const target = document.scrollingElement
    if(
        target.offsetHeight + target.scrollTop >= target.scrollHeight
        && this.state.links.next !== null
    ) {
        axios(this.state.links.next)
        .then(response => {
            this.setState({ 
                flowerData: this.state.flowerData.concat(response.data.flowers), 
                links: response.data.links
            })
        })
        .catch(() => {
            alert('서버가 불안정하여 꽃들을 읽어오는데 실패했습니다. 잠시후에 시도해주세요')
        })
    }
}

