<template>
  <div class="records-table">
    <ul class="records-list">
      <li
        v-for="record in records"
        :key="record.id"
      >
        {{ timestamp2dateString(record.createdAt) }}, {{ record.fighter }}, {{ record.opponent }}, {{ record.result }}
      </li>
    </ul>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    timestamp2dateString (timestamp) {
      const date = timestamp.toDate()
      return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
}
li {
  list-style-type: none;
}
</style>