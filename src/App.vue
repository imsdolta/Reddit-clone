<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <h4> /r/wanderlust </h4>
    </nav>
   
     <li v-for="post in posts" :key="post.id" class="media mt-3">
      <img class="mr-3" :src="post.data.thumbnail" alt="Generic placeholder image">
      <div class="media-body">
        <h5 class="mt-0 mb-1"><a :href="createURL(post.data.permalink)" target="_blank">{{post.data.title}}</a></h5>
          <span>
            <h3 class="text-danger"> {{post.data.ups}} ⬆ </h3>

            <p> created at {{ formatDate(post.data.created_utc)}} by {{post.data.author}}</p>
            <button
            v-if="isImage(post)"
             @click="post.showImage = !post.showImage" type="button" class="btn btn-primary">
              {{post.showImage ? 'Hide':'Show'}} Image
            </button>
            <div class="post-image" v-if="post.showImage">
              <img :src="post.data.url" height="100%" width="100%">
            </div>
            <span class="badge badge-pill badge-secondary">{{post.data.num_comments}} Comments </span>
          </span>
      </div>
    </li>
  </div>
</template>

<script>
import {formatDistance, subDays } from 'date-fns'
export default {
  name: 'App',
  data(){
    return {
      posts:[]
    };
  },
  mounted(){
    this.load();
  },
  methods:{         // All mathods go in this section
    load() {
      const subreddit = 'wanderlust'
      const url = 'https://www.reddit.com/r/'+subreddit+'/.json';  // Add /.json at end of a subreddit to access json of that page
      fetch(url)
      .then((response)=> response.json())
      .then(result =>{
        result.data.children.forEach(child=>{
          child.showImage = false;
        })
        this.posts = result.data.children;
     });
    },
    formatDate(date){
      return formatDistance(subDays(date*1000,0), new Date());
    },
    createURL(path){
      return `https://www.reddit.com${path}`;
    },
    isImage(post){
     return post.data.url.match(/\.(jpg|jpeg|png|bpm)$/); 
    }
  }
}

</script>

<style scoped>
.post-image{
  width :400px;
  height:auto;
}
</style>
