import FlowerDetail from "./flowerDetail";
import axios from 'axios'
export default FlowerDetail;

export const readFlowerData = function() {
    axios('/flowers/' + this.props.match.params.id)
    .then(response => this.setState({ flower: response.data }))
    .then(() => { return this.readComments(1) })
    .then(response => { this.setState({ comments: response.data.comments, isLoading: false }); })
}

export const checkComments = function(index) {
    if ((index + 1) % 6 === this.state.commentsCount - 2) { 
        this.readComments(this.state.lastCommentPage + 1)
        .then(response => {
            this.setState({
                'comments': this.state.comments.concat(response.data.comments),
                'commentsCount': this.state.commentsCount + this.state.commentsCount,
                'lastCommentPage': this.state.lastCommentPage + 1,
                'lastCommentPosition': index
            })
        })
    }
}

export const readComments = function(page) {
    return axios('/flowers/' + this.props.match.params.id + '/comments?page=' + page)
}

export const openNewComment = function() {
    this.slider.slickGoTo(0)
    this.setState({ 'newCommentState': true })
}

export const closeNewComment = function(cancel) {
    if (cancel) this.slider.slickGoTo(this.state.lastCommentPosition)
    this.setState({ 'newCommentState': false })
}

export const newComment = function(data) {
    axios({
        method: 'post',
        url: '/flowers/' + this.state.flower.id + '/comments/',
        data,
        headers: {
            authorization: 'Bearer ' + this.props.access
        },
    }).then((response) => {
        this.setState({ 
            'comments': response.data.comments,
            'commentsCount': 6,
            'lastCommentPage': 1,
            'lastCommentPosition': 1
        })
    }).then(() => {
        this.closeNewComment(false)
    }).catch(error => {
        this.errorHandler(error.response.status, this.newComment, data)
    })
}

export const errorHandler = async function(status, func, payload) {
    const funcname = func.name.substring(6)

    if(status === 401) {
        if(this.props.isLogin) {
            await this.props.Auth.refreshToken()
            if(this.props.error) {
                await this.props.Auth.logout()
                alert('세션이 만료되었습니다 다시로그인해주세요') 
            }
            else
                func(payload)
        }
        else
            alert('로그인 이후에 이용해주세요!') 
    }
    else if(funcname === 'newComment'){
        payload.content === '' ? 
        alert('내용이 비었어요!') :
        alert('서버 오류입니다. 관리자한테 문의하세요')
    }
}