<template>
  <div class="header">
    <p class="title">すましす</p>
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
.header {
  height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 80, 0.9);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 24px;
    color: black;
  }
}
</style>