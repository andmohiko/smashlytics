<template>
  <div class="w-full pb-2 text-gray-700">
    <p class="text-lg text-left pb-1">ストック数</p>
    <div>
      <p class="text-base text-left pb-2">試合のルール</p>
      <div class="flex">
        <RadioButton v-model="stocks.rule" label="2スト" :value="2" />
        <RadioButton v-model="stocks.rule" label="3スト" :value="3" />
        <RadioButton v-if="isShowOptionEmpty" v-model="stocks.rule" label="登録しない" :value="null" />
      </div>
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
import RadioButton from '@/components/input/RadioButton.vue'

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
  components: {
    RadioButton
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

<style scoped lang="scss">
</style>