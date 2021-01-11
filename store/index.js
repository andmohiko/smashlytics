import firebase from '@/plugins/firebase'
import { setCookie } from '@/plugins/cookie'
import Cookies from "universal-cookie"
import { now, date2string } from '@/utils/date.js'
import { getUser } from '@/repositories/users.js'
import { getRecords } from '@/repositories/records.js'
import createPersistedState from "vuex-persistedstate"
import { logEvent } from '@/utils/analytics.js'


const db = firebase.firestore()
// import "firebase/auth"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  uid: '',
  isLogin: false,
  records: [],
  userIds: [],
  notice: {
    noticeType: null,
    message: ''
  }
}

const actions = {
  loginGoogle ({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result => {
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      dispatch('checkLogin')
    }).catch(error => {
      console.log(error)
    })
  },
  async checkLogin ({ commit, dispatch }) {
    await firebase.auth().onAuthStateChanged(user => {
      if (!user) return
      const uid = user.uid
      commit('setUid', uid)
      dispatch('isUser', uid)
      setCookie(user)
    })
  },
  async isUser({ commit, dispatch }, authId) {
    const db = firebase.firestore()
    const authUser = await db
      .collection('authUsers')
      .doc(authId)
      .get()
      .then(doc => {
        return doc.data()
      })
    if (!authUser) {
      this.$router.push("/signup")
      return
    }
    const userId = authUser.userId
    commit('setIsLogin', true)
    dispatch('getUser', userId)
    dispatch('getRecords', userId)
    // this.$router.push("/")
  },
  async getUser ({ commit }, userId) {
    const user = await getUser(userId)
    commit('setUser', {
      userId,
      ...user
    })
    logEvent('getUser', undefined)
  },
  async getRecords ({ commit }, userId) {
    const records = await getRecords(userId)
    commit('setRecords', records)
    logEvent('getRecords', undefined)
  },
  addRecords ({ commit, state }, newRecord) {
    newRecord.createdAt = new Date(now())
    newRecord.updatedAt = new Date(now())
    newRecord.createdAtString = date2string(newRecord.createdAt)
    let records = state.records.slice()
    records.unshift(newRecord)
    commit('setRecords', records)
  },
  updateUser ({ commit, state }, updateUserDto) {
    commit('setUser', {
      ...state.user,
      ...updateUserDto
    })
  },
  setNotice ({ commit }, notice) {
    commit('setNotice', notice)
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setIsLogin(state, payload) {
    state.isLogin = payload
  },
  setRecords(state, payload) {
    state.records = payload
  },
  setUid(state, payload) {
    state.uid = payload
  },
  setUserIds(state, payload) {
    state.userIds = payload
  },
  setNotice(state, payload) {
    state.notice = payload
  }
}

const store = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()]
  })
}

export default store
