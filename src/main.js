/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$http = VueAxios, axios;

import 'bootstrap' //import Bootstrap’s JavaScript
import 'bootstrap/dist/css/bootstrap.min.css' // import Bootstrap CSS Styles


// Globally Registered Components
import './globalComponents.js'

//VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)


// fechas 
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
Vue.use(flatPickr)

//cryptojs
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs)

// API Calls
import './http/requests'

// mock
//import './fake-db/index.js'

// Theme Configurations
import '../themeConfig.js'

// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuexy Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')

//require("@/plugins/socket-io");

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import "./plugins/socket-io.js";


// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        // Add your API key here
        key: 'AIzaSyB4DDathvvwuwlwnUu7F4Sow3oU22y5T1Y',
        libraries: 'places' // This is required if you use the Auto complete plug-in
    }
})

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

export const eventBus = new Vue()
Vue.prototype.$rootBus = new Vue;



Vue.config.productionTip = false;
new Vue({
    router,
    store,
    i18n,
    acl,
    render: h => h(App)

}).$mount('#app')