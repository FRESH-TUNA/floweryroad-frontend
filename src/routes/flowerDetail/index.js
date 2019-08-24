import FlowerDetail from "./flowerDetail";
import axios from 'axios'
export default FlowerDetail;

export const readFlowerData = async function() {
    axios('/flowers/' + this.props.match.params.id)
    .then(response => this.setState({ flower: response.data }))
    .then(() => { return this.readComments(1) })
    .then(response => { this.setState({ comments: response.data.comments, isLoading: false }); })
    .catch(error => {
        alert(error)
    })
}

export const readComments = function(page) { 
    if(this.props.access) {
        return axios({
            method: 'get',
            url: '/flowers/' + this.props.match.params.id + '/comments?page=' + page,
            headers: { authorization: 'Bearer ' + this.props.access }
        }).then(response => {
            return response
        }).catch(async (error) => {
            if(error.response.status === 401) {
                await this.props.Auth.refreshToken()
                if(this.props.error) {
                    await this.props.Auth.logout()
                    alert('세션이 만료되었습니다 다시 로그인해주세요')
                }
                return this.readComments(page)
            }
            else {
                throw '서버가 불안정합니다 잠시후에 다시 시도해주세요'
            }
        })
    }
    else {
        return axios('/flowers/' + this.props.match.params.id + '/comments?page=' + page)
    }
}

export const checkComments = function(index) {
    if ((index + 1) % 6 === (this.state.commentsCount - 2) % 6) { 
        this.readComments(this.state.lastCommentPage + 1)
        .then(response => {
            this.setState({
                'comments': this.state.comments.concat(response.data.comments),
                'commentsCount': this.state.commentsCount + this.state.commentsCount,
                'lastCommentPage': this.state.lastCommentPage + 1,
                'lastCommentPosition': index
            })
        })
        .catch(() => {
            this.setState({
                'lastCommentPosition': index
            })
        })
    }
    else if(!this.state.newCommentState){
        this.setState({
            'lastCommentPosition': index
        })
    }
}

export const openNewComment = function() {
    const lastCommentPosition = this.state.lastCommentPosition
    this.slider.slickGoTo(0)
    this.setState({ 
        'newCommentState': true,
        'lastCommentPosition': lastCommentPosition
    })
}

export const closeNewComment = function(cancel) {
    if (cancel) this.slider.slickGoTo(this.state.lastCommentPosition)
    this.setState({ 'newCommentState': false })
}

export const newComment = function(data) {
    if(data.content === '')
        alert('내용이 비었습니다!')
    else {
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
}

export const deleteComment = function(payload) {
    if(window.confirm("정말 댓글을 지우시겠습니까?")) {
        axios({
            method: 'delete',
            url: '/comments/' + payload.id,
            data: {'flower_pk': this.state.flower.id},
            headers: {
                authorization: 'Bearer ' + this.props.access
            },
        }).then((response) => {
            alert('댓글이 삭제 되었습니다.')
            this.slider.slickGoTo(0)
            this.setState({ 
                'comments': response.data.comments,
                'commentsCount': 6,
                'lastCommentPage': 1,
                'lastCommentPosition': 1
            })
        }).catch(error => {
            this.errorHandler(error.response.status, this.deleteComment, payload)
        })
    }
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
        alert('서버가 불안정합니다. 관리자한테 문의하세요')
    }
    else if(funcname === 'deleteComment'){
        alert('서버가 불안정합니다. 관리자한테 문의하세요')
    }
}