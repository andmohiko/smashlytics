<template>
  <div class="signup-container">
    <div class="signup">
      <div class="form">
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <TextField ref="userId" :allowEmpty="false" label="ユーザID (*)" placeholder="5~15字の英数字で！" />
          <TextField ref="username" :allowEmpty="false" label="ユーザ名 (*)" placeholder="ユーザ名は日本語ok🙆" />
          <TextField ref="twitterId" label="Twitter Id" placeholder="twitterId" prefix="@" />
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
        <form class="mb-4 px-4">
          <p>プロフィールを公開します？</p>
          <div class="input-radio mb-1">
            <input
              id="isPrivateAccount-public"
              v-model="user.isPrivateAccount"
              type="radio"
              name="isPublic"
              :value="false"
            />
            <label for="isPublic">公開する</label>
          </div>
          <div class="input-radio">
            <input
              id="isPrivateAccount-private"
              v-model="user.isPrivateAccount"
              type="radio"
              name="isPrivate"
              :value="true"
            />
            <label for="isPrivate">公開しない</label>
          </div>
        </form>
        <p class="error">{{ error }}</p>
      </div>
      <div class="mb-10">
        <span class="text-gray-700 px-1 py-3 flex items-center">※ユーザIDはあとから変更できません</span>
        <Button @onClick="submit" label="利用規約に同意して登録" />
        <div class="rule mt-6">
          <a class="rule-link text-gray-700 text-sm" @click="openTermsPage">
            利用規約はこちら
            <i class="material-icons text-base text-gray-700">open_in_new</i>
          </a>
        </div>
      </div>
      <div class="logout text-gray-500">
        <button @click="logout">googleログアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import forbiddenIds from '@/assets/forbiddenIds.json'
import Button from '@/components/parts/Button.vue'
import TextField from '@/components/input/TextField.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import firebase from '@/plugins/firebase'
import { logEvent } from '@/utils/analytics.js'
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
        mainFighterId: '',
        isPrivateAccount: false
      },
      uid: '',
      error: '',
      userIds: []
    }
  },
  async fetch() {
    const db = firebase.firestore()
    await db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.userIds.push(doc.data().userOriginalId)
        })
      })
  },
  methods: {
    select() {
      this.user.mainFighterId = String(this.$refs.fighter.get())
    },
    submit () {
      console.log('submit')
      this.error = ''
      const authId = this.$store.state.uid
      this.user.userId = this.$refs.userId.input
      this.user.username = this.$refs.username.input
      this.user.twitterId = this.$refs.twitterId.input || null
      if (!authId) {
        this.error = 'ログインできておりません。再度ログインしてください。'
        return
      }
      if (this.user.userId === '' || this.user.username === '') {
        this.error = 'ユーザIDとユーザ名を入力してください'
        return
      }
      const nameExp = /^[a-zA-Z0-9_]{5,15}$/
      const numExp = /^[0-9]{5,15}$/
      if (
        !nameExp.test(this.user.userId) ||
        forbiddenIds.forbiddenIds.filter(id => this.user.userId.startsWith(id)).length > 0 ||
        this.userIds.includes(this.user.userId)
      ) {
        this.error = '入力されたユーザIDは使用できません'
        return
      }
      if (numExp.test(this.user.userId)) {
        this.error = '英字を含めてください'
        return
      }
      if (this.user.twitterId && this.user.twitterId.slice(0,1) === '@') {
        this.user.twitterId = this.user.twitterId.slice(1)
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
        const createUserDto = {
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          authId,
          userOriginalId: this.user.userId,
          username: this.user.username,
          twitterId: this.user.twitterId,
          main: this.user.mainFighterId,
          isPrivateAccount: this.user.isPrivateAccount,
          profileImgPath: 'images/user/profileImg.png',
          results: {
            wins: 0,
            loses: 0,
            matches: 0
          },
          resultsArena: {
            wins: 0,
            loses: 0,
            matches: 0
          }
        }
        db.collection('users')
          .doc(authId)
          .set(createUserDto)
          .catch(error => {
            console.error("Error creating document: ", error);
          })
        this.$store.commit('setUser', {
          ...createUserDto,
          userId: authId
        })
        this.$store.commit('setIsLogin', true)
        this.$store.commit('setRecords', [])
        this.$router.push("/")
        logEvent('signup', undefined)
      } catch (error) {
        console.log('error in setup', error)
      }
    },
    logout(){
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUid', '')
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      window.localStorage.clear();
      logEvent('logoutFromSignup', undefined)
      this.$router.push("/new")
    },
    openTermsPage() {
      logEvent('view_terms', undefined)
      window.open('https://www.notion.so/874f7e1046f94d959b61025c2f663ecd')
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
  align-items: center;
  text-align: center;
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