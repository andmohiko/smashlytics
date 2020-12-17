<template>
  <div>
    mypage
    <!-- <button @click="getData" >getdata</button> -->
    {{ user }}
  </div>
</template>

<script>
import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'

export default {
  data () {
    return {
      user: {}
    }
  },
  async asyncData ({ store }) {
    const db = firebase.firestore()
    const userId = 'andmohiko'
    const docRef = db.collection('users').doc(userId)
    const user = await docRef.get().then(
      function(doc) {
        if (doc.exists) {
          console.log("asyncData Document data:", doc.data());
          const gotUser = doc.data()
          console.log(gotUser.username)
          return gotUser
        } else {
          console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
    store.commit('setUser', user)
    return { user }
  },
  methods: {
    async getData () {
      const db = firebase.firestore()
      const docRef = db.collection('users').doc('andmohiko')
      this.user = await docRef.get().then(
        function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            const gotUser = doc.data()
            console.log(gotUser.username)
            return gotUser
          } else {
            console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      })
    },
  },
}
</script>
