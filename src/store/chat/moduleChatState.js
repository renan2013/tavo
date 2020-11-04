/*=========================================================================================
  File Name: moduleChatState.js
  Description: Chat Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    // Chat Search Query 
    mensajeGeneral: {},
    // Stores All Contacts
    contacts: [],


    // Stores Chat Contacts
    //ademar lo llenamos chatContacts: [],
    chatContacts: [],

    // Stores Chat data(log)


    urlDsoa: "http://201.194.194.84:8998/DsoaService2/dsoa/request",

    urlDsoaCMS: "http://201.194.194.84:8998/DsoaService2/dsoa/CMSrequest",

    urlDosoaChatapi: process.env.VUE_APP_API_CHATURL,

    selectedRows: [],
    chats: {},

    chatconnect: 'Chat Off',

    peticionBasica: {
        "datos": "",
        "manipula": "",
        "bd": "",
        "dml": "E",
        "formato": "N",
        "formatoRequest": "N",
        "tecnologia": "",
        "datosJson": "",
        "objectId": "2520"
    },
    objectId: 2500,
    dml: "E",

    ///   CHAT 2 /////////////////////////////////////////////////////////////////////////////////
    namespaced: true,
    state: {
        token: null
    },

    chatSearchQuery: '',

    currentContact: 0
}




//export default authModule;