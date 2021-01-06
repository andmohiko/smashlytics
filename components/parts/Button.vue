<template>
  <button
    :class="[{ disable: isDisable }, buttonType]"
    :style="[widthStyle]"
    :disabled="isDisable"
    class="uppercase px-8 py-2 rounded-full max-w-max shadow-sm hover:shadow-md button"
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
  border-radius: 50px;
  border: solid 1px #69a5ff;
  color: #69a5ff;
  padding: 15px 0;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  width: 240px;

  &.high {
    // background: $primary-dark;
    // color: $text-white;
    border: none;
  }

  &.low {
    // background: $bg-gray;
    // color: $text-purple;
    border: none;
  }

  &.disable {
    // background: $disable-button;
    // color: $text-white;
    border: none;
  }
}
</style>
