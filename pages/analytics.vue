<template>
  <div class="container">
    <div class="block">
      <p class="title">analytics.</p>
      <p>coming soon!</p>
    </div>
    <div class="block">
      <p class="title">updating features</p>
      <p>results by character</p>
      <p>WoW, MoM</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.block {
  margin: 20px 0;
  .title {
    font-size: 20px;
  }
}
</style>
