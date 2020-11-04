/*=========================================================================================
  File Name: modulebitWeb.js
  Description: bitWeb Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state    from './moduleBitWebState.js'
import mutations from './moduleBitWebMutations.js'
import actions from './moduleBitWebActions.js'
import getters from './moduleBitWebGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
