<template>
  <div>
    <header class="header">
      <template v-if="isBackiconPage">
        <button class="back-btn" @click="back">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#eaecf0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
      <template v-else-if="isReloadiconPage">
        <button class="reload-btn" @click="getRecords">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2 3.36V7.68L14.88 7.67952" stroke="#E9ECF0" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M20.1595 12C20.1595 16.5072 16.5067 20.16 11.9995 20.16C7.49234 20.16 3.83954 16.5072 3.83954 12C3.83954 7.4928 7.49234 3.84 11.9995 3.84C14.4048 3.84 16.5672 4.88016 18.0605 6.53568C18.3571 6.86496 18.6279 7.21872 18.8683 7.59312" stroke="#E9ECF0" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg>
        </button>
      </template>
      <div>
        <h1 class="page-title">{{ pageTitle }}</h1>
      </div>
      <template v-if="isSettingsiconPage">
        <button class="settings-btn" @click="toSettings">
          <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C11.2116 2 10.4513 2.09971 9.7256 2.26855C9.57426 2.30388 9.43763 2.38534 9.33459 2.50167C9.23155 2.61801 9.16719 2.76347 9.1504 2.91797L8.99122 4.36914C8.93916 4.84468 8.66447 5.26543 8.25001 5.50488C7.83638 5.74386 7.33432 5.77033 6.8965 5.57812H6.89552L5.56251 4.99121C5.42033 4.92864 5.26223 4.91176 5.11004 4.9429C4.95785 4.97403 4.81909 5.05165 4.7129 5.16504C3.67666 6.26979 2.88135 7.60753 2.4297 9.10059C2.38471 9.24919 2.38695 9.40809 2.4361 9.55537C2.48525 9.70265 2.57889 9.83105 2.70411 9.92285L3.88673 10.79C4.27291 11.074 4.50001 11.5214 4.50001 12C4.50001 12.4789 4.27291 12.9267 3.88673 13.21L2.70411 14.0762C2.57889 14.168 2.48525 14.2964 2.4361 14.4437C2.38695 14.5909 2.38471 14.7498 2.4297 14.8984C2.8813 16.3913 3.67598 17.7301 4.7129 18.835C4.8192 18.9482 4.95802 19.0256 5.1102 19.0566C5.26239 19.0875 5.42043 19.0705 5.56251 19.0078L6.89552 18.4209C7.33356 18.2283 7.8361 18.256 8.25001 18.4951C8.66447 18.7346 8.93916 19.1553 8.99122 19.6309L9.1504 21.082C9.16732 21.2362 9.23162 21.3814 9.33446 21.4975C9.4373 21.6136 9.57361 21.695 9.72462 21.7305C10.4507 21.8999 11.2116 22 12 22C12.7885 22 13.5487 21.9003 14.2744 21.7314C14.4258 21.6961 14.5624 21.6147 14.6654 21.4983C14.7685 21.382 14.8328 21.2365 14.8496 21.082L15.0088 19.6309C15.0609 19.1553 15.3356 18.7346 15.75 18.4951C16.1636 18.2561 16.6657 18.2287 17.1035 18.4209L18.4375 19.0078C18.5796 19.0705 18.7376 19.0875 18.8898 19.0566C19.042 19.0256 19.1808 18.9482 19.2871 18.835C20.3234 17.7302 21.1187 16.3915 21.5703 14.8984C21.6153 14.7498 21.6131 14.5909 21.5639 14.4437C21.5148 14.2964 21.4211 14.168 21.2959 14.0762L20.1133 13.21C19.7271 12.9267 19.5 12.4789 19.5 12C19.5 11.5211 19.7271 11.0733 20.1133 10.79L21.2959 9.92383C21.4211 9.83203 21.5148 9.70363 21.5639 9.55635C21.6131 9.40907 21.6153 9.25017 21.5703 9.10156C21.1187 7.60851 20.3234 6.26979 19.2871 5.16504C19.1808 5.05182 19.042 4.97438 18.8898 4.94342C18.7376 4.91246 18.5796 4.9295 18.4375 4.99219L17.1035 5.5791C16.6657 5.77131 16.1636 5.74386 15.75 5.50488C15.3356 5.26543 15.0609 4.84468 15.0088 4.36914L14.8496 2.91797C14.8327 2.76378 14.7684 2.61862 14.6656 2.50249C14.5627 2.38636 14.4264 2.30497 14.2754 2.26953C13.5493 2.10008 12.7885 2 12 2ZM12 3.5C12.4872 3.5 12.955 3.58744 13.4238 3.66992L13.5176 4.53223C13.6215 5.48169 14.1735 6.32617 15 6.80371C15.8271 7.28157 16.8341 7.3365 17.708 6.95215L18.501 6.60352C19.1099 7.3347 19.592 8.16059 19.9287 9.06543L19.2256 9.58105C18.4558 10.1458 18 11.0449 18 12C18 12.9551 18.4558 13.8542 19.2256 14.4189L19.9287 14.9346C19.592 15.8394 19.1099 16.6653 18.501 17.3965L17.708 17.0479C16.8341 16.6635 15.8271 16.7184 15 17.1963C14.1735 17.6738 13.6215 18.5183 13.5176 19.4678L13.4238 20.3301C12.955 20.4123 12.4869 20.5 12 20.5C11.5129 20.5 11.0451 20.4126 10.5762 20.3301L10.4824 19.4678C10.3785 18.5183 9.82656 17.6738 9.00001 17.1963C8.17293 16.7184 7.16597 16.6635 6.292 17.0479L5.49904 17.3965C4.89 16.6654 4.40798 15.8395 4.0713 14.9346L4.77443 14.4189C5.54424 13.8542 6.00001 12.9551 6.00001 12C6.00001 11.0449 5.54387 10.1452 4.77443 9.58008L4.0713 9.06445C4.40818 8.15927 4.89074 7.33392 5.50001 6.60254L6.292 6.95117C7.16597 7.33553 8.17293 7.28157 9.00001 6.80371C9.82656 6.32617 10.3785 5.48169 10.4824 4.53223L10.5762 3.66992C11.045 3.58767 11.5131 3.5 12 3.5ZM12 8C9.79976 8 8.00001 9.79975 8.00001 12C8.00001 14.2003 9.79976 16 12 16C14.2003 16 16 14.2003 16 12C16 9.79975 14.2003 8 12 8ZM12 9.5C13.3896 9.5 14.5 10.6104 14.5 12C14.5 13.3896 13.3896 14.5 12 14.5C10.6104 14.5 9.50001 13.3896 9.50001 12C9.50001 10.6104 10.6104 9.5 12 9.5Z" fill="white"/>
          </svg>
        </button>
      </template>
      <template v-if="isArenaiconPage">
        <button class="settings-btn" @click="toArenaPages">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5312 8.67093C29.272 8.67093 29.0625 8.88093 29.0625 9.13968V9.77436L15.4688 2.75858V1.63968C15.4688 1.38093 15.2592 1.17093 15 1.17093C14.7408 1.17093 14.5312 1.38093 14.5312 1.63968V2.75858L0.9375 9.77483V9.14015C0.9375 8.8814 0.727969 8.6714 0.46875 8.6714C0.209531 8.6714 0 8.8814 0 9.14015V20.8603C0 20.8833 0.00984375 20.903 0.013125 20.9255C0.0178125 20.9587 0.0210938 20.9911 0.0328125 21.0225C0.0426563 21.0506 0.0590625 21.0736 0.0740625 21.0984C0.09 21.1256 0.104062 21.1514 0.125156 21.1748C0.146719 21.1983 0.172969 21.2147 0.198281 21.233C0.2175 21.247 0.231094 21.2658 0.253125 21.2775L14.7844 28.7775C14.7895 28.7803 14.7952 28.7789 14.8008 28.7817C14.858 28.8089 14.9208 28.8253 14.9883 28.8272C14.992 28.8272 14.9958 28.83 14.9991 28.83C15.0023 28.83 15.0066 28.8272 15.0098 28.8272C15.0778 28.8253 15.1402 28.8089 15.1973 28.7817C15.203 28.7789 15.2086 28.7803 15.2138 28.7775L29.745 21.2775C29.7652 21.2672 29.7783 21.2489 29.7961 21.2362C29.8237 21.2165 29.8509 21.1992 29.8734 21.1744C29.8936 21.1519 29.9072 21.1265 29.9222 21.1012C29.9381 21.075 29.955 21.0515 29.9658 21.022C29.977 20.9915 29.9803 20.9592 29.985 20.9269C29.9902 20.9039 30 20.8837 30 20.8603V9.13968C30 8.88093 29.7905 8.67093 29.5312 8.67093ZM15 8.26171L23.9648 12.8892L15.4688 17.2734V16.6397C15.4688 16.3805 15.2592 16.1709 15 16.1709C14.7408 16.1709 14.5312 16.3805 14.5312 16.6397V17.2734L6.03516 12.8887L15 8.26171ZM15.4688 18.3281L24.9872 13.4166L26.2369 14.0616L15.4688 19.619V18.3281ZM14.5312 18.3281V19.619L3.76312 14.0616L5.01281 13.4166L14.5312 18.3281ZM14.5312 20.6737V21.9647L1.49109 15.2344L2.74125 14.5894L14.5312 20.6737ZM15.4688 20.6737L27.2588 14.5889L28.5089 15.2339L15.4688 21.9647V20.6737ZM28.2811 14.0616L29.0625 13.6584V14.4651L28.2811 14.0616ZM27.2588 13.5342L26.0091 12.8892L27.2597 12.2442L28.5089 12.8892L27.2588 13.5342ZM24.9877 12.3614L15.4688 7.44843V6.15843L26.2373 11.7164L24.9877 12.3614ZM14.5312 7.44843L5.01234 12.3614L3.76266 11.7164L14.5312 6.15843V7.44843ZM3.99094 12.8892L2.74125 13.5342L1.49109 12.8892L2.74031 12.2442L3.99094 12.8892ZM1.71891 14.0616L0.9375 14.4647V13.658L1.71891 14.0616ZM0.9375 16.004L14.5312 23.0203V27.5911L0.9375 20.5748V16.004ZM15.4688 23.0198L29.0625 16.0036V20.5744L15.4688 27.5906V23.0198ZM29.0625 12.1191L28.282 11.7164L29.0625 11.3137V12.1191ZM28.5089 10.5441L27.2597 11.1886L15.4688 5.10327V3.81374L28.5089 10.5441ZM14.5312 3.81374V5.10327L2.74031 11.1891L1.49109 10.5445L14.5312 3.81374ZM1.71797 11.7164L0.9375 12.1191V11.3133L1.71797 11.7164Z" fill="#ffffff"/>
          </svg>
        </button>
      </template>
      <template v-if="isTopiconPage">
        <button class="settings-btn" @click="toTop">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6667 16.6667V5L6.66669 23.3333H18.3334V35L33.3334 16.6667H21.6667Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
    </header>
  </div>
</template>



<script>
import { logEvent } from '@/utils/analytics.js'

export default {
  computed: {
    user() {
      return this.$store.state.user
    },
    isLogin() {
      return Boolean(this.uid)
    },
    isBackiconPage() {
      return !(
        this.isReloadiconPage ||
        this.$route.path.match(/\/new$/) ||
        this.$route.path.match(/\/signup$/)
      )
    },
    isReloadiconPage() {
      return (
        this.$route.path.match(/\/$/) ||
        this.$route.path.match(/\/analytics$/) ||
        this.$route.path.match(/\/arena$/) ||
        this.$route.path.match(/\/chart$/)
      )
    },
    isSettingsiconPage() {
      const route = this.$route.path.replaceAll('/', '')
      return (route === this.user.userOriginalId)
    },
    isTopiconPage() {
      return this.$route.path.match(/\/arena$/)
    },
    isArenaiconPage() {
      return (
        this.$route.path.match(/\/$/) ||
        this.$route.path.match(/\/analytics$/)
      )
    },
    routename() {
      return this.$route.name
    },
    pageTitle() {
      switch (this.routename) {
        case 'arena': {
          return '専用部屋'
        }
        case 'analytics': {
          return '戦績分析'
        }
        case 'chart': {
          return 'グラフ'
        }
        case 'arenaAnalyticsBeta': {
          return '専用部屋分析'
        }
        case 'mypage': {
          return 'マイページ'
        }
        case 'edit': {
          return 'プロフィール編集'
        }
        case 'signup': {
          return 'ユーザ登録'
        }
        case 'settings': {
          return '設定'
        }
        default: {
          return 'スマレポ'
        }
      }
    }
  },
  methods: {
    route() {
      console.log(this.$route.name)
    },
    back() {
      this.$router.go(-1)
    },
    toSettings () {
      this.$router.push("/settings")
    },
    toTop() {
      logEvent('viewTop', undefined)
      this.$router.push("/")
    },
    toArenaPages() {
      if (this.$route.path.match(/\/$/)) {
        logEvent('viewArena', undefined)
        this.$router.push("/arena")
      }
      if (this.$route.path.match(/\/analytics$/)) {
        logEvent('viewArenaAnalytics', undefined)
        this.$router.push("/arenaAnalyticsBeta")
      }
    },
    async getRecords() {
      await this.$store.dispatch('getRecords', this.user.userId)
      if (this.$route.path === '/') logEvent('getRecordsInTop', undefined)
      if (this.$route.path === '/arena' || this.$route.path === '/arena/') logEvent('getRecordsInArena', undefined)
      if (this.$route.path === '/analytics' || this.$route.path === '/analytics/') logEvent('getRecordsInAnalytics', undefined)
    },
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  width: 100%;
  background-color: #579aff;
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arena {
  background-color: #575dff;
}
.title {
  font-size: 24px;
  color: black;
  margin-left: 40px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #eaecf0;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
}
.back-btn {
  position: absolute;
  left: 5px;
}
.reload-btn {
  position: absolute;
  left: 8px;
}
.settings-btn {
  position: absolute;
  right: 8px;
  top: 10px;
}
</style>