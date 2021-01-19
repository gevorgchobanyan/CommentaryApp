<template>
  <div class="create-commentary">
    <h1>Create a new commentary</h1>
    <form @submit="submitCommentary">
      <textarea @change="_setForm"></textarea>
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>



<script>
import {mapActions, mapMutations} from 'vuex'
 
export default {
  methods: {
    ...mapActions([
      "createComment",
    ]),
    ...mapMutations([
      "setForm",
    ]),
    submitCommentary(event){
      event.preventDefault()
      console.log('event', event)
      this.createComment()
    },
    _setForm(event){
      this.setForm({
        key:'comment', 
        value: event.target.value
      })
    },
  }
  
}
</script>

<style scoped>
textarea {
  width: 400px;
  height: 200px;
  font-size: 24px;
}
</style>