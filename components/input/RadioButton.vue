<template>
  <div
    class="radio-button shadow-md hover:bg-blue-100 hover:shadow-lg focus:outline-none"
    :class="{ radio : isSelected }"
    @click="update"
  >
    <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'onUpdate'
  },
  props: {
    label: {
      required: true,
      type: String
    },
    value: {
      required: true
    },
    model: {
      required: true
    },
  },
  computed: {
    isSelected() {
      return this.model === this.value
    }
  },
  methods: {
    update() {
      this.$emit('onUpdate', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.radio-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 72px;
  margin: 0 12px 12px 0;
  padding: 6px;
  border: solid 1px #8282fa;
  border-radius: 6px;
  color: #8282fa;
}
.radio {
  background-color: #8282fa;
  color: #ffffff;
}
</style>
