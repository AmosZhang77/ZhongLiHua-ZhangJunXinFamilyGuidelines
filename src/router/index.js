import Vue from 'vue'
import Router from 'vue-router'
import editableDiv from '@/components/editableDiv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editableDiv',
      component: editableDiv
    }
  ]
})
