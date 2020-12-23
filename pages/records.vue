<template>
  <div class="container">
    <!-- <div class="get">
      <button @click="getRecords" type="button">更新</button>
    </div> -->
    <Records :records="records" :fighters="fighters" />
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
      records: [],
      fighters: {}
    }
  },
  mounted() {
    this.records = this.$store.state.records
    this.fighters = this.$store.state.fighters
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