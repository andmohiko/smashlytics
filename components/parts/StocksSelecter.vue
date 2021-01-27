<template>
  <div class="w-full text-gray-700">
    <p class="text-base text-left pb-1 pl-1">ストック数</p>
    <!-- <div class="flex flex-col justify-center items-center"> -->
    <div>
      <p class="text-sm text-left pb-1 pl-1">試合のルール</p>
      <form class="mb-2 px-2 flex flex-wrap justify-start items-center">
        <div class="option pb-1">
          <input
            id="stocks-2"
            v-model="stocks.rule"
            type="radio"
            name="2"
            :value="'2'"
          />
          <label for="stocks-2" class="pr-2 whitespace-nowrap">2スト</label>
        </div>
        <div class="option pb-1">
          <input
            id="stocks-3"
            v-model="stocks.rule"
            type="radio"
            name="3"
            :value="'3'"
          />
          <label for="stocks-3" class="pr-2 whitespace-nowrap">3スト</label>
        </div>
        <!-- <div class="option pb-1">
          <input
            id="stocks-other"
            v-model="stocks.rule"
            type="radio"
            name="other"
            :value="null"
          />
          <label for="stocks-other" class="pr-2 whitespace-nowrap">その他</label>
        </div> -->
        <!-- textbox -->
        <div v-if="isShowOptionEmpty" class="option pb-1">
          <input
            id="stocks-empty"
            v-model="stocks.rule"
            type="radio"
            name="null"
            :value="null"
          />
          <label for="stocks-null" class="pr-2">登録しない</label>
        </div>
      </form>
    </div>
    <!-- <div class="custom-number-input">
      <label for="custom-input-number" class="text-gray-700 text-sm">試合結果</label>
      <Checkbox ref="" label="撃墜した数も記録する" />
      <span class="text-gray-600 text-xs px-1 pb-3 flex items-center">どれくらい優勢/劣勢だったかも分析できるようになるよ！</span>
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 items-center text-center ">
        <button @click="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-8 w-8 rounded-l cursor-pointer outline-none">
          <span class="m-auto text-2xl font-thin">−</span>
        </button>
        <label class="text-gray-700">{{ stocksTaken }}</label>
        <button @click="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
          <span class="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    defaultValue: {
      required: false,
      type: Object
    },
    isShowOptionEmpty: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      stocks: {
        rule: null,
        player: null,
        opponent: null
      }
    }
  },
  mounted() {
    if (!this.defaultValue) return
    this.stocks = this.defaultValue
  },
  methods: {
    get() {
      return {
        stocks: this.stocks
      }
    },
    increment() {
      this.stocks.player += 1
    },
    decrement() {
      if (this.stocks.player <= 0) return
      this.stocks.player -= 1
    }

  }
}
</script>

<style lang="scss">
</style>