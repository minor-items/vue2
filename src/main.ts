import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './registerServiceWorker'
import route from './router'
import store from './store'
import Api from './api'
import App from './App.vue'

import './assets/style/overviewInit.styl'

Vue.use(VueRouter)
Vue.use(Api)
Vue.config.productionTip = false
let router: any = null
let instance: any = null

const { routes, AfterEach, BeforeEach } = route

function render (props: any = {}) {
  const { container, name } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? name : '/',
    mode: 'history',
    routes,
  })
  router.beforeEach((to: any, from: any, next: any) => {
    BeforeEach(to, from, next)
  })
  router.afterEach(() => {
    AfterEach()
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: any) {
  console.log('[vue] props from main framework', props)
  Vue.prototype.$qiankun=props
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}

