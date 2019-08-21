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
                    this.setState({ flowerData: response.data.flowers, isLoading: false })
                })
        })
}
