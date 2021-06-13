<template>
  <div class="container">
    <div class="header">
      <p class="title">{{ label }}</p>
      <button v-show="isShowAllOption" @click="showAllFighters" class="option">全ファイターから選ぶ</button>
    </div>
    <div class="fighter-selecter">
      <div v-for="fighterId in fighterIds" :key="fighterId.id" class="fighter-icon">
        <button @click="select(fighterId)">
          <FighterIcon :fighterId="fighterId" :isSelected="isSelected(fighterId)" :size="iconSize" />
          <span v-show="isShowName" class="text-xs">{{ fighters[fighterId].nickname }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FighterIcon from '@/components/parts/FighterIcon.vue'
import fighters from '@/assets/fighters.json'

export default {
  props: {
    iconSize: {
      default: '32px',
      type: String
    },
    usedFighterIds: {
      default: null,
      type: Array
    },
    label: {
      required: false,
      type: String
    },
    isShowAllOption: {
      required: false,
      type: Boolean
    },
    previouslySelected: {
      required: false,
      type: String
    },
    isShowName: {
      default: false,
      type: Boolean
    }
  },
  components: {
    FighterIcon
  },
  data() {
    return {
      fighterId: null,
      isShowAllFighters: false,
      fighters
    }
  },
  mounted() {
    this.fighterId = this.previouslySelected
  },
  computed: {
    fighterIds() {
      if (!this.usedFighterIds || this.isShowAllFighters) return Object.keys(this.fighters).sort()
      return this.usedFighterIds
    }
  },
  methods: {
    select(fighterId) {
      this.fighterId = fighterId
      this.$emit('select')
    },
    get() {
      return this.fighterId
    },
    showAllFighters() {
      this.isShowAllFighters = !this.isShowAllFighters
    },
    isSelected(fighterId) {
      return this.fighterId === fighterId
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 4px 0 12px 0;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.title {
  font-size: 20px;
}
.option {
  font-size: 14px;
}
.fighter-selecter {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.fighter-icon {
  margin: 2px;
}
</style>