<template>
  <div class="the-navbar__user-meta flex items-center">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ getProfile[0].Username }}</p>
    </div>

    <!--:src="getProfile[0].Avatar"-->
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          key="onlineImg"
          src="@/assets/images/pages/rosebox.jpg"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/user/user-view/258').catch(() => {})"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Perfil</span>
          </li>

          <li
            v-if="getRolBitWeb >= 0"
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="gourl"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">BitWeb</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/chat/0').catch(() => {})"
          >
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="llamaCambioClave()"
          >
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Cambiar Clave</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Salir</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      key: "RU5WSUFET0RFU0RFREVTREVMT0dJTg==aaa",
      ruta: "/pages/reset-password/",
      rolBitWeb: "TAVO_MENSAJERIA",
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },

    getProfile() {
      return this.$store.state.dsoaLogin.profile;
    },

    // BUSCA SI EL ROL EN ROLBITWEB EXISTE DEVUELVE UN VALOR DIFERENTE A -1
    getRolBitWeb() {
      return this.$store.getters["dsoaLogin/buscaRol"](this.rolBitWeb);
    },
  },
  methods: {
    ...mapActions({
      logout: "dsoaLogin/logout",
    }),

    llamaCambioClave() {
      let momentoActual = new Date();
      let fecha = momentoActual.getDay();
      let hora = momentoActual.getHours();
      let minuto = momentoActual.getMinutes();
      let segundo = momentoActual.getSeconds();

      fecha += "-" + hora + "-" + minuto + "-" + segundo;

      let clave = this.key + btoa(fecha);

      this.$store.commit("dsoaLogin/MUTSETCLAVECONTROL", clave);
      clave = this.ruta + this.key + btoa(fecha);
      this.$router.push(clave).catch(() => {});
    },
    //cerrar sesion
    logout() {
      var defaultProfile = divilib.profile;
      var usuario = this.getProfile[0].Username;

      console.log("desconentando a ", usuario);

      // SALE DEL CHAT

      // borra los TOKENS
      localStorage.removeItem("tokenStore");
      //limpio el token de chat

      this.$store.commit("dsoaLogin/MUTLOGOUTCHAT");
      this.$store.commit("dsoaLogin/MUTSETCLEANTOKEN");

      this.$store.commit("dsoaLogin/MUTSETPROFILE", defaultProfile);

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change("admin");
      localStorage.removeItem("profile");
      localStorage.removeItem("paseKey");

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push("/pages/login").catch(() => {});

      this.$socket.emit("logout", usuario);
      this.$socket.disconnect();
    },
    gourl() {
      //window.location.href = "http://www.google.com"; //Will take you to Google.
      window.open("http://bitweb.tavocr.com/"); //This will open Google in a new window.
    },
  },
};
</script>
