/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// import moduleTodo from './todo/moduleTodo.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
import moduleChat from './chat/moduleChat.js'
 import BitWeb from './bitWeb/moduleBitWeb.js'
 
import dsoaLogin from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'


export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        // todo: moduleTodo,
        // calendar: moduleCalendar,
        chat: moduleChat,
        BitWeb:BitWeb,
        dsoaLogin: dsoaLogin,
        eCommerce: moduleECommerce 
    },
    //  strict: process.env.NODE_ENV !== 'production'
    plugins: [new VuexPersistence().plugin]
        //plugins: [vuexLocal.plugin] // PERSISTENCIA
})