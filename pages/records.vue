<template>
  <div class="container">
    <!-- <div class="get">
      <button @click="getRecords" type="button">更新</button>
    </div> -->
    <div class="records">
      <Records :records="records" />
    </div>
  </div>
</template>

<script>
import Records from '@/components/Records.vue'

export default {
  components: {
    Records
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records
    }
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch('getRecords', this.user.userId)
      this.records = this.$store.state.records
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.records {
  margin: 10px 0;
}
.title {
  margin: 40px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
</style>