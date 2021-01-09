<template>
  <div class="icon" :style="sizeStyle" :class="{ hasBorder: isSelected }">
    <img :src="fighterIconPath" />
  </div>
</template>

<script>
import fighters from '@/assets/fighters.json'

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
      },
      fighters
    }
  },
  computed: {
    fighterIconPath() {
      return '/images/fighters/' + this.fighters[this.fighterId].icon
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
