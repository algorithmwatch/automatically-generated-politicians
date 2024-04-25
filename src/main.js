import Vue from 'vue'
import store from './store'

import VueRouter from 'vue-router'
import VueMeta from 'vue-meta';

Vue.use(VueRouter)
Vue.use(VueMeta)


const router = new VueRouter({
	mode:'hash',
	base: process.env.NODE_ENV === 'production'
    ? '/automatically-generated-politicians/'
    : '/',
	routes:[
		{path:"/", redirect: { path: "/en/Mona_Akrami/static" }, meta: { title: 'Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch' }},
		{path:"/:lang", redirect: { path: "/:lang/Mona_Akrami/static" }, meta: { title: 'Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch' }},
		{path:"/:lang/:mpid", redirect: { path: "/:lang/:mpid/static" }, meta: { title: 'Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch' }},
		{path:"/:lang/:mpid/:embed", meta: { title: 'Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch' }}
	]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Picturing the Parliament: how AI portrays German political candidates | AlgorithmWatch'
  next()
})

import { getData } from './import.js'
Vue.use(getData(store))

import App from './App.vue'

new Vue({
 store,
 render: h => h(App),
 router:router
}).$mount("#app")

