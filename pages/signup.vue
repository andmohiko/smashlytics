<template>
  <div class="signup-container">
    <div class="signup">
      <div class="form">
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <TextField ref="userId" :allowEmpty="false" label="ユーザID (*)" placeholder="userid" />
          <TextField ref="username" :allowEmpty="false" label="ユーザ名 (*)" placeholder="ユーザ名" />
          <TextField ref="twitterId" label="Twitter Id" placeholder="twitterId" />
        </form>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="fighter"
            iconSize="48px"
            :isShowName="true"
            label="メインファイターを選ぶ (*)"
          />
        </div>
        <p class="error">{{ error }}</p>
      </div>
      <div class="mb-10">
        <span class="text-gray-700 px-1 py-3 flex items-center">※ユーザIDはあとから変更できません</span>
        <Button @onClick="submit" label="登録する" />
      </div>
      <div class="logout text-gray-500">
        <button @click="logout">googleログアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import FighterSelecter from '@/components/FighterSelecter.vue'
import firebase from '@/plugins/firebase'
import Cookies from "universal-cookie"
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    Button,
    TextField,
    FighterSelecter
  },
  data () {
    return {
      user: {
        userId: '',
        username: '',
        twitterId: '',
        mainFighterId: ''
      },
      uid: '',
      error: ''
    }
  },
  methods: {
    select() {
      this.user.mainFighterId = String(this.$refs.fighter.get())
    },
    submit () {
      console.log('submit')
      const authId = this.$store.state.uid
      this.user.userId = this.$refs.userId.input
      this.user.username = this.$refs.username.input
      this.user.twitterId = this.$refs.twitterId.input || null
      if (this.user.twitterId && this.user.twitterId.slice(0,1) === '@') {
        this.user.twitterId = this.user.twitterId.slice(1)
      }
      if (!authId || this.user.userId === '' || this.user.username === '') {
        this.error = 'ユーザIDとユーザ名を入力してください'
        return
      }
      const db = firebase.firestore()
      try {
        db.collection('authUsers')
          .doc(authId)
          .set({
            createdAt: serverTimestamp,
            userId: this.user.userId,
            loginMethod: 'google'
          })
        const createdUser = db
          .collection('users')
          .doc(this.user.userId)
          .set({
            createdAt: serverTimestamp,
            updatedAt: serverTimestamp,
            authId,
            username: this.user.username,
            twitterId: this.user.twitterId,
            main: this.user.mainFighterId
          })
          .catch(error => {
            console.error("Error updating document: ", error);
          })
        this.$store.commit('setUser', {
          userId: this.user.userId,
          username: this.user.username,
          twitterId: this.user.twitterId
        })
        this.$store.commit('setRecords', [])
        this.$router.push("/")
      } catch (error) {
        console.log('error in setup', error)
      }
    },
    logout(){
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUid', '')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      window.localStorage.clear();
      this.$router.push("/new")
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
  // border: solid red 1px;
}
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
}
.fighter-selecter {
  position: relative;
  left: 16px;
}
.error {
  color: red;
}
.logout {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: right;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>