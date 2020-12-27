<template>
  <div class="icon" :style="sizeStyle" :class="{ hasBorder: isSelected }">
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
    size: {
      default: '100%',
      type: String
    },
    isSelected: {
      defalut: false,
      type: Boolean
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
      const fighterEnName = this.$store.state.fighters[this.fighterId].name_en
      return '/images/fighters/' + this.fighterId + '_' + fighterEnName + '.png'
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  margin: 0 auto;
}
.hasBorder {
  border: solid 2px #8282fa;
  border-radius: 20%;
}
</style>
