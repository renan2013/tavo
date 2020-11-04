<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >
        <!--bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /-->

        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer mx-auto flex items-center"
        >
          <img
            src="@/assets/images/logo/logo_tavo_horizontal.png"
            width="210"
            height="40"
          />
        </router-link>

        <!--ContactsDropDown /-->
        <notification-drop-down />

        <profile-drop-down />

        <!-- este es el componente de los chats -->
        <boton-whatsapp-bitweb />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from "./components/Bookmarks.vue";
import NotificationDropDown from "./components/NotificationDropDown.vue";
import ContactsDropDown from "./components/ContactsDropDown.vue";
import ProfileDropDown from "./components/ProfileDropDown.vue";

import BotonWhatsappBitweb from "./components/BotonWhatsappBitweb.vue";

export default {
  name: "the-navbar-horizontal",
  props: {
    logo: { type: String },
    navbarType: {
      type: String,
      required: true,
    },
  },
  components: {
    Bookmarks,
    NotificationDropDown,
    ProfileDropDown,
    ContactsDropDown,
    BotonWhatsappBitweb,
  },
  data() {
    return {
      rolBitWeb: "VISITANTE",
    };
  },
  computed: {
    // BUSCA SI EL ROL EN ROLBITWEB EXISTE DEVUELVE UN VALOR DIFERENTE A -1
    getRolBitWeb() {
      return this.$store.getters["dsoaLogin/buscaRol"](this.rolBitWeb);
    },

    navbarColor() {
      let color = "#fff";
      if (this.navbarType === "sticky") color = "#f7f7f7";
      else if (this.navbarType === "static") {
        if (this.scrollY < 50) {
          color = "#f7f7f7";
        }
      }

      if (this.isThemedark === "dark") {
        if (color === "#fff") {
          color = "#10163a";
        } else {
          color = "#262c49";
        }
      }

      return color;
    },
    isThemedark() {
      return this.$store.state.theme;
    },
    navbarStyle() {
      return this.navbarType === "static"
        ? { transition: "all .25s ease-in-out" }
        : {};
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === "static"
        ? null
        : "d-theme-dark-light-bg shadow-none";
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
};
</script>

