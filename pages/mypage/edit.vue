<template>
  <div class="edit-container">
    <div class="edit">
      <div class="form">
        <div class="input">
          <p class="flash-message">{{ flashMessage }}</p>
          <form class="mb-4 px-4">
            <TextField ref="username" label="ユーザ名" :defaultValue="user.username" placeholder="username" />
            <TextField ref="twitterId" label="Twitter Id" :defaultValue="user.twitterId" placeholder="@twitterId" />
            <!-- <TextField ref="selfIntroduction" label="自己紹介" :defaultValue="user.selfIntroduction" placeholder="1日1メテオ" /> -->
            <TextField ref="friendCode" label="フレンドコード" :defaultValue="user.friendCode" placeholder="SW-xxxx-xxxx-xxxx" />
            <TextField ref="smashmateRating" label="スマメイト 最高レーティング" :defaultValue="user.smashmateRating" placeholder="1500" />
          </form>
          <div class="fighter-selecter">
            <FighterSelecter
              @select="select"
              ref="mainFighter"
              :previouslySelected="user.main"
              iconSize="48px"
              label="メインファイターを選ぶ"
            />
          </div>
          <div class="fighter-selecter">
            <FighterSelecter
              @select="select"
              ref="subFighter"
              :previouslySelected="user.sub"
              iconSize="48px"
              label="サブも選べるよ"
            />
          </div>
          <!-- <form class="mb-4 px-4">
            <p>プロフィールを公開します？</p>
            <div class="input-radio mb-1">
              <input
                id="isPrivateAccount-public"
                v-model="editUser.isPrivateAccount"
                type="radio"
                name="isPublic"
                :value="false"
              />
              <label for="isPublic">公開する</label>
            </div>
            <div class="input-radio">
              <input
                id="isPrivateAccount-private"
                v-model="editUser.isPrivateAccount"
                type="radio"
                name="isPrivate"
                :value="true"
              />
              <label for="isPrivate">公開しない</label>
            </div>
          </form> -->
          <p class="flash-message">{{ flashMessage }}</p>
        </div>
        <div class="submit">
          <Button @onClick="submit" label="保存する" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import FighterSelecter from '@/components/FighterSelecter.vue'
import { updateUser } from '@/repositories/users.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    Button,
    TextField,
    FighterSelecter
  },
  data () {
    return {
      editUser: {
        username: '',
        twitterId: '',
        main: '',
        sub: '',
        friendCode: '',
        // isPrivateAccount: false
      },
      uid: '',
      flashMessage: ''
    }
  },
  // mounted() {
  //   this.editUser.isPrivateAccount = this.$store.state.user.isPrivateAccount
  // },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    select() {
      this.editUser.main = String(this.$refs.mainFighter.get())
      this.editUser.sub = String(this.$refs.subFighter.get())
      console.log(this.editUser.main, this.editUser.sub)
    },
    submit () {
      console.log('submit')
      const authId = this.$store.state.uid
      if (!authId) {
        this.flashMessage = 'ログインできておりません。再度ログインしてください。'
        return
      }
      if (this.$refs.username.input === '') {
        this.flashMessage = 'ユーザ名を入力してください'
        return
      }
      this.user.twitterId = this.$refs.twitterId.input
      if (this.user.twitterId && this.user.twitterId.slice(0,1) === '@') {
        this.user.twitterId = this.user.twitterId.slice(1)
      }
      const updatingDto = {
        username: this.$refs.username.input,
        twitterId: this.$refs.twitterId.input,
        main: this.editUser.main,
        sub: this.editUser.sub,
        friendCode: this.$refs.friendCode.input,
        smashmateRating: this.$refs.smashmateRating.input,
        // isPrivateAccount: this.editUser.isPrivateAccount
      }
      try {
        updateUser(this.user, updatingDto)
        this.$store.commit('setUser', {
            ...this.user,
            ...updatingDto
          })
        this.flashMessage = '保存しました。'
      } catch(error) {
        console.log('updating error', error)
        this.flashMessage = 'プロフィールの更新に失敗しました。'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
}
.title {
  margin: 20px 0;
}
.flash-message {
  color: red;
}
</style>