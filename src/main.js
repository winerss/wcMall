// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import base from './common/base'

Vue.use(base)
Vue.use(VueAxios, axios)
Vue.use(App)
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(ElementUI)
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
import home from './components/home/home'
import homePage from './components/home/homePage'
import search from './components/home/search'
import catalog from './components/catalog/catalog'
import catalogPage from './components/catalog/catalogPage'
import detail from './components/catalog/detail'
import cart from './components/cart/cart'
import about from './components/about/about'
import myHome from './components/about/home'
import orderList from './components/about/orderList'
import delivery from './components/about/myOrder/delivery/delivery'
import drawback from './components/about/myOrder/drawback/drawback'
import harvest from './components/about/myOrder/harvest/harvest'
import obligation from './components/about/myOrder/obligation/obligation'
import myOrder from './components/about/myOrder/obligation/myOrder'
import address from './components/about/myOrder/obligation/address'
import ratings from './components/about/myOrder/ratings/ratings'
import setUp from './components/about/setUp'
import personInfo from './components/about/setUp/personInfo'
import collect from './components/about/collect'
import message from './components/about/message'
import system from './components/about/message/system'
import trade from './components/about/message/trade'
// 2. 定义路由

const routes = [
  {path: '/', redirect: '/home/homePage'},
  {path: '/home',
    component: home,
    children: [
      {path: '/', redirect: '/home/homePage'},
      {path: '/home/homePage', component: homePage},
      {path: '/home/search', component: search}
    ]
  },
  {path: '/catalog',
    component: catalog,
    children: [
      {path: '/catalog', redirect: '/catalog/catalogPage'},
      {path: '/catalog/catalogPage', component: catalogPage},
      {path: '/catalog/detail/:gid', name: 'detial', component: detail}
    ]
  },
  {path: '/cart', component: cart},
  {path: '/about',
    component: about,
    children: [
      {path: '/about', redirect: '/about/home'},
      {path: '/about/home', component: myHome},
      {path: '/about/orderList',
        component: orderList,
        children: [
          {path: '/about/orderList', redirect: '/about/orderList/obligation'},
          {path: '/about/orderList/obligation', component: obligation},
          {path: '/about/orderList/obligation/myOrder/:num', name: 'myOrder', component: myOrder},
          {path: '/about/orderList/obligation/myOrder/address', name: 'address', component: address},
          {path: '/about/orderList/delivery', component: delivery},
          {path: '/about/orderList/drawback', component: drawback},
          {path: '/about/orderList/harvest', component: harvest},
          {path: '/about/orderList/ratings', component: ratings}
        ]
      },
      {path: '/about/collect', component: collect},
      {path: '/about/setUp',
        component: setUp,
        children: [
          {path: '/about/setUp/personInfo', component: personInfo}
        ]
      },
      {path: '/about/message',
        component: message,
        children: [
          {path: '/about/message', redirect: '/about/message/trade'},
          {path: '/about/message/trade', component: trade},
          {path: '/about/message/system', component: system}
        ]
      }
    ]
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
})
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
