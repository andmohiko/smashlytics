<template>
  <div class="w-full pb-4 text-gray-700">
    <p class="text-left text-lg pb-2">ステージ</p>
    <div class="flex flex-wrap">
      <RadioButton v-if="isShowOptionAll" v-model="stage" label="全部" value="all" />
      <RadioButton v-model="stage" label="終点" value="finalDestination" />
      <RadioButton v-model="stage" label="戦場" value="battleField" />
      <RadioButton v-model="stage" label="小戦場" value="smallBattleField" />
      <RadioButton v-if="isShowSmamateStages" v-model="stage" label="ポケスタ2" value="pokemonStadium2" />
      <RadioButton v-if="isShowSmamateStages" v-model="stage" label="村と街" value="townAndVillage" />
      <RadioButton v-if="isShowSmamateStages" v-model="stage" label="すま村" value="smashville" />
      <RadioButton v-if="isShowSmamateStages" v-model="stage" label="カロス" value="kalosPokemonLeague" />
      <RadioButton v-if="isShowSmamateStages" v-model="stage" label="ライラット" value="lylatCruise" />
      <RadioButton v-if="isShowOptionEmpty" v-model="stage" label="登録しない" value="" />
    </div>
  </div>
</template>

<script>
import RadioButton from '@/components/input/RadioButton.vue'

export default {
  props: {
    previousSelect: {
      default: '',
      type: String
    },
    isShowOptionEmpty: {
      default: true,
      type: Boolean
    },
    isShowSmamateStages: {
      default: false,
      type: Boolean
    },
    isShowOptionAll: {
      default: false,
      type: Boolean
    }
  },
  components: {
    RadioButton
  },
  data() {
    return {
      stage: ''
    }
  },
  mounted() {
    this.stage = this.previousSelect
  },
  methods: {
    get() {
      return this.stage
    }
  }
}
</script>

<style scoped lang="scss">
</style>