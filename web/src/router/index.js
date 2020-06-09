import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/auth/Auth'
import Branches from '../components/branches/index'
import BrancheById from '../components/branches/indexById'
import AlterBranche from '../components/branches/alter'
import CrateBranche from '../components/branches/create'

Vue.use(VueRouter)

  const routes = [
  {
    name: 'Auth',
    path: '/login',
    component: Auth
  },
  {
    name: 'branches',
    path: '/',
    component: Branches
  },
  {
    name: 'infoBranche',
    path: '/branche/:id',
    component: BrancheById
  },
  {
    name: 'alterBranche',
    path: '/alter-branche/:id',
    component: AlterBranche
  },
  {
    name: 'createBrance',
    path: '/create-branche',
    component: CrateBranche
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
