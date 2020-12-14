<template>
  <div class="footer">
    <nav>
      <ul>
        <li>record</li>
        <li>timeline</li>
        <li>mypage</li>
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
  background-color: blue;
  // background-color: rgba(255, 255, 80, 0.9);
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