<template>
  <button
    :class="[{ disable: isDisable }, buttonType]"
    :style="[widthStyle]"
    :disabled="isDisable"
    class="button uppercase px-8 py-2 max-w-max shadow hover:shadow-md"
    @click="$emit('onClick')"
  >
    {{ label }}
  </button>
</template>

<script>
const ButtonTypeList = ['', 'low', 'high']
export default {
  props: {
    label: {
      type: String,
      default: 'ボタン',
      required: true
    },
    width: {
      default: '240px',
      type: String
    },
    buttonType: {
      default: '',
      type: String,
      validator(value) {
        return ButtonTypeList.includes(value)
      }
    },
    isDisable: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      widthStyle: {
        width: this.width
        // :style="[widthStyle]" html内に
      }
    }
  }
}
</script>

<style lang="scss">
.button {
  margin: 0 auto;
  display: block;
  border-radius: 100px;
  border: solid 1px #69a5ff;
  color: #69a5ff;
  padding: 15px 0;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  width: 240px;

  &.high {
    background: #69a5ff;
    color: #ffffff;
    border: none;
  }

  &.low {
    color: #a0c4f9;
    border: solid 1px #a0c4f9;
  }

  &.disable {
    color: #98a0ac;
    border: solid 1px #98a0ac;
  }
}
</style>
