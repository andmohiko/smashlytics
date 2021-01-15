<template>
  <div class="w-full text-gray-700">
    <p class="text-left pb-1 pl-1">ステージ</p>
    <form class="mb-2 px-2 flex flex-wrap justify-start items-center stage-selecter">
      <div class="option pb-1">
        <input
          id="stage-finalDestination"
          v-model="input"
          type="radio"
          name="finalDestination"
          :value="'finalDestination'"
        />
        <label for="stage-finalDestination" class="pr-2 whitespace-nowrap">終点( __ )</label>
      </div>
      <div class="option pb-1">
        <input
          id="stage-battleField"
          v-model="input"
          type="radio"
          name="battleField"
          :value="'battleField'"
        />
        <label for="stage-battleField" class="pr-2 whitespace-nowrap">戦場( -^- )</label>
      </div>
      <div class="option pb-1">
        <input
          id="stage-smallBattleField"
          v-model="input"
          type="radio"
          name="smallBattleField"
          :value="'smallBattleField'"
        />
        <label for="stage-smallBattleField" class="pr-2 whitespace-nowrap">小戦場( - - )</label>
      </div>
      <div v-if="isShowSmamateStages" class="option pb-1">
        <input
          id="stage-pokemonStadium2"
          v-model="input"
          type="radio"
          name="pokemonStadium2"
          :value="'pokemonStadium2'"
        />
        <label for="stage-empty" class="pr-2 whitespace-nowrap">ポケスタ2</label>
      </div>
      <div v-if="isShowSmamateStages" class="option pb-1">
        <input
          id="stage-townAndVillage"
          v-model="input"
          type="radio"
          name="townAndVillage"
          :value="'townAndVillage'"
        />
        <label for="stage-empty" class="pr-2 whitespace-nowrap">村と街</label>
      </div>
      <div v-if="isShowSmamateStages" class="option pb-1">
        <input
          id="stage-smashville"
          v-model="input"
          type="radio"
          name="smashville"
          :value="'smashville'"
        />
        <label for="stage-empty" class="pr-2 whitespace-nowrap">すま村</label>
      </div>
      <div v-if="isShowSmamateStages" class="option pb-1">
        <input
          id="stage-kalosPokemnLeague"
          v-model="input"
          type="radio"
          name="kalosPokemnLeague"
          :value="'kalosPokemnLeague'"
        />
        <label for="stage-empty" class="pr-2 whitespace-nowrap">カロス</label>
      </div>
      <div v-if="isShowSmamateStages" class="option pb-1">
        <input
          id="stage-lylatCruise"
          v-model="input"
          type="radio"
          name="lylatCruise"
          :value="'lylatCruise'"
        />
        <label for="stage-empty" class="pr-2">ライラット</label>
      </div>
      <div v-if="isShowOptionEmpty" class="option pb-1">
        <input
          id="stage-empty"
          v-model="input"
          type="radio"
          name="empty"
          :value="''"
        />
        <label for="stage-empty" class="pr-2">登録しない</label>
      </div>
    </form>
  </div>
</template>

<script>
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
    }
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
    get() {
      return this.input
    }
  }
}
</script>

<style lang="scss">
</style>