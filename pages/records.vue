<template>
  <div class="container">
    <div class="title">
      <h2>戦績一覧</h2>
      <div class="get">
        <button @click="getRecords" type="button">更新</button>
      </div>
    </div>
    <Records :records="records" />
  </div>
</template>

<script>
import Records from '@/components/Records.vue'

export default {
  components: {
    Records
  },
  data() {
    return {
      error: '',
      userId: 'andmohiko',
      records: []
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getRecords', 'andmohiko')
  },
  mounted() {
    this.records = this.$store.state.records
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch('getRecords', this.userId)
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
.title {
  margin: 40px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
</style>