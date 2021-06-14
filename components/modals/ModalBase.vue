<template>
  <div class="modal-bg">
    <div class="modal bg-white shadow-md rounded px-4 pt-4 pb-3 mb-4 flex flex-col overflow-auto">
      <div class="close" @click="onClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-bg {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(21, 28, 56, 0.568);
  z-index: 20;
}
.modal {
  position: relative;
  max-height: 90%;
  width: 100vw;
  z-index: 30;
}
@media screen and (min-width: 400px) {
  .modal {
    max-width: 400px;
  }
}
.close {
  position: absolute;
  z-index: 1000;
  margin: 4px 4px 0 0;
  right: 0;
  top: 0;
}
</style>
