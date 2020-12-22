<template>
  <div class="container">
    <div class="title">
      <h2>sign up</h2>
    </div>
    <div class="form">
      <div class="input">
        <p class="error">{{ error }}</p>
        <p>userId</p>
        <input v-model="newUser.userId" type="text">
        <p>username</p>
        <input v-model="newUser.username" type="text">
        <p>twitterId</p>
        <input v-model="newUser.twitterId" type="text">
        <p>main</p>
        <input v-model="newUser.main" type="text">
        <!-- <p>password</p>
        <input v-model="newUser.password" type="text"> -->
      </div>
      <div class="submit">
        <button @click="submit" type="button">
          Submit
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  data () {
    return {
      newUser: {
        userId: '',
        username: '',
        twitterId: '',
        email: '',
        password: ''
      },
      uid: '',
      error: ''
    }
  },
  // async fetch ({ store, params }) {
  //   const uid = this.$store.state.uid
  //   console.log('uid', uid)    
  // },
  // mounted() {
  //   firebase.auth().onAuthStateChanged(user => {
  //   })
  // },
  methods: {
    submit () {
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(
      //     this.newUser.email, this.newUser.password
      //   )
      //   .then(res => {
      //     console.log('res', res)
      //   })
      //   .catch(error => {
      //     this.error = (code => {
      //       switch (code) {
      //         case "auth/email-already-in-use":
      //           return "既にそのメールアドレスは使われています";
      //         case "auth/wrong-password":
      //           return "※パスワードが正しくありません";
      //         case "auth/weak-password":
      //           return "※パスワードは最低6文字以上にしてください";
      //         default:
      //           return "※メールアドレスとパスワードをご確認ください";
      //       }
      //     })(error.code);
      //   });
      console.log('submit')
      const uid = this.$store.state.uid
      console.log('uid')
      if (!uid || this.newUser.userId === '' || this.newUser.username === '') {
        this.error = 'ユーザIDとユーザ名を入力してください'
        return
      }
      const db = firebase.firestore()
      console.log('db')
      const createdUser = db.collection('users').doc(uid).set({
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          userId: this.newUser.userId,
          username: this.newUser.username,
          twitterId: this.newUser.twitterId,
          main: this.newUser.main
        })
        .then(ref => {
          console.log('Add ID: ', ref)
          return ref
        })
      console.log('createdUser', createdUser)
    }
    // async getData () {
    //   const db = firebase.firestore()
    //   const docRef = db.collection('users').doc('andmohiko')
    //   this.user = await docRef.get().then(
    //     function(doc) {
    //       if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //         const gotUser = doc.data()
    //         console.log(gotUser.username)
    //         return gotUser
    //       } else {
    //         console.log("No such document!");
    //       }
    //   }).catch(function(error) {
    //       console.log("Error getting document:", error);
    //   });
    // },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-size: 24px;
  margin: 40px 0;
}
.error {
  color: red;
}
</style>