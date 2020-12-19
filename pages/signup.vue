<template>
  <div class="container">
    <div class="input">
      <p>userId</p>
      <input v-model="newUser.userId" type="text">
      <p>username</p>
      <input v-model="newUser.username" type="text">
      <p>twitterId</p>
      <input v-model="newUser.twitterId" type="text">
      <p>email</p>
      <input v-model="newUser.email" type="text">
    </div>
    <div class="submit">
      <button @click="submit" type="button">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'

export default {
  data () {
    return {
      newUser: {
        userId: '',
        username: '',
        twitterId: '',
        email: ''
      }
    }
  },
  methods: {
    submit () {
      const db = firebase.firestore()
      const createdUser = db.collection('users').doc(this.newUser.userId).set({
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          username: this.newUser.username,
          twitterId: this.newUser.twitterId,
          email: this.newUser.email
        })
        .then(ref => {
          console.log('Add ID: ', ref)
          return ref
        })
      console.log('createdUser', createdUser)
    },
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
      });
    },
  },
}
</script>
