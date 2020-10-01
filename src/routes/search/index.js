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
    else if (queryString.color) {
        url = queryString.query ? ('/flowers?search=' + queryString.query + '&color=' + queryString.color)
            : ('/flowers?color=' + queryString.color)
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

export const additonalLoading = function(event) {
    const target = event.target

    if(
        target.offsetHeight + target.scrollTop >= target.scrollHeight - 1
        && this.state.links.next !== null
    ) {
        this.setState({isLoading: true});
        axios(this.state.links.next)
        .then(response => {
            this.setState({ 
                flowerData: this.state.flowerData.concat(response.data.flowers), 
                links: response.data.links,
                isLoading: false
            })
        })
        .catch(() => {
            alert('서버가 불안정하여 꽃들을 읽어오는데 실패했습니다. 잠시후에 시도해주세요')
        })
    }
}

