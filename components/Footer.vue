<template>
  <div class="footer">
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">
            <div class="menu-item" @click="sendEventTop">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.6667 16.6667V5L6.66669 23.3333H18.3334V35L33.3334 16.6667H21.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title">トップ</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/arena">
            <div class="menu-item" @click="sendEventArena">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.5312 8.67093C29.272 8.67093 29.0625 8.88093 29.0625 9.13968V9.77436L15.4688 2.75858V1.63968C15.4688 1.38093 15.2592 1.17093 15 1.17093C14.7408 1.17093 14.5312 1.38093 14.5312 1.63968V2.75858L0.9375 9.77483V9.14015C0.9375 8.8814 0.727969 8.6714 0.46875 8.6714C0.209531 8.6714 0 8.8814 0 9.14015V20.8603C0 20.8833 0.00984375 20.903 0.013125 20.9255C0.0178125 20.9587 0.0210938 20.9911 0.0328125 21.0225C0.0426563 21.0506 0.0590625 21.0736 0.0740625 21.0984C0.09 21.1256 0.104062 21.1514 0.125156 21.1748C0.146719 21.1983 0.172969 21.2147 0.198281 21.233C0.2175 21.247 0.231094 21.2658 0.253125 21.2775L14.7844 28.7775C14.7895 28.7803 14.7952 28.7789 14.8008 28.7817C14.858 28.8089 14.9208 28.8253 14.9883 28.8272C14.992 28.8272 14.9958 28.83 14.9991 28.83C15.0023 28.83 15.0066 28.8272 15.0098 28.8272C15.0778 28.8253 15.1402 28.8089 15.1973 28.7817C15.203 28.7789 15.2086 28.7803 15.2138 28.7775L29.745 21.2775C29.7652 21.2672 29.7783 21.2489 29.7961 21.2362C29.8237 21.2165 29.8509 21.1992 29.8734 21.1744C29.8936 21.1519 29.9072 21.1265 29.9222 21.1012C29.9381 21.075 29.955 21.0515 29.9658 21.022C29.977 20.9915 29.9803 20.9592 29.985 20.9269C29.9902 20.9039 30 20.8837 30 20.8603V9.13968C30 8.88093 29.7905 8.67093 29.5312 8.67093ZM15 8.26171L23.9648 12.8892L15.4688 17.2734V16.6397C15.4688 16.3805 15.2592 16.1709 15 16.1709C14.7408 16.1709 14.5312 16.3805 14.5312 16.6397V17.2734L6.03516 12.8887L15 8.26171ZM15.4688 18.3281L24.9872 13.4166L26.2369 14.0616L15.4688 19.619V18.3281ZM14.5312 18.3281V19.619L3.76312 14.0616L5.01281 13.4166L14.5312 18.3281ZM14.5312 20.6737V21.9647L1.49109 15.2344L2.74125 14.5894L14.5312 20.6737ZM15.4688 20.6737L27.2588 14.5889L28.5089 15.2339L15.4688 21.9647V20.6737ZM28.2811 14.0616L29.0625 13.6584V14.4651L28.2811 14.0616ZM27.2588 13.5342L26.0091 12.8892L27.2597 12.2442L28.5089 12.8892L27.2588 13.5342ZM24.9877 12.3614L15.4688 7.44843V6.15843L26.2373 11.7164L24.9877 12.3614ZM14.5312 7.44843L5.01234 12.3614L3.76266 11.7164L14.5312 6.15843V7.44843ZM3.99094 12.8892L2.74125 13.5342L1.49109 12.8892L2.74031 12.2442L3.99094 12.8892ZM1.71891 14.0616L0.9375 14.4647V13.658L1.71891 14.0616ZM0.9375 16.004L14.5312 23.0203V27.5911L0.9375 20.5748V16.004ZM15.4688 23.0198L29.0625 16.0036V20.5744L15.4688 27.5906V23.0198ZM29.0625 12.1191L28.282 11.7164L29.0625 11.3137V12.1191ZM28.5089 10.5441L27.2597 11.1886L15.4688 5.10327V3.81374L28.5089 10.5441ZM14.5312 3.81374V5.10327L2.74031 11.1891L1.49109 10.5445L14.5312 3.81374ZM1.71797 11.7164L0.9375 12.1191V11.3133L1.71797 11.7164Z" fill="#4a5568d9"/>
                </svg>
              </div>
              <span class="menu-title">専用部屋</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/analytics">
            <div class="menu-item" @click="sendEventAnalytics">
              <div class="menu-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.7547 19.0125C3.91877 19.125 4.55158 19.439 5.08595 18.764L8.7047 13.4766L12.5344 17.1703C12.736 17.3625 13.0125 17.4656 13.2938 17.4328C13.5703 17.4047 13.8235 17.2594 13.9875 17.0297L20.3391 7.92186L20.5688 10.9687C20.625 11.7422 21.3516 11.8687 21.5953 11.85C22.1203 11.8078 22.5188 11.3531 22.4766 10.8234L22.0735 5.46561C22.036 4.94061 21.5766 4.54218 21.0469 4.58436L15.6891 4.98749C15.1641 5.02499 14.7656 5.48436 14.8078 6.01405C14.8453 6.53905 15.3 6.9328 15.8344 6.8953L18.8813 6.66561L13.0594 15.0094L9.22033 11.3062C9.01877 11.1094 8.73752 11.0109 8.46095 11.0437C8.1797 11.0719 7.92658 11.2219 7.7672 11.4562L3.50627 17.6812C3.20627 18.1172 3.31877 18.7125 3.7547 19.0125V19.0125Z" fill="#4a5568d9"/>
                  <path d="M22.5281 21.5719H2.42812V1.47187C2.42812 0.942187 2.00156 0.515625 1.47187 0.515625C0.942187 0.515625 0.515625 0.942187 0.515625 1.47187V22.5281C0.515625 23.0578 0.942187 23.4844 1.47187 23.4844H22.5281C23.0578 23.4844 23.4844 23.0578 23.4844 22.5281C23.4844 21.9984 23.0578 21.5719 22.5281 21.5719Z" fill="#4a5568d9"/>
                </svg>
              </div>
              <span class="menu-title">分析</span>
            </div>
          </nuxt-link>
        </li>
        <li v-if="user.userId">
          <nuxt-link :to="{ name: 'id', params: { id: user.userOriginalId, trailingSlash: false }}">
            <div class="menu-item" @click="sendEventMypage">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.6667 11.6667C26.6667 15.3486 23.6818 18.3333 20 18.3333C16.3181 18.3333 13.3333 15.3486 13.3333 11.6667C13.3333 7.98477 16.3181 5 20 5C23.6818 5 26.6667 7.98477 26.6667 11.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 23.3333C13.5567 23.3333 8.33334 28.5567 8.33334 35H31.6667C31.6667 28.5567 26.4433 23.3333 20 23.3333Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title">マイページ</span>
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
.coming-soon {
  font-size: 10px;
  color: #a8b1c2d9;
}
</style>