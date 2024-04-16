import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    candidatesData:undefined,
    endImport:false,
  },
  mutations: {
    initializeCandidatesData (state,data) {
      state.candidatesData = data
    },
    endImport(state,value){
      state.endImport = value
    },
  }
})
