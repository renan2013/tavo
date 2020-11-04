<!-- =========================================================================================
    File Name: Chat.vue
    Description: Chat Application - Stay connected
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <!-- USER PROFILE SIDEBAR -->

  <div
    v-if="getTokenChat"
    id="chat-app"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <!-- TOKEN CHAT:{{getTokenChat}}-->

    <vs-sidebar
      class="items-no-padding"
      parent="#chat-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
      v-model="isChatSidebarActive"
      id="chat-list-sidebar"
    >
      <user-profile
        :active="activeProfileSidebar"
        :userId="userProfileId"
        class="user-profile-container"
        :isLoggedInUser="isLoggedInUserProfileView"
        @closeProfileSidebar="closeProfileSidebar"
      ></user-profile>

      <div class="chat__profile-search flex p-4">
        <div class="relative inline-flex">
          <!--vs-avatar v-if="activeUser.photoURL" class="m-0 border-2 border-solid border-white" :src="activeUser.photoURL" size="40px" @click="showProfileSidebar(Number(activeUser.uid), true)" /-->
          <div
            class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
            :class="'bg-' + getStatusColor(true)"
          ></div>
        </div>
        <vs-input
          icon-no-border
          icon="icon-search"
          icon-pack="feather"
          class="w-full mx-5 input-rounded-full"
          placeholder="Search or start a new chat"
          v-model="searchQuery"
        />

        <feather-icon
          class="md:inline-flex lg:hidden -ml-3 cursor-pointer"
          icon="XIcon"
          @click="toggleChatSidebar(false)"
        />
      </div>

      <vs-divider class="d-theme-border-grey-light m-0" />

      <component
        :is="scrollbarTag"
        class="chat-scroll-area pt-4"
        :settings="settings"
        :key="$vs.rtl"
      >
        <!-- ACTIVE CHATS LIST
            TOKEN CHAT:{{getTokenChat}} -->

        <p :class="colorConectado">Estado del chat: {{ getChatconnect }}</p>

        <div class="chat__chats-list mb-8">
          <h3 class="text-primary mb-5 px-4">Chats Principal</h3>
          <ul class="chat__active-chats bordered-items">
            <li
              class="cursor-pointer"
              v-for="(contact, index) in chatContacts"
              :key="index"
              @click="updateActiveChatUser(contact.uid)"
            >
              <chat-contact
                v-if="chatLastMessaged"
                showLastMsg
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact.uid).time"
                :unseenMsg="chatUnseenMessages(contact.uid)"
                :isActiveChatUser="isActiveChatUser(contact.uid)"
              ></chat-contact>
            </li>
          </ul>
        </div>

        <!-- CONTACTS LIST 
        CONTACTS LIST CHAT.VUE-->
        <div class="chat__contacts">
          <h3 class="text-primary mb-5 px-4">Contactos</h3>
          <ul class="chat__contacts bordered-items">
            <li
              class="cursor-pointer"
              v-for="contact in contacts"
              :key="contact.uid"
              @click="updateActiveChatUser(contact.uid)"
            >
              <chat-contact :contact="contact"> </chat-contact>
            </li>
          </ul>
        </div>
      </component>
    </vs-sidebar>

    <!-- RIGHT COLUMN 
    RIGHT COLUMN CHAT.VUE-->
    <div
      class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0"
      :class="{
        'sidebar-spacer--wide': clickNotClose,
        'flex items-center justify-center': activeChatUser === null,
      }"
    >
      <template v-if="activeChatUser">
        <div class="chat__navbar">
          <chat-navbar
            :isSidebarCollapsed="!clickNotClose"
            :user-id="activeChatUser"
            :isPinnedProp="isChatPinned"
            @openContactsSidebar="toggleChatSidebar(true)"
            @showProfileSidebar="showProfileSidebar"
            @toggleIsChatPinned="toggleIsChatPinned"
          ></chat-navbar>
        </div>

        <component
          :is="scrollbarTag"
          class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
          :settings="settings"
          ref="chatLogPS"
          :key="$vs.rtl"
        >
          <div class="chat__log" ref="chatLog">
            <chat-log :userId="activeChatUser" v-if="activeChatUser"></chat-log>
          </div>
        </component>

        <div class="chat__input flex p-4 bg-white">
          <vs-input
            class="flex-1"
            placeholder="Su Mensaje aqui"
            v-model="typedMessage"
            @keyup.enter="sendMsg"
          />

          <vs-button
            class="bg-primary-gradient ml-4"
            type="filled"
            @click="sendMsg"
            >Send</vs-button
          >
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col items-center">
          <feather-icon
            icon="MessageSquareIcon"
            class="mb-4 bg-white p-8 shadow-md rounded-full"
            svgClasses="w-16 h-16"
          ></feather-icon>
          <h4
            class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer"
            @click.stop="toggleChatSidebar(true)"
          >
            Start Conversation
          </h4>
        </div>
      </template>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col items-center">
      conctado2: {{ getChatconnect }}
    </div>
    <div class="flex flex-col items-center">
      <!--TOKEN CHAT:{{getChatconnect}}-->

      <feather-icon
        icon="MessageSquareIcon"
        class="mb-4 bg-white p-8 shadow-md rounded-full"
        svgClasses="w-16 h-16"
      ></feather-icon>
      <h4
        class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer"
        @click.stop="recarga()"
      >
        Start Conversation
      </h4>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

import ChatContact from "./ChatContact.vue";
import ChatLog from "./ChatLog.vue";
import ChatNavbar from "./ChatNavbar.vue";
import UserProfile from "./UserProfile.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import moduleChat from "@/store/chat/moduleChat.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";

//import io from 'socket.io-client';
export default {
  created() {
    // this.$store.commit('chat/MUTSETCURRENTCONTACT',5);
    this.contactId = this.$route.params.contactId;
    this.$store.commit("chat/MUTSETCURRENTCONTACT", 0);

    let vm = this;
    setTimeout(function (store) {
      vm.$store.commit("chat/MUTSETCURRENTCONTACT", vm.contactId);
    }, 2000);

    let datos = {
      NumEmpresa: this.getProfile[0].Empresa,
      userid: this.getProfile[0].num_user,
    };
    // contactos
    this.getfetContacts(datos);
    this.getChatContacts(datos);
    this.setSidebarWidth();
  },

  mounted() {
    try {
      this.$socket.connect();
      this.$store.commit(
        "chat/MUTCHATCONNECT",
        "No Conectado sus Mensajes No seran Entregados"
      );

      const payload = {
        NumEmpresa: this.getProfile[0].Empresa,
        username: this.getProfile[0].Username,
        id: this.getProfile[0].num_user,
        msg: this.mensajeConectado,
      };

      this.$socket.emit("TEST_CONNECTION", payload, function (response) {
        console.log("se disparo el   collback de Conectado ", response);
      });
    } catch (error) {
      console.log("en Chat.vue  en mounted catch" + error);
    }
    this.typedMessage = "";
  },

  data() {
    return {
      tokenChat: "",
      colorConectado: "text-danger",
      mensajeConectado: "Listo* Puede Chatear",
      contactId: "0",

      chatMsg: {
        msg: 1,
      },
      messages: [],
      active: true,
      isHidden: false,
      searchContact: "",
      activeProfileSidebar: false,
      activeChatUser: 118,
      userProfileId: -1,
      typedMessage: "",
      isChatPinned: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.7,
      },
      clickNotClose: true,
      isChatSidebarActive: true,
      isLoggedInUserProfileView: false,
    };
  },
  watch: {
    getChatconnect() {
      if (this.getChatconnect == this.mensajeConectado)
        this.colorConectado = "text-success";
    },
    chatMsg() {
      console.log("mensaje", this.chatMsg);
      this.setMessage(this.chatMsg);
    },

    windowWidth() {
      this.setSidebarWidth();
    },
    getProfile() {
      console.log("cambio el profile CHAT LINEA 167 APROX");
      //  alert("profile cambio ");
    },
    getCurrentContact() {
      if (this.getCurrentContact > 0) {
        let usuariochat = this.getCurrentContact;
        try {
          usuariochat = parseInt(usuariochat, 10);
        } catch (error) {}

        this.updateActiveChatUser(usuariochat);
      }

      //  alert("profile cambio ");
    },
  },
  computed: {
    getChatconnect() {
      return this.$store.state.chat.chatconnect;
    },
    getRecargar() {
      return this.$store.state.recargar;
    },
    getCurrentContact() {
      return this.$store.state.chat.currentContact;
    },

    getAppActiveUser() {
      return this.$store.state.AppActiveUser;
    },
    getchats() {
      return this.$store.state.chat.chats;
    },
    getProfile() {
      return this.$store.state.dsoaLogin.profile;
    },
    // COMPONENTE DIVISOFT CHAT
    getTokenChat() {
      return this.$store.state.dsoaLogin.token;
    },

    chatLastMessaged() {
      return (userId) => this.$store.getters["chat/chatLastMessaged"](userId);
    },
    chatUnseenMessages() {
      return (userId) => {
        const unseenMsg = this.$store.getters["chat/chatUnseenMessages"](
          userId
        );
        if (unseenMsg) return unseenMsg;
      };
    },
    activeUser() {
      return this.$store.state.AppActiveUser;
    },
    getStatusColor() {
      return (isActiveUser) => {
        const userStatus = this.getUserStatus(isActiveUser);

        if (userStatus === "online") {
          return "success";
        } else if (userStatus === "do not disturb") {
          return "danger";
        } else if (userStatus === "away") {
          return "warning";
        } else {
          return "grey";
        }
      };
    },
    chatContacts() {
      return this.$store.getters["chat/chatContacts"];
    },
    contacts() {
      return this.$store.getters["chat/contacts"];
    },

    searchQuery: {
      get() {
        if (this.$store.state.chat.chatSearchQuery)
          return this.$store.state.chat.chatSearchQuery;
        else return "";
      },
      set(val) {
        this.$store.dispatch("chat/setChatSearchQuery", val);
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    isActiveChatUser() {
      return (userId) => userId === this.activeChatUser;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  methods: {
    recarga() {
      this.$router.go(this.$router.currentRoute);
    },
    getUserStatus(isActiveUser) {
      // return "active"
      return isActiveUser
        ? this.$store.state.AppActiveUser.status
        : this.contacts[this.activeChatUser].status;
    },
    closeProfileSidebar(value) {
      this.activeProfileSidebar = value;
    },

    updateActiveChatUser(contactId) {
      //  this.$store.commit('chat/MUTSETCURRENTCONTACT',5);
      this.contactId = 0;

      try {
        this.activeChatUser = parseInt(contactId, 10);
      } catch (error) {
        this.activeChatUser = contactId;
      }

      let datos = {
        NumEmpresa: this.getProfile[0].Empresa,
        userid: this.getProfile[0].num_user,
        userSend: contactId,
      };

      this.getfetChats(datos);

      if (this.$store.getters["chat/chatDataOfUser"](this.activeChatUser)) {
        this.$store.dispatch("chat/markSeenAllMessages", contactId);
      }
      const chatData = this.$store.getters["chat/chatDataOfUser"](
        this.activeChatUser
      );
      if (chatData) this.isChatPinned = chatData.isPinned;
      else this.isChatPinned = false;
      this.toggleChatSidebar();
      this.typedMessage = "";
    },
    showProfileSidebar(userId, openOnLeft = false) {
      try {
        this.userProfileId = parseInt(userId, 10);
      } catch (error) {
        this.userProfileId = userId;
      }

      this.isLoggedInUserProfileView = openOnLeft;
      this.activeProfileSidebar = !this.activeProfileSidebar;
    },

    sendMsg() {
      //alert("divisoft envieando MENSAJE");
      if (!this.typedMessage) return;
      if (!this.activeChatUser) return;

      const payload = {
        NumEmpresa: this.getProfile[0].Empresa,
        isPinned: this.isChatPinned,
        username: this.getProfile[0].Username,
        sendusernum: this.getProfile[0].num_user,

        msg: {
          textContent: this.typedMessage,
          time: String(new Date()),
          isSent: true,
          isSeen: false,
        },
        id: this.activeChatUser,
      };
      //ADEMAR VER SI HAY COMUNICACION
      console.log("enviando ", JSON.stringify(payload));

      this.typedMessage = "";

      // se lo manda al destinatrio

      this.$socket.emit("SEND_MESSAGE", payload, function (response) {
        console.log("se disparo el  collback", response);
      });
      // lo refresca en nuestro chat

      this.$store.dispatch("chat/SENDCHATMESSAGE", payload);

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
    },

    setMessage(data) {
      this.$store.commit("chat/SEND_CHAT_MESSAGE", data);
    },

    toggleIsChatPinned(value) {
      this.isChatPinned = value;
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.isChatSidebarActive = this.clickNotClose = false;
      } else {
        this.isChatSidebarActive = this.clickNotClose = true;
      }
    },
    toggleChatSidebar(value = false) {
      if (!value && this.clickNotClose) return;
      this.isChatSidebarActive = value;
    },

    getfetContacts(datos) {
      this.$store.dispatch("chat/fetchContacts", datos);
      return 1;
    },

    getfetChats(datos) {
      this.$store.dispatch("chat/fetchChats", datos);
      return 1;
    },
    getChatContacts(datos) {
      this.$store.dispatch("chat/fetchChatContacts", datos);
      return 1;
    },
  },
  components: {
    VuePerfectScrollbar,
    ChatContact,
    UserProfile,
    ChatNavbar,
    ChatLog,
  },

  /* beforeDestroy() {
         this.$store.unregisterModule('chat')
     }*/
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";
</style>
