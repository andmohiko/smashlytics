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
// import { firebase } from '@/plugins/firebase'
// import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
      newUser: {
        userId: '',
        username: '',
        twitterId: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('loginGoogle')
    }
  }
}
</script>
