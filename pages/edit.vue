<template>
  <div class="container">
    <div class="form">
      <div class="input">
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <TextField ref="username" label="ユーザ名" placeholder="username" />
          <TextField ref="twitterId" label="Twitter Id" placeholder="@twitterId" />
          <TextField ref="main" label="メイン" placeholder="マリオ" />
          <TextField ref="friendCode" label="フレンドコード" placeholder="SW-xxxx-xxxx" />
        </form>
      </div>
      <div class="submit">
        <Button @onClick="submit" label="保存する" />
      </div>
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
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
        twitterId: '',
        main: '',
        sub: '',
        friendCode: ''
      },
      uid: '',
      error: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
    })
  },
  computed: {
    userData() {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      console.log('submit')
      // const uid = this.$store.state.uid
      const uid = 'yEGvP90uYMfFlzqjEknNrBkjjsw2'
      console.log('uid')
      if (!uid || this.$refs.username.input === '') {
        this.error = 'ユーザ名を入力してください'
        return
      }
      const db = firebase.firestore()
      const updateData = db.collection('users').doc('andmohiko').update({
          updatedAt: serverTimestamp,
          username: this.$refs.username.input,
          twitterId: this.$refs.twitterId.input,
          main: this.$refs.main.input,
          friendCode: this.$refs.friendCode.input
        })
        .then(ref => {
          console.log('Add ID: ', ref)
          return ref
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        })
      console.log('updated', updateData)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin: 20px 0;
}
.error {
  color: red;
}
</style>