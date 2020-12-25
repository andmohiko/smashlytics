<template>
  <div>
    <div class="flex flex-col mb-4">
      <label
        v-show="isLabelShow"
        class="text-gray-700 text-left"
        >{{ label }}
      </label>
      <input
        v-model="input"
        :placeholder="placeholder"
        class="border py-2 px-3 text-grey-darkest"
        type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    placeholder: {
      required: true,
      type: String
    },
    isLabelShow: {
      default: true,
      type: Boolean
    },
    allowEmpty: {
      default: true,
      type: Boolean
    },
    maxLength: {
      required: false,
      type: Number
    },
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    isOverLength() {
      return !!(this.maxLength && input.length > this.maxLength)
    },
    isValid() {
      if (!this.allowEmpty && input === '') return false
      if (this.isOverLength) return false
      return true
    }
  },
  methods: {
    get() {
      if (!this.valid) return
      if (this.input === '') return null
      return this.input
    }
  }
}
</script>

<style scoped lang="scss">
</style>