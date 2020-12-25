<template>
  <div class="container">
    <div class="signup">
      <div class="form">
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <TextField ref="userId" :allowEmpty="false" label="ユーザID" placeholder="userid" />
          <TextField ref="username" :allowEmpty="false" label="ユーザ名" placeholder="ユーザ名" />
          <TextField ref="twitterId" label="Twitter Id" placeholder="twitterId" />
        </form>
      </div>
      <Button @onClick="submit" label="登録する" />
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import firebase from '@/plugins/firebase'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    Button,
    TextField
  },
  data () {
    return {
      user: {
        userId: '',
        username: '',
        twitterId: ''
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
      // const authId = this.$store.state.uid
      const authId = 'yEGvP90uYMfFlzqjEknNrBkjjsw2'
      this.user.userId = this.$refs.userId.input
      this.user.username = this.$refs.username.input
      this.user.twitterId = this.$refs.username.twitterId || null
      if (!authId || this.user.userId === '' || this.user.username === '') {
        this.error = 'ユーザIDとユーザ名を入力してください'
        return
      }
      const db = firebase.firestore()
      console.log('db')
      const createdUser = db
        .collection('users')
        .doc(this.user.userId)
        .set({
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          authId,
          username: this.user.username,
          twitterId: this.user.twitterId,
        })
        .then(ref => {
          // console.log('Add ID: ', ref)
          return ref
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        })
      // console.log('createdUser', createdUser)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  // border: solid red 1px;
}
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.error {
  color: red;
}
</style>