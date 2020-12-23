<template>
  <div class="footer">
    <nav>
      <ul>
        <li><nuxt-link to="/records">records</nuxt-link></li>
        <li>timeline</li>
        <li><nuxt-link to="/mypage">mypage</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped lang="scss">
.footer {
  height: 100px;
  width: 100%;
  background-color: rgba(200, 200, 20, 0.5);
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
</style>