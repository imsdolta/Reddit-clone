<!-- redirect to this page if a subreddit is not founds -->
<template>
  <div class="notFound">
    <p> This Subreddit Does not</p> 
  </div>
</template>

<script>
export default {
  name: 'notFound',
  props : {
    subreddit : String
  }
}
</script>

<style scoped>

</style>
