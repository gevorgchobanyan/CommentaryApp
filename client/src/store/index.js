import { createStore } from 'vuex'

import axios from 'axios'
import router from '../router'
import * as commentsService from '../services/comments'

export default createStore({
  state: {
    form: {},
    comments: [],
  },
  getters: {
    comments(state){
      return state.comments
    }
  },
  mutations: {
    setForm(state, {key, value}){
      state.form[key] = value
    },
    setComments(state, comments){
      state.comments = comments
    },
    setComment(state, updatedComment){
      Object.assign(
        state.comments.find(comment => comment._id === updatedComment._id),
        updatedComment
        )
    }
  },
  actions: {
    async createComment(context){
      await commentsService.createComment(context.state.form)
      router.push('/')
    },
    async getComments(context){
      const comments = await commentsService.getComments()
      context.commit('setComments', comments)
    },
    async upVoteComment(context, comment){
      const updatedComment = await commentsService.upVoteComment(comment)
      context.commit('setComment', updatedComment)
    },
    async downVoteComment(context, comment){
      const updatedComment = await commentsService.downVoteComment(comment)
      context.commit('setComment', updatedComment)
    },
  },
  modules: {
  }
})
