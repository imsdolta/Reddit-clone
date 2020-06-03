import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true  // Make sure to add vue extention from chrome web store 

new Vue({
  render: h => h(App),
}).$mount('#app')
