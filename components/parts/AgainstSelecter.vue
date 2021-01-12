<template>
  <div class="w-full text-gray-700">
    <p class="text-left pb-1 pl-1">対戦相手</p>
    <span class="text-gray-700 text-sm">過去に対戦した人から選ぶ</span>
    <form class="mb-2 px-2 flex flex-wrap justify-start items-center stage-selecter border h-10">
      <select v-model="input" class="form-select block w-full mt-1">
        <option v-for="player in fightedPlayers" :key="player.id">
          {{ player }}
        </option>
      </select>
    </form>
    <span class="text-gray-700 text-sm">名前を入力する</span>
    <TextField ref="input" label="対戦相手" :isLabelShow="false" placeholder="はじめて対戦した人なら入力してね" />
  </div>
</template>

<script>
import Button from '@/components/parts/Button.vue'
import TextField from '@/components/input/TextField.vue'

export default {
  props: {
    fightedPlayers: {
      default: [],
      type: Array
    },
    previousSelect: {
      default: '',
      type: String
    }
  },
  components: {
    Button,
    TextField,
  },
  data() {
    return {
      input: ''
    }
  },
  mounted() {
    this.fightedPlayers.unshift('')
    this.input = this.previousSelect
  },
  computed: {

  },
  methods: {
    get() {
      return this.input
    }
  }
}
</script>

<style lang="scss">
</style>