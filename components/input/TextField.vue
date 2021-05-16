<template>
  <div class="flex flex-col mb-4 items-start">
    <label
      v-show="isLabelShow"
      class="text-gray-700 text-left"
      >{{ label }}
    </label>
    <div
      class="pt-2 flex items-center"
      :style="[widthStyle]"
    >
      <span v-if="prefix" class="text-lg text-gray-700 pr-1">{{ prefix }}</span>
      <input
        v-model="input"
        :placeholder="placeholder"
        class="border py-2 px-3 text-grey-darkest w-full rounded-lg"
        type="text"
      >
      <span v-if="suffix" class="text-lg text-gray-700 pl-1">{{ suffix }}</span>
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
    defaultValue: {
      default: '',
      type: String
    },
    width: {
      default: '100%',
      type: String
    },
    prefix: {
      required: false,
      type: String
    },
    suffix: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      input: this.defaultValue,
      widthStyle: {
        width: this.width
      }
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
      return this.input
    }
  }
}
</script>

<style scoped lang="scss">
</style>