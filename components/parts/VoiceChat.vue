<template>
  <div class="voice-chat">
    <ul class="flex items-center pt-2">
      <li v-if="voiceChat.discord" class="pr-2"><img src="images/logo/discord.png"></li>
      <li v-if="voiceChat.nintendoSwitchOnline" class="pr-2"><img src="images/logo/nintendoSwitchOnline.jpg"></li>
      <li v-if="voiceChat.line" class="pr-2"><img src="images/logo/line.png"></li>
      <li v-if="voiceChat.skype" class="pr-2"><img src="images/logo/skype.png"></li>
      <li v-if="voiceChat.listenOnly" class="pr-2"><label class="text-xl text-gray-800 pt-4">聞き専</label></li>
      <li v-if="voiceChat.ng"><label class="text-sm text-gray-800 pt-4">NG</label></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    voiceChat: {
      required: true,
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss">
.voice-chat {
  img {
    height: 32px;
    width: 32px;
  }
}
</style>
