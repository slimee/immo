import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Immo from "./Immo.vue"

createApp(App)
  .use(createRouter({
    routes: [
      {path: '/', name: 'immo', component: Immo}
    ],
    history: createWebHistory(),
  }))
  .mount('#app')
