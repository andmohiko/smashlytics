<template>
  <div class="profile-icon">
    <img v-if="profileImgPath" :src="profileImgPath">
    <img v-else src="images/default-icon.png">
  </div>
</template>

<script>
export default {
  props: {
    profileImgPath: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.profile-icon {
  display: flex;
  margin-bottom: 12px;
  img {
    height: 120px;
    width: 120px;
    border: solid 4px #579aff;
    border-radius: 50%;
  }
}
</style>
