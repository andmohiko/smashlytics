import firebase from '@/plugins/firebase'
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
  records: [],
  fighters: {}
}


const actions = {
  loginGoogle ({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result => {
      dispatch('checkLogin')
      console.log('result', result)
    }).catch(error => {
      console.log(error)
    })
  },
  checkLogin ({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUid', user.uid)
        console.log('user', user)
        console.log('uid', user.uid)
        dispatch('getUserData', user.uid)
      }
    })
  },
  // updateUserData ({ commit }) {
  // },
  getUserData ({ commit }, uid) {
    const db = firebase.firestore()
    const userDocRef = db.collection('users').doc(uid)
    userDocRef.get().then(doc => {
      if (!doc.exists) {
        this.$router.push("/signup");
        return
      }
      const user = doc.data()
      console.log("user data", user)
      commit('setUser', {
        userId: user.userId,
        username: user.username,
        twitterId: user.twitterId,
        main: user.main
      })
      this.$router.push("/");
    })
    .catch(function(error) {
      console.log("Error getting document:", error)
    })
  },
  async getRecords ({ commit }, userId) {
    const db = firebase.firestore()
    const records = await db
      .collection('records')
      .where("userId", "==", userId)
      .get()
      .then(querySnapshot => {
        let recordsArray = []
        querySnapshot.forEach(doc => {
          recordsArray.push(doc.data())
        })
        return recordsArray.sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1
        })
      }).catch(function(error) {
        console.log("Error getting document:", error);
      })
    commit('setRecords', records)
  },
  async getFighters ({ commit }) {
    const db = firebase.firestore()
    const fighters = await db
      .collection('fighters')
      .get()
      .then(querySnapshot => {
        let fighters = {}
        querySnapshot.forEach(doc => {
          fighters[doc.id] = doc.data()
        })
        return fighters
      }).catch(function(error) {
        console.log("Error getting document:", error);
      })
    commit('setFighters', fighters)
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
  },
  setFighters(state, payload) {
    state.fighters = payload
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
