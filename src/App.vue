<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <h4> /r/{{subreddit}} </h4>
      <input v-model="subreddit"  type="text" Enter subreddit />
      <button type="submit" @click="load" class="btn btn-primary">Search</button>
    </nav>

     <li v-for="post in posts" :key="post.id" class="media mt-3">
      <img class="mr-3" src="post.data.thumbnail" alt="No image">
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

import {formatDistance, subDays } from 'date-fns';
export default {
  name: 'App',
  data(){
    return {
      posts:[],
      subreddit:''
    };
  },

  methods:{         // All mathods go in this section
    load() {
      const url = 'https://www.reddit.com/r/'+this.subreddit+'/.json';  // Add /.json at end of a subreddit to access json of that page
      // rem : Error handling for bad for response except OK 
      fetch(url)
      .then((response)=>{
        console.log(response);
         if (!response.ok) alert("This subreddit does not exists");
          return response;
      })
      .then((response)=> response.json())
      .then(result =>{
        console.log(result);
        result.data.children.forEach(child=>{    
          child.showImage = false;
        })
        this.posts = result.data.children;
     });
    },
    formatDate(date){                       //Format date
      return formatDistance(subDays(date*1000,0), new Date());
    },
    createURL(path){                          // create URL  linking to actual reddit post
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
