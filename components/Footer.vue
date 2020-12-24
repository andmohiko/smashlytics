<template>
  <div class="footer">
    <div class="border"></div>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">
            <div class="menu-item">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.6667 16.6667V5L6.66669 23.3333H18.3334V35L33.3334 16.6667H21.6667Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title">ホーム</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/records">
            <div class="menu-item">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 18H20M4 6H20H4ZM4 10H20H4ZM4 14H20H4Z" stroke="#4a5568d9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title">一覧</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/analytics">
            <div class="menu-item">
              <div class="menu-icon">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.6667 13.3333V26.6667V13.3333ZM20 18.3333V26.6667V18.3333ZM13.3334 23.3333V26.6667V23.3333ZM10 33.3333H30C31.841 33.3333 33.3334 31.841 33.3334 30V10C33.3334 8.15905 31.841 6.66667 30 6.66667H10C8.15907 6.66667 6.66669 8.15905 6.66669 10V30C6.66669 31.841 8.15907 33.3333 10 33.3333Z" stroke="#4a5568d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="menu-title">分析</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/mypage">
            <div class="menu-item">
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
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.footer {
  height: 70px;
  width: 100%;
  border-top: solid 1px #4a55683a;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    width: 500px;
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
  margin-bottom: 4px;
}
.menu-title {
  font-size: 10px;
  font-weight: 600;
  color: #4a5568d9;
}
</style>