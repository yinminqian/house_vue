import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import nav_title from '@/components/nav'
import test from '@/components/test'
import basics1 from '../components/release/basics1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/basics1',
      name:basics1,
      component:basics1
    },
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/nav',
      name:'nav',
      component:nav_title
    },
    {
      path:'/test',
      name:'test',
      component:test
    }
  ]
})
