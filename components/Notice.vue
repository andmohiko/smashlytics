<template>
  <div class="notice-back">
    <div class="notice" @click="closeNotice">
      <div class="notice-inner">
        <div>
          <div v-if="notice.noticeType == 'error'" class="mr-2">
            <svg width="36" height="36" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14ZM10 5C9.44772 5 9 5.44772 9 6V10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10V6C11 5.44772 10.5523 5 10 5Z" fill="#c00e0e"/>
            </svg>
          </div>
          <div v-else-if="notice.noticeType == 'success'" class="mr-2">
            <svg width="36" height="36" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="#56d462"/>
            </svg>
          </div>
        </div>
        <div>
          <p class="notice-text text-lg text-gray-800 flex flex-col">
            <span v-for="row in message" :key="row.id" class="inline">{{ row }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  computed: {
    notice() {
      return this.$store.state.notice
    },
    message() {
      // return this.notice.message.split('\n')
      return [this.notice.message]
    }
  },
  methods: {
    closeNotice() {
      this.$store.dispatch('setNotice', { noticeType: null, message: '' })
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
  width: 95%;
  margin: 10px 0;
  left: calc(50% - 95% / 2);
  border-radius: 5px;
  position: absolute;
  background: #ffffff;
  z-index: z(Top);
  &-inner {
    display: flex;
    padding: 12px 16px 12px 10px;
    align-items: center;
    position: relative;
    z-index: z(Middle);
  }
  &-inner::after {
    content: 'close';
    font-family: 'Material Icons';
    color: black;
    position: absolute;
    right: 5px;
    top: 2px;
  }
}
</style>
