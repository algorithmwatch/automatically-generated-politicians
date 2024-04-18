import Vue from 'vue'
import store from './store'

import VueRouter from 'vue-router'
import VueMeta from 'vue-meta';

Vue.use(VueRouter)
Vue.use(VueMeta)


const router = new VueRouter({
	mode:'history',
	routes:[
		{path:"/", redirect: { path: "/en/Terry_Reintke/static" }, meta: { title: 'Automatically-generated politicians | AlgorithmWatch' }},
		{path:"/:lang", redirect: { path: "/:lang/Terry_Reintke/static" }, meta: { title: 'Automatically-generated politicians | AlgorithmWatch' }},
		{path:"/:lang/:mpid", redirect: { path: "/:lang/:mpid/static" }, meta: { title: 'Automatically-generated politicians | AlgorithmWatch' }},
		{path:"/:lang/:mpid/:embed", meta: { title: 'Automatically-generated politicians | AlgorithmWatch' }}
	]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Automatically-generated politicians | AlgorithmWatch'
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