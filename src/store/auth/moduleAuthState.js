/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {

    token: null, // CHAT  

    isUserLoggedIn: () => {
        let isAuthenticated = false

        return localStorage.getItem('userInfo') && isAuthenticated
    },


    /// DIVISOFT
    myPublicIP: "127.0.0.1",
    respuestaEncriptado: "",
    claveCambioClave: "",

    errorProfile: "0",

    urlEncripta: process.env.VUE_APP_ENCRIPTA,
    urlApiChat: process.env.VUE_APP_API_URL,
    urlChatSocket: process.env.VUE_APP_SOCKET_URLL,

    // profile  de conexion del usuario

    profile: [{
        Empresa: "100003",
        nombre: "",
        Credencial: "0",
        Username: "admin",
        num_user: 0,
        Roles: "VISITANTE"
    }],

    tokenStore: [{
        tokenAPIBOOT: "0",
        tokenCHAT: "0",
        tokenCMS: "0",
        tokenCLOUD: "0",
    }],


}