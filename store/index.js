import firebase from '@/plugins/firebase'
import { setCookie } from '@/plugins/cookie'
import Cookies from "universal-cookie"
import { now, date2string } from '@/utils/date.js'
import createPersistedState from "vuex-persistedstate"



const db = firebase.firestore()
// import "firebase/auth"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    userId: '',
    username: '',
    twitterId: '',
    main: '',
  },
  uid: '',
  records: []
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
  async isUser({ dispatch }, authId) {
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
    dispatch('getUser', userId)
    dispatch('getRecords', userId)
    // this.$router.push("/")
  },
  async getUser ({ commit }, userId) {
    const user = await db
      .collection('users')
      .doc(userId)
      .get()
      .then(doc => {
        return doc.data()
      }).catch(function(error) {
        console.log("Error getting document:", error);
      })
    commit('setUser', {
      userId,
      username: user.username,
      twitterId: user.twitterId,
      main: user.main
    })
  },
  async getRecords ({ commit }, userId) {
    const db = firebase.firestore()
    const records = await db
      .collection('records')
      .where("userId", "==", userId)
      // .orderBy('createdAt', 'desc')
      // .limit(docLength)
      .get()
      .then(querySnapshot => {
        let recordsArray = []
        querySnapshot.forEach(doc => {
          let record = doc.data()
          record.docId = doc.id
          record.createdAt = record.createdAt.toDate()
          record.updatedAt = record.updatedAt.toDate()
          record.createdAtString = date2string(record.createdAt)
          recordsArray.push(record)
        })
        return recordsArray.sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1
        })
      }).catch(function(error) {
        console.log("Error getting document:", error);
      })
    commit('setRecords', records)
  },
  addRecords ({ commit, state }, newRecord) {
    newRecord.createdAt = new Date(now())
    newRecord.updatedAt = new Date(now())
    newRecord.createdAtString = date2string(newRecord.createdAt)
    let records = state.records.slice()
    records.unshift(newRecord)
    commit('setRecords', records)
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setRecords(state, payload) {
    state.records = payload
  },
  setUid(state, payload) {
    state.uid = payload
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
