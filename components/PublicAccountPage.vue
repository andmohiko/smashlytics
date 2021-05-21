<template>
  <div class="container">
    <div class="bg-white shadow-md rounded px-8 pt-8 pb-6 mb-4 flex flex-col w-full text-left">
      <ProfileIcon :profileImgPath="user.profileImg" />
      <div class="name pb-4">
        <p class="username text-3xl text-gray-800">{{ user.username }}</p>
        <p class="userId text-xl text-gray-700">{{ user.userOriginalId }}</p>
        <div v-if="user.twitterId" class="twitter text-gray-700 flex items-center text-lg my-2">
          <svg width="20" height="20" fill="#49A1F2" class="text-white opacity-40">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
          <span class="pl-2">@{{ user.twitterId }}</span>
        </div>
        <div v-if="user.friendCode" class="twitter text-gray-700 flex items-center text-lg my-2">
          <img class="w-6 h-6" src="images/logo/nintendoSwitchOnline.jpg">
          <span class="pl-2">{{ user.friendCode }}</span>
        </div>
      </div>
      <p class="userId text-base pt-2 text-gray-700">{{ user.selfIntroduction }}</p>

      <div class="pt-4 pb-4">
        <div v-if="user.results.matches">
          <p class="text-sm text-gray-700 pt-4 border-b w-7/12">総合戦績</p>
          <p class="text-xl py-2 text-gray-700">{{ userWinningPercentage(user.results) }}</p>
        </div>
        <div v-if="Boolean(user.main)">
          <p class="text-sm text-gray-700 pt-1 border-b w-7/12">使用ファイター</p>
          <div class="flex pt-3">
            <div class="pr-2">
              <FighterIcon :fighterId="user.main" size="40px" />
            </div>
            <div v-if="Boolean(user.sub)" class="pr-2">
              <FighterIcon :fighterId="user.sub" size="40px" />
            </div>
          </div>
        </div>
        <div v-if="user.smashmateRating">
          <p class="text-sm text-gray-700 pt-4 border-b w-7/12">スマメイト最高レート</p>
          <p class="userId text-base text-gray-700 pt-2">{{ user.smashmateRating }}</p>
        </div>
        <div v-if="user.mainPlayingTime">
          <p class="text-sm text-gray-700 pt-4 border-b w-7/12">主にプレイしている時間帯</p>
          <p class="userId text-base text-gray-700 pt-2">{{ user.mainPlayingTime }}</p>
        </div>
        <div v-if="user.voiceChat">
          <p class="text-sm text-gray-700 pt-4 border-b w-7/12">ボイスチャット</p>
          <VoiceChat :voiceChat="user.voiceChat" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ProfileIcon from '@/components/parts/ProfileIcon.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import VoiceChat from '@/components/parts/VoiceChat.vue'
import { userWinningPercentage } from '@/utils/records.js'

export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  components: {
    ProfileIcon,
    FighterIcon,
    VoiceChat
  },
  data() {
    return {
      error: ''
    }
  },
  computed: {
    isLogin() {
      return Boolean(this.user.userId)
    },
  },
  methods: {
    login() {
      this.$store.dispatch('loginGoogle')
    },
    toNew() {
      this.$router.push("/new")
    },
    userWinningPercentage
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
@media screen and (min-width: 800px) {
  .container {
    width: 400px;
  }
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.edit {
  margin-top: 16px;
}
.fightersInfo {
  display: flex;
  // flex-direction: column;
  position: relative;
  left: -10px;
  margin-bottom: 10px;
  .fighter {
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 60px 1fr;
    align-items: center;
  }
}
</style>