import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import homepage from '@/components/homepage'
import approve from '@/components/approve'
import graclasses from '@/components/graclasses'
import grastatistics from '@/components/grastatistics'
import stumanage from '@/components/stumanage'
import applyact from '@/components/applyact'
import applyrecord from '@/components/applyrecord'
import showgrade from '@/components/showgrade'
import myact from '@/components/myact'
import publicity from '@/components/publicity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      children: [
        {
          path: '/approve',
          component: approve
        },
        {
          path: '/graclasses',
          component: graclasses
        },
        {
          path: '/grastatistics',
          component: grastatistics
        },
        {
          path: '/stumanage',
          component: stumanage
        },
        {
          path: '/applyact',
          component: applyact
        },
        {
          path: '/applyrecord',
          name:'applyrecord',
          component: applyrecord
        },
        {
          path: '/showgrade',
          component: showgrade
        },
        {
          path: '/myact',
          name:'myact',
          component: myact
        },
        {
          path: '/publicity',
          component: publicity
        }
      ]
    }
  ]
})
