<template>
  <div class="edit-container">
    <div class="edit pt-2">
      <div class="input w-full">
        <p class="flash-message">{{ flashMessage }}</p>
        <form class="mb-4 px-4 w-full">
          <label class="text-gray-700 flex text-left">アイコンを選択する</label>
          <input type="file" @change="selectIcon">
          <TextField ref="username" label="ユーザ名" :defaultValue="user.username" placeholder="username" />
          <TextField ref="twitterId" label="Twitter Id" :defaultValue="user.twitterId" placeholder="twitterId" prefix="@" />
          <TextArea ref="selfIntroduction" label="自己紹介" :defaultValue="user.selfIntroduction" placeholder="1日1メテオ"  />
          <TextField ref="friendCode" label="フレンドコード" :defaultValue="user.friendCode" placeholder="SW-xxxx-xxxx-xxxx" />
          <TextField ref="smashmateRating" label="スマメイト 最高レーティング" :defaultValue="user.smashmateRating" placeholder="1500" />
          <TextArea ref="mainPlayingTime" label="主にプレイしている時間帯" :defaultValue="user.mainPlayingTime" placeholder="平日の21時~24時が多いです！" />
          <div class="voiceChat flex flex-col">
            <label class="text-gray-700 text-left">ボイスチャット</label>
            <div class="options flex flex-wrap items-start">
              <Checkbox ref="discord" :defaultValue="editUser.voiceChat.discord" label="Discord" />
              <Checkbox ref="nintendoSwitchOnline" :defaultValue="editUser.voiceChat.nintendoSwitchOnline" label="Nintendo Switch Online" />
              <Checkbox ref="line" :defaultValue="editUser.voiceChat.line" label="Line" />
              <Checkbox ref="skype" :defaultValue="editUser.voiceChat.skype" label="Skype" />
              <Checkbox ref="listenOnly" :defaultValue="editUser.voiceChat.listenOnly" label="聞き専" />
              <Checkbox ref="ng" :defaultValue="editUser.voiceChat.ng" label="NG" />
            </div>
          </div>
        </form>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="mainFighter"
            :previouslySelected="user.main"
            :isShowName="true"
            iconSize="48px"
            label="メインファイターを選ぶ"
          />
        </div>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="subFighter"
            :previouslySelected="user.sub"
            :isShowName="true"
            iconSize="48px"
            label="サブも選べるよ"
          />
        </div>
        <div class="my-4">
          <p class="text-lg pb-4">プロフィールを公開します？</p>
          <div class="flex justify-center items-center">
            <RadioButton v-model="editUser.isPrivateAccount" label="公開する" :value="false" />
            <RadioButton v-model="editUser.isPrivateAccount" label="公開しない" :value="true" />
          </div>
        </div>
        <p class="flash-message">{{ flashMessage }}</p>
      </div>
      <div class="submit">
        <Button @onClick="submit" label="保存する" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Button from '@/components/parts/Button.vue'
import TextField from '@/components/input/TextField.vue'
import TextArea from '@/components/input/TextArea.vue'
import Checkbox from '@/components/input/Checkbox.vue'
import RadioButton from '@/components/input/RadioButton.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import { updateUser } from '@/repositories/users.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    Button,
    TextField,
    TextArea,
    Checkbox,
    FighterSelecter,
    RadioButton
  },
  data () {
    return {
      editUser: {
        main: '',
        sub: '',
        isPrivateAccount: null,
        voiceChat: {
          discord: false,
          nintendoSwitchOnline: false,
          line: false,
          skype: false,
          listenOnly: false,
          ng: false
        },
      },
      flashMessage: '',
      updatedProfileImg: false
    }
  },
  mounted() {
    this.editUser.isPrivateAccount = this.$store.state.user.isPrivateAccount
    this.editUser.main = this.$store.state.user.main
    this.editUser.sub = this.$store.state.user.sub
    if (this.$store.state.user.voiceChat) {
      this.editUser.voiceChat = {
        ...this.$store.state.user.voiceChat
      }
    }
  },
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
    selectIcon(e) {
     const file = e.target.files[0]
     const storage = firebase.storage()
     const storageRef = storage.ref()
     const uploadTask = storageRef.child(`images/user/${this.user.userId}/profileImg.png`).put(file)
     uploadTask.on(
       'state_changed',
       (snapshot) => {
        //  console.log('snapshot', snapshot)
        this.updatedProfileImg = true
       },
       (error) => {
         console.log('err', error)
       },
       () => {
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //  console.log('File available at', downloadURL)
         })
       }
     )
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
      const updateUserDto = {
        username: this.$refs.username.input,
        twitterId: this.$refs.twitterId.input,
        selfIntroduction: this.$refs.selfIntroduction.input,
        main: this.editUser.main || null,
        sub: this.editUser.sub || null,
        friendCode: this.$refs.friendCode.input,
        smashmateRating: this.$refs.smashmateRating.input,
        mainPlayingTime: this.$refs.mainPlayingTime.input,
        isPrivateAccount: this.editUser.isPrivateAccount,
        voiceChat: {
          discord: this.$refs.discord.input,
          nintendoSwitchOnline: this.$refs.nintendoSwitchOnline.input,
          line: this.$refs.line.input,
          skype: this.$refs.skype.input,
          listenOnly: this.$refs.listenOnly.input,
          ng: this.$refs.ng.input,
        },
        profileImgPath: this.updatedProfileImg ? `images/user/${this.user.userId}/profileImg.png` : this.user.profileImgPath
      }
      try {
        updateUser(this.user, updateUserDto)
        this.$store.dispatch('updateUser', updateUserDto)
        // this.$store.dispatch('getUser', this.user.userId)
        this.$store.commit('setNotice', { noticeType: 'success', message: '保存しました' })
        window.setTimeout(() => this.$router.go(-1), 800)
      } catch(error) {
        console.log('updating error', error)
        this.$store.commit('setNotice', { noticeType: 'error', message: 'プロフィールの更新に失敗しました' })
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
  // width: 400px;
}
.flash-message {
  color: red;
}
</style>