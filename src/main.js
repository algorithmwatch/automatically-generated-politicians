import Vue from 'vue'
import store from './store'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
	mode:'history',
	routes:[
		{path:"/", redirect: { path: "/en/Terry_Reintke" }},
		{path:"/:lang", redirect: { path: "/:lang/Terry_Reintke" }},
		{path:"/:lang/:mpid"},
	]
});

import { getData } from './import.js'
Vue.use(getData(store))

import App from './App.vue'

new Vue({
 store,
 render: h => h(App),
 router:router
}).$mount("#app")