<template>
  <div class="container">
    <div class="goole-login">
      <button @click="login" type="button">
        googleでログイン
      </button>
    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('loginGoogle')
    }
  }
}
</script>
