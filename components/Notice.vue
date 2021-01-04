<template>
  <div class="notice-back">
    <!-- <div class="notice" @click="closeNotice"> -->
    <div class="notice">
      <div class="notice-inner">
        <div>
          <p v-if="notice.noticeType == 'error'" class="error-icon">!</p>
          <div v-else-if="notice.noticeType == 'success'" class="success-icon">
            <div class="success-vector"></div>
          </div>
        </div>
        <div>
          <p class="notice-text">{{ notice.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    notice() {
      return this.$store.state.notice
    }
  },
  methods: {
    closeNotice() {
      this.$store.dispatch('setNotice', { noticeType: null, message: ''})
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.notice-back {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(21, 28, 56, 0.568);
  z-index: z(UpperMiddle);
}
.notice {
  top: 70px;
  width: 90%;
  margin: 10px 0;
  left: calc(50% - 90% / 2);
  border-radius: 5px;
  position: absolute;
  background: #ffffff;
  z-index: z(Top);
  &-inner {
    display: flex;
    padding: 15px;
    align-items: center;
    position: relative;
    z-index: z(Middle);
  }
  &-inner::after {
    content: 'close';
    font-family: 'Material Icons';
    color: black;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  &-text {
    font-size: 16px;
    color: black;
    &-thumb {
      margin-top: 2px;
    }
  }
}
.error-icon {
  background-color: #c00e0e;
  padding: 8px 15px;
  text-align: center;
  border-radius: 50px;
  color: white;
  margin-right: 13px;
  margin-top: 3px;
}
.success {
  &-icon {
    background: #56d462;
    width: 27px;
    height: 27px;
    text-align: center;
    border-radius: 50px;
    color: white;
    margin-right: 13px;
    position: relative;
  }
  &-vector {
    position: absolute;
    display: block;
    width: 8px;
    height: 17px;
    top: 43%;
    right: 37%;
    border: solid 2px white;
    border-left: 0;
    border-top: 0;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
