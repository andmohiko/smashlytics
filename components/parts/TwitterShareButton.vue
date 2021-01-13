<template>
  <!-- <button
    @click="shareOnTwitter"
    class="inline-block my-2 px-4 py-2 text-center text-white font-bold transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none flex justify-center items-center w-32"
  >
    <svg class="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
    <label class="pl-3 text-white">ツイート</label> -->
    <div class="twitter-share mt-2 mb-10 flex flex-col justify-center items-center text-center">
      <label class="pb-2 text-gray-700">◎プロフィールをシェアする</label>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        class="twitter-share-button"
        :data-url="originalReferer"
        :data-text="twitterShareText"
        data-show-count="false"
      >ツイート</a>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
  <!-- </button> -->
</template>

<script>
import { logEvent } from '@/utils/analytics.js'

const makeShareText = (userId) => `スマレポでプロフィールを作ったよ！

https://smarepo.me/${userId}

#スマブラSP #スマブラSP自己紹介カード  #スマブラ好きと繋がりたい
`

export default {
  data() {
    return {
      originalReferer: 'https://smarepo.me/'
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    twitterShareText() {
      return makeShareText(this.user.userOriginalId)
    }
  },
  methods: {
    shareOnTwitter() {
      console.log('ついったしぇあ')
      console.log(this.twitterShareText)
      // logEvent('shareOnTwitter', undefined)
    }
  }
}
</script>