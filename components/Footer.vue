<template>
  <div class="footer">
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">
            <div class="menu-item" @click="sendEventTop">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path v-if="routename === 'index'" d="M21.6667 16.6667V5L6.66669 23.3333H18.3334V35L33.3334 16.6667H21.6667Z" stroke="#579aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path v-else d="M21.6667 16.6667V5L6.66669 23.3333H18.3334V35L33.3334 16.6667H21.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title" :class="{ textBlue: routename === 'index' }">トップ</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/analytics">
            <div class="menu-item" @click="sendEventAnalytics">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path v-if="routename === 'analytics'" d="M26.6667 13.3333V26.6667V13.3333ZM20 18.3333V26.6667V18.3333ZM13.3334 23.3333V26.6667V23.3333ZM10 33.3333H30C31.841 33.3333 33.3334 31.841 33.3334 30V10C33.3334 8.15905 31.841 6.66667 30 6.66667H10C8.15907 6.66667 6.66669 8.15905 6.66669 10V30C6.66669 31.841 8.15907 33.3333 10 33.3333Z" stroke="#579aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path v-else d="M26.6667 13.3333V26.6667V13.3333ZM20 18.3333V26.6667V18.3333ZM13.3334 23.3333V26.6667V23.3333ZM10 33.3333H30C31.841 33.3333 33.3334 31.841 33.3334 30V10C33.3334 8.15905 31.841 6.66667 30 6.66667H10C8.15907 6.66667 6.66669 8.15905 6.66669 10V30C6.66669 31.841 8.15907 33.3333 10 33.3333Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title" :class="{ textBlue: routename === 'analytics' }">分析</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/chart">
            <div class="menu-item" @click="sendEventChart">
              <div class="menu-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path v-if="routename === 'chart'" d="M3.7547 19.0125C3.91877 19.125 4.55158 19.439 5.08595 18.764L8.7047 13.4766L12.5344 17.1703C12.736 17.3625 13.0125 17.4656 13.2938 17.4328C13.5703 17.4047 13.8235 17.2594 13.9875 17.0297L20.3391 7.92186L20.5688 10.9687C20.625 11.7422 21.3516 11.8687 21.5953 11.85C22.1203 11.8078 22.5188 11.3531 22.4766 10.8234L22.0735 5.46561C22.036 4.94061 21.5766 4.54218 21.0469 4.58436L15.6891 4.98749C15.1641 5.02499 14.7656 5.48436 14.8078 6.01405C14.8453 6.53905 15.3 6.9328 15.8344 6.8953L18.8813 6.66561L13.0594 15.0094L9.22033 11.3062C9.01877 11.1094 8.73752 11.0109 8.46095 11.0437C8.1797 11.0719 7.92658 11.2219 7.7672 11.4562L3.50627 17.6812C3.20627 18.1172 3.31877 18.7125 3.7547 19.0125V19.0125Z" fill="#579aff"/>
                  <path v-else d="M3.7547 19.0125C3.91877 19.125 4.55158 19.439 5.08595 18.764L8.7047 13.4766L12.5344 17.1703C12.736 17.3625 13.0125 17.4656 13.2938 17.4328C13.5703 17.4047 13.8235 17.2594 13.9875 17.0297L20.3391 7.92186L20.5688 10.9687C20.625 11.7422 21.3516 11.8687 21.5953 11.85C22.1203 11.8078 22.5188 11.3531 22.4766 10.8234L22.0735 5.46561C22.036 4.94061 21.5766 4.54218 21.0469 4.58436L15.6891 4.98749C15.1641 5.02499 14.7656 5.48436 14.8078 6.01405C14.8453 6.53905 15.3 6.9328 15.8344 6.8953L18.8813 6.66561L13.0594 15.0094L9.22033 11.3062C9.01877 11.1094 8.73752 11.0109 8.46095 11.0437C8.1797 11.0719 7.92658 11.2219 7.7672 11.4562L3.50627 17.6812C3.20627 18.1172 3.31877 18.7125 3.7547 19.0125V19.0125Z" fill="#4a5568d9"/>
                  <path v-if="routename === 'chart'" d="M22.5281 21.5719H2.42812V1.47187C2.42812 0.942187 2.00156 0.515625 1.47187 0.515625C0.942187 0.515625 0.515625 0.942187 0.515625 1.47187V22.5281C0.515625 23.0578 0.942187 23.4844 1.47187 23.4844H22.5281C23.0578 23.4844 23.4844 23.0578 23.4844 22.5281C23.4844 21.9984 23.0578 21.5719 22.5281 21.5719Z" fill="#579aff"/>
                  <path v-else d="M22.5281 21.5719H2.42812V1.47187C2.42812 0.942187 2.00156 0.515625 1.47187 0.515625C0.942187 0.515625 0.515625 0.942187 0.515625 1.47187V22.5281C0.515625 23.0578 0.942187 23.4844 1.47187 23.4844H22.5281C23.0578 23.4844 23.4844 23.0578 23.4844 22.5281C23.4844 21.9984 23.0578 21.5719 22.5281 21.5719Z" fill="#4a5568d9"/>
                </svg>
              </div>
              <span class="menu-title" :class="{ textBlue: routename === 'chart' }">グラフ</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <div class="menu-item">
            <div class="menu-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.05493C6.50005 3.55238 3 7.36745 3 12C3 16.9706 7.02944 21 12 21C16.6326 21 20.4476 17.5 20.9451 13H11V3.05493Z" stroke="#a8b1c289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.4878 8.99991H15V3.51221C17.5572 4.41604 19.5839 6.44276 20.4878 8.99991Z" stroke="#a8b1c289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="coming-soon">統計</span>
          </div>
        </li>
        <li v-if="user.userId">
          <nuxt-link :to="{ name: 'id', params: { id: user.userOriginalId, trailingSlash: false }}">
            <div class="menu-item" @click="sendEventMypage">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path v-if="routename === 'id'"  d="M26.6667 11.6667C26.6667 15.3486 23.6818 18.3333 20 18.3333C16.3181 18.3333 13.3333 15.3486 13.3333 11.6667C13.3333 7.98477 16.3181 5 20 5C23.6818 5 26.6667 7.98477 26.6667 11.6667Z" stroke="#579aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path v-else  d="M26.6667 11.6667C26.6667 15.3486 23.6818 18.3333 20 18.3333C16.3181 18.3333 13.3333 15.3486 13.3333 11.6667C13.3333 7.98477 16.3181 5 20 5C23.6818 5 26.6667 7.98477 26.6667 11.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path v-if="routename === 'id'"  d="M20 23.3333C13.5567 23.3333 8.33334 28.5567 8.33334 35H31.6667C31.6667 28.5567 26.4433 23.3333 20 23.3333Z" stroke="#579aff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path v-else  d="M20 23.3333C13.5567 23.3333 8.33334 28.5567 8.33334 35H31.6667C31.6667 28.5567 26.4433 23.3333 20 23.3333Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title" :class="{ textBlue: routename === 'id' }">マイページ</span>
            </div>
          </nuxt-link>
        </li>
        <li v-else>
          <div class="menu-item">
            <div class="menu-icon">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6667 11.6667C26.6667 15.3486 23.6818 18.3333 20 18.3333C16.3181 18.3333 13.3333 15.3486 13.3333 11.6667C13.3333 7.98477 16.3181 5 20 5C23.6818 5 26.6667 7.98477 26.6667 11.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 23.3333C13.5567 23.3333 8.33334 28.5567 8.33334 35H31.6667C31.6667 28.5567 26.4433 23.3333 20 23.3333Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="menu-title">マイページ</span>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { logEvent } from '@/utils/analytics.js'

export default {
  computed: {
    user() {
      return this.$store.state.user
    },
    routename() {
      return this.$route.name
    }
  },
  methods: {
    sendEventTop() {
      logEvent('viewTop', undefined)
    },
    sendEventArena() {
      logEvent('viewArena', undefined)
    },
    sendEventAnalytics() {
      logEvent('viewAnalytics', undefined)
    },
    sendEventChart() {
      logEvent('viewChart', undefined)
    },
    sendEventMypage() {
      logEvent('viewMypage', undefined)
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  height: 70px;
  width: 100%;
  padding: 0 30px;
  border-top: solid 1px #4a55683a;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    width: 450px;
  }
  ul {
    display: flex;
    justify-content: space-between;
  }
  li {
    // margin-left: 4rem;
    list-style-type: none;
  }
}
.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
}
.menu-icon {
  height: 30px;
  width: 30px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-title {
  font-size: 10px;
  font-weight: 600;
  color: #4a5568d9;
}
.textBlue {
  color: #579aff;
}
.coming-soon {
  font-size: 10px;
  color: #a8b1c2d9;
}
</style>