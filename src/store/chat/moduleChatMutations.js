/*=========================================================================================
  File Name: moduleChatMutations.js
  Description: Chat Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import {set } from '../../utils/vuex'

export default {
    UPDATE_ABOUT_CHAT(state, obj) {
        obj.rootState.AppActiveUser.about = obj.value
    },
    UPDATE_STATUS_CHAT(state, obj) {
        obj.rootState.AppActiveUser.status = obj.value
    },

    // API AFTER

    MUTCHATCONNECT(state, data) {
        state.chatconnect = data;
    },

    MUTSETCURRENTCONTACT(state, currentChat) {

        state.currentContact = currentChat;

    },

    SEND_CHAT_MESSAGE(state, payload) {

        console.log("mensajes ", JSON.stringify(payload))

        if (payload.chatData) {
            // If there's already chat. Push msg to existing chat
            state.chats.msg.push(payload.msg)

        } else {
            // Create New chat and add msg
            const chatId = payload.id
            Vue.set(state.chats, [chatId], {
                isPinned: payload.isPinned,
                msg: [payload.msg]
            })
        }
    },


    UPDATE_CONTACTS(state, contacts) {

        state.contacts = contacts

    },
    UPDATE_CHAT_CONTACTS(state, chatContacts) {
        state.chatContacts = chatContacts
    },
    UPDATE_CHATS(state, chats) {
        state.chats = chats
    },
    SET_CHAT_SEARCH_QUERY(state, query) {
        state.chatSearchQuery = query
    },
    MARK_SEEN_ALL_MESSAGES(state, payload) {
        payload.chatData.msg.forEach((msg) => {
            msg.isSeen = true
        })
    },
    TOGGLE_IS_PINNED(state, payload) {
        state.chats[Object.keys(state.chats).find(key => Number(key) === payload.id)].isPinned = payload.value
    },


    UPDATE_CONTACTSDIVI(state, contacts) {
        state.contacts = state.contacts
    },


    /// traida de chat2  /////////////////////////////////////////////
    setUser(state, data) {
        state.token = data.token;
    },
    logout(state) {
        state.token = null;
    },

    /// CHAT MUTATION CHAT MUTATION 

    setProcessing: set('processing'),
    setNotification: set('notification'),
    setPrivateNotification: set('privateNotification'),
    SOCKET_MUTATION_USER_JOINED(state, data) {
        state.notification = {
            show: true,
            message: data.message,
            color: "info"
        }
    },
    SOCKET_MUTATION_USER_LEAVE_ROOM(state, data) {
        state.notification = {
            show: true,
            message: data.message,
            color: "warning"
        }
    },

    SOCKET_MUTATION_NEW_ROOM_CREATED(state, data) {
        const room = data.room;
        state.notification = {
            show: true,
            message: `El usuario ${room.owner.username} ha creado la sala ${room.name}`,
            color: "success"
        }
    },

    SOCKET_MUTATION_PRIVATE_MESSAGE(state, payload2) {

        //alert("PRIVATE MESSAGES2222");
        console.log("datos que llego ", payload2)

        //let payload = payload2.data;
        let payload = [];

        if (payload2.origen == 1) {
            payload = payload2;
            console.log("local PLAY  ", JSON.stringify(payload.chatData))
        } else {
            payload = payload2.data;
            //console.log("lo que llego", JSON.stringify(payload))
            payload.chatData = state.chats; //Busca todo no filtra ya
            // console.log("SOCKET  play CHATDADA ", JSON.stringify(payload.chatData))

        }


        //payload.chatData = getters.chatDataOfUser(payload.id);

        //ES LO QUE HACE commit('SEND_CHAT_MESSAGE', payload);

        // si ya tiene mensajes lo agrega
        if (payload.chatData) {
            // If there's already chat. Push msg to existing chat 
            // console.log("Entro aqui SOCKET ", JSON.stringify(payload.chatData));

            state.chats.msg.push(payload.msg)
                //state.chats[Object.keys(state.chats).find(key => Number(key) === payload.id)].msg.push(payload.msg)

        } else {
            // Create New chat and add msg
            const chatId = payload.id

            Vue.set(state.chats, [chatId], {
                isPinned: payload.isPinned,
                msg: [payload.msg]
            })
        }

        state.chats.mensajeGeneral = {
            title: 'Chat Divisoft',
            time: 6000,
            text: 'mensaje',
            color: 'success'
        }

    },
    SOCKET_MUTATION_USER_JOINED_TO_PRIVATE_ROOM(state, message) {

        console.log("lado del Cliente destinoo", message)
        state.notification = {
            show: true,
            message,
            color: "success"
        }
    },

    SOCKET_MUTATION_ESTA_CONECTADO(state, mensaje) {
        //  console.log("llego de conectadollego de conectadollego de conectadollego de conectadollego de conectadollego de conectado llego de conectado",
        //     JSON.stringify(mensaje));
        state.chatconnect = mensaje.data.msg;


    },



}