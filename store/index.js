import firebase from '@/plugins/firebase'
import { setCookie } from '@/plugins/cookie'
import { now } from '@/utils/date.js'

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
      dispatch('checkLogin')
    }).catch(error => {
      console.log(error)
    })
  },
  async checkLogin ({ commit, dispatch }) {
    await firebase.auth().onAuthStateChanged(user => {
      if (!user) return
      const uid = user.uid
      console.log('uid', uid)
      setCookie(user)
      commit('setUid', uid)
      dispatch('isUser', uid)
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
          record.createdAt = record.createdAt.toDate()
          record.updatedAt = record.updatedAt.toDate()
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
    let recordsUnshifted = state.records.slice()
    recordsUnshifted.unshift(newRecord)
    commit('setRecords', recordsUnshifted)
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
    actions
  })
}

export default store
