<template>
  <div class="container">
    <div class="title">
      <h2>fighters</h2>
    </div>
    <div class="form">
      <div class="input">
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <label class="block">
            <span class="text-gray-700">english</span>
            <input v-model="fighter.english" class="form-input mt-1 block w-full p-2 border" placeholder="Jane Doe">
          </label>
          <label class="block">
            <span class="text-gray-700">japanese</span>
            <input v-model="fighter.japanese" class="form-input mt-1 block w-full p-2 border" placeholder="Jane Doe">
          </label>
          <label class="block">
            <span class="text-gray-700">number</span>
            <input v-model="fighter.number" class="form-input mt-1 block w-full p-2 border" placeholder="Jane Doe">
          </label>
          <label class="block">
            <span class="text-gray-700">ダッシュ</span>
            <input
            id="dash-false"
            v-model="fighter.isDashFighter"
            type="radio"
            name="false"
            :value="false"
          />
          <label for="stage-finalDestination">オリジナル</label>
          <input
            id="dash-true"
            v-model="fighter.isDashFighter"
            type="radio"
            name="true"
            :value="true"
          />
          <label for="stage-finalDestination">ダッシュファイター</label>
          </label>
        </form>
      </div>
      <div class="submit">
        <Button @onClick="submit" label="保存する" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'

export default {
  components: {
    Button
  },
  data () {
    return {
      fighter: {
        english: '',
        japanese: '',
        number: 0,
        isDashFighter: false
      },
      error: ''
    }
  },
  methods: {
    submit () {
      console.log('submit')
      if (!this.fighter.english || !this.fighter.japanese || !this.fighter.number) {
        this.error = '情報が不足してます'
        return
      }
      const db = firebase.firestore()
      const addFighter = db
        .collection('fighters')
        .doc(this.fighter.english)
        .set({
          english: this.fighter.english,
          japanese: this.fighter.japanese,
          number: Number(this.fighter.number),
          isDashFighter: this.fighter.isDashFighter
        })
        .then(ref => {
          this.fighter.english = ''
          this.fighter.japanese = ''
          return ref
        })
      console.log('addFighter', addFighter)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-size: 24px;
  margin: 40px 0;
}
.error {
  color: red;
}
</style>