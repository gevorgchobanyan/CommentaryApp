import axios from 'axios'

const getBasePath = () => {
    return 'http://localhost:5000'
}

export const getComments = async () => {
    const {data: comments} = await axios.get(`${getBasePath()}/comments/`)
    return comments
}

export const createComment = async (comment) => {
    const {data: newComment} = await axios.post(`${getBasePath()}/comments/`, comment)
    return newComment
}

export const upVoteComment = async (comment) => {
    const {data: updatedComment} = await axios.post(`${getBasePath()}/comments/${comment._id}/votes`)
    return updatedComment
}

export const downVoteComment = async (comment) => {
    const {data: updatedComment} = await axios.delete(`${getBasePath()}/comments/${comment._id}/votes`)
    return updatedComment
}


