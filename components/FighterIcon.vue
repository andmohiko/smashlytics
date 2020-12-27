<template>
  <div class="icon" :style="sizeStyle">
    <img :src="fighterIconPath" />
  </div>
</template>

<script>

export default {
  props: {
    fighterId: {
      required: true,
      type: String
    },
    fighters: {
      required: true,
      type: Object
    },
    size: {
      default: '100%',
      type: String
    }
  },
  data() {
    return {
      sizeStyle: {
        height: this.size,
        width: this.size
      }
    }
  },
  computed: {
    fighterIconPath() {
      const fighterId = this.record
      // エラー用画像を用意する
      if (!this.fighters[this.fighterId].name_en) return '/images/fighters/01_Mario.png'
      const fighterEnName = this.fighters[this.fighterId]['name_en']
      return '/images/fighters/' + this.fighterId + '_' + fighterEnName + '.png'
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  margin: 0 auto;
}
</style>
