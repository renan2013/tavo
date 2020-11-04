/*=========================================================================================
  File Name: moduleChatActions.js
  Description: Chat Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import axios from 'axios';
import router from '@/router';

export default {
    setChatSearchQuery({ commit }, query) {
        commit('SET_CHAT_SEARCH_QUERY', query);
    },
    updateAboutChat({ commit, rootState }, value) {
        commit('UPDATE_ABOUT_CHAT', {
            rootState,
            value
        });
    },
    updateStatusChat({ commit, rootState }, value) {
        commit('UPDATE_STATUS_CHAT', {
            rootState,
            value
        });
    },

    SENDCHATMESSAGE({ getters, commit }, payload) {

        payload.chatData = getters.chatDataOfUser(payload.id)
        payload.origen = 1;
        commit('SEND_CHAT_MESSAGE', payload)
    },


    // API CALLS 
    SOCKET_ACTION_SEND_CHAT_MESSAGE({ commit }, payload) {

        //console.log("action SOCKET MMMMMMMMMMMMMMMENNNNNNNNNNNNNNNNNNNSAJE ", JSON.stringify(payload))
        payload.origen = 0;
        let message = payload.data;
        commit('SOCKET_MUTATION_PRIVATE_MESSAGE', payload)


        if (router.currentRoute.path !== "/apps/chat" && router.currentRoute.path !== "/apps/chat/0" && router.currentRoute.path !== "/apps/chat/118") {

            let modal = '<template> <div class="demo-alignment"><vs-button @click="activePrompt = true" color="primary" type="border">Run prompt</vs-button>' +
                '</div> </template>';

            Vue.component('modal', {
                modal

            })

            //alert("SEND_CHAT_MESSAGE")
            //router.push('/divisoft/notificaChat').catch(() => {});
        }


    },

    SOCKET_ACTION_SEND_NOTIFICACION({ commit }, payload) {
        console.log("Noticiacion Recibida", JSON.stringify(payload));

    },





    async fetchContacts({ commit, state }, pet) {
        ///loginDsoa
        //const url = process.env.VUE_APP_API_URL + "/getContacts";
        const url = process.env.VUE_APP_API_URL + "/getContacts";

        //console.log("petfetchContacts", pet)


        try {
            // fetch data from a url web service

            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "application/json", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": pet
                }).then((response) => {
                    //console.log("Respuesta ", JSON.stringify(response.data));
                    commit('UPDATE_CONTACTS', response.data);

                })
                .catch(function(error) {
                    alert("error AA" + error);
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("SE PRODUJO ERROR AA " + error);
                    }
                });

        } catch (error) {
            alert(error); // catches both errors
        }
    },

    // Get chat-contacts from server. Also change in store
    async fetchChatContacts({ commit, state }, pet) {

        ///loginDsoa

        const url = process.env.VUE_APP_API_URL + "/getContactChats";

        try {
            // fetch data from a url web service
            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "application/json", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": pet
                })
                .then((response) => {

                    commit('UPDATE_CHAT_CONTACTS', response.data);

                })
                .catch(function(error) {
                    alert("error" + error);
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("SE PRODUJO ERROR " + error);
                    }
                });

        } catch (error) {
            alert(error); // catches both errors
        }
    },



    // Get chats from server. Also change in store

    async fetchChats({ commit, state }, pet) {

        ///loginDsoa
        // alert("buscando chat");

        const url = process.env.VUE_APP_API_URL + "/getChats";
        // alert(url)
        try {
            // fetch data from a url web service
            let res = await axios({
                    method: 'POST',
                    url,
                    headers: { "content-type": "application/json", },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "sync": false,
                    "crossDomain": true,
                    "data": pet
                })
                .then((response) => {
                    //alert("respondiendo etchChats C");

                    //console.log("Respuesta ", JSON.stringify(response.data));
                    commit('UPDATE_CHATS', response.data)

                })
                .catch(function(error) {
                    alert("error" + error);
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("SE PRODUJO ERROR " + error);
                    }
                });

        } catch (error) {
            alert(error); // catches both errors
        }

    },


    markSeenAllMessages({ getters, commit }, id) {
        console.log('markSeenAllMessages buscando get chats 22', id);

        return [];

        return new Promise((resolve, reject) => {
            axios
                .post('/api/apps/chat/mark-all-seen', { id })
                .then((response) => {
                    commit('MARK_SEEN_ALL_MESSAGES', {
                        id,
                        chatData: getters.chatDataOfUser(id)
                    });
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    toggleIsPinned({ commit }, payload) {
        //alert('buscando33 chats');
        return new Promise((resolve, reject) => {
            axios
                .post('/api/apps/chat/set-pinned/', {
                    contactId: payload.id,
                    value: payload.value
                })
                .then((response) => {
                    commit('TOGGLE_IS_PINNED', payload);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },




};