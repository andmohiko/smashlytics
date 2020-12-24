<template>
  <div class="container">
    <div class="title">
      <h2>fighters</h2>
    </div>
    <div class="form">
      <div class="input">
        <p class="error">{{ error }}</p>
        <p>en</p>
        <input v-model="fighter.english" type="text">
        <p>jp</p>
        <input v-model="fighter.japanese" type="text">
        <p>No.</p>
        <input v-model="fighter.number" type="number">
        <p>ダッシュ</p>
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
      </div>
      <div class="submit">
        <Button @onClick="submit" label="Submit" />
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
      console.log('db')
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
          console.log('Add ID: ', ref)
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