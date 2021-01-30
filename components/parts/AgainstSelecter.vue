<template>
  <div class="w-full text-gray-700">
    <p class="text-left text-lg pb-1">対戦相手</p>
    <div class="mb-2">
      <button @click="selectPrevious" class="text-gray-700 text-base">
        直前の人を選ぶ:
        <span class="text-blue-700">{{ fightedPlayers[0] }}</span>
      </button>
    </div>
    <span class="text-gray-700 text-base">過去に対戦した人から選ぶ</span>
    <form class="mb-2 px-2 flex flex-wrap justify-start items-center stage-selecter border h-10">
      <select v-model="input" class="form-select block w-full mt-1">
        <option :value="''"></option>
        <option v-for="player in fightedPlayers" :key="player.id">
          {{ player }}
        </option>
      </select>
    </form>
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
    this.input = this.previousSelect
  },
  methods: {
    selectPrevious() {
      this.input = this.fightedPlayers[0]
    },
    get() {
      return this.input
    }
  }
}
</script>

<style lang="scss">
</style>