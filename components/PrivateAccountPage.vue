<template>
  <div class="container">
    <div class="bg-white shadow-md rounded px-8 pt-8 pb-6 mb-4 flex flex-col w-full text-left">
      <ProfileIcon :profileImgPath="user.profileImg" />
      <div class="name pb-4">
        <p class="userId text-base pt-2 text-gray-700">非公開</p>
        <p class="username text-3xl text-gray-800">{{ user.username }}</p>
        <p class="userId text-xl text-gray-700">{{ user.userOriginalId }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileIcon from '@/components/parts/ProfileIcon.vue'

export default {
  components: {
    ProfileIcon
  },
  props: {
    user: {
      required: true,
      type: Object
    }
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
    }
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
  flex-direction: column;
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