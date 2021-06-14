<template>
  <div class="my-1 flex justify-center">
    <div v-if="result" class="isWin w-full">
      <button
        @click="isWin"
        class="inline-block w-4/12 h-16 mx-3 px-6 py-2 shadow-lg text-xl font-medium leading-6 text-center text-white uppercase transition bg-red-400 border border-red-400 rounded-full ripple hover:bg-red-500 hover:border-red-500 hover:shadow-lg focus:outline-none"
      >
        勝ち
      </button>
      <button
        @click="isLose"
        class="inline-block w-4/12 h-16 mx-3 px-6 py-2 shadow-md text-lg font-medium leading-6 text-center text-blue-500 uppercase transition bg-white border border-blue-400 rounded-full ripple hover:bg-blue-100 hover:shadow-lg focus:outline-none"
      >
        負け
      </button>
    </div>
    <div v-else class="isLose w-full">
      <button
        @click="isWin"
        class="inline-block w-4/12 h-16 mx-3 px-6 py-2 shadow-md text-lg font-medium leading-6 text-center text-red-500 uppercase transition bg-white border border-red-400 rounded-full ripple hover:bg-red-100 hover:shadow-lg focus:outline-none"
      >
        勝ち
      </button>
      <button
        @click="isLose"
        class="inline-block w-4/12 h-16 mx-3 px-6 py-2 shadow-lg text-xl font-medium leading-6 text-center text-white uppercase transition bg-blue-400 border border-blue-400 rounded-full ripple hover:bg-blue-500 hover:border-blue-500 hover:shadow-lg focus:outline-none"
      >
        負け
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previousResult: {
      default: true,
      type: Boolean
    },
  },
  data() {
    return {
      result: this.previousResult
    }
  },
  methods: {
    isWin() {
      this.result = true
      this.$emit('clickWin')
    },
    isLose() {
      this.result = false
      this.$emit('clickLose')
    }
  }
}
</script>

<style lang="scss" scoped>
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
