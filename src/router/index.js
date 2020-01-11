import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
const User = () => import('@/views/user')
const Profile = () => import('@/views/user/profile')
const Chat = () => import('@/views/user/chat')
const Login = () => import('@/views/login')
const Article = () => import('@/views/article')
const Search = () => import('@/views/search')
const SearchResult = () => import('@/views/search/result')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout, // 一级路由
    children: [{
      path: '/',
      component: Home
    }, {
      path: '/question',
      component: Question
    }, {
      path: '/video',
      component: Video
    }, {
      path: '/user',
      component: User
    }]
  }, {
    path: '/user/profile',
    component: Profile
  }, {
    path: '/user/chat',
    component: Chat
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/article',
    component: Article
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/search/result',
    component: SearchResult
  }
]

const router = new VueRouter({
  routes
})

export default router
