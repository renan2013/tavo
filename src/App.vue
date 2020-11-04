 
<template>
  <div id="app">
    <router-view @setAppClasses="setAppClasses" />

    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view name="footer"></router-view>
        {{}}
      </fade-transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";
//import io from 'socket.io-client';
import { mapState } from "vuex";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
import { FadeTransition } from "vue2-transitions";
import AppHeader from "./layouts/AppHeader.vue";

export default {
  components: {
    FadeTransition,
    AppHeader,
  },
  data() {
    return {
      vueAppClasses: [],
      tokenChat: "",
      contador: 0,
    };
  },

  computed: {
    getProfile() {
      return this.$store.state.dsoaLogin.profile;
    },
    getTokenChat() {
      return this.$store.state.dsoaLogin.token;
    },
  },

  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    },
    getTokenChat: function () {
      return;
    },
  },
  methods: {
    ...mapActions({
      login: "dsoaLogin/login",
      loginchat: "dsoaLogin/acLoginChat",
      logout: "dsoaLogin/logout",
    }),
    exit() {
      this.$socket.emit(
        "logout",
        this.$store.getters["dsoaLogin/user"].username
      );
      this.$socket.disconnect();
      this.logout();
    },

    toggleClassInBody(className) {
      if (className === "dark") {
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
        document.body.classList.add("theme-dark");
      } else if (className === "semi-dark") {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

      // Set --vh property
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    },

    ////////////CHAT
    traerLocalStorage() {
      //local storage
      let profile = divilib.traerLocalStorage();

      console.log("CHAT PROFILE RECUPERADO", profile);
      //let token   = divilib.traerLocalStorageTOKEN();
      console.log("CHAT  TOKEN RECUPERADO", JSON.stringify(token));

      let Credencial = this.getProfile[0].Credencial;

      console.log(
        "token Chat",
        token[0].tokenCHAT + "  y " + profile.Credencial
      );

      this.tokenChat = this.getTokenChat;

      if (this.tokenChat)
        if (this.tokenChat.length < 10)
          this.tokenChat = localStorage.getItem("profile");

      if (
        (profile.Credencial == "0" && Credencial == "0") ||
        (token[0].tokenCHAT == "0" && this.tokenChat == "")
      ) {
        this.$router.push("/pages/login").catch(() => {});
      } else if (profile.Credencial > "0" && Credencial == "0") {
        this.$store.commit("dsoaLogin/MUTSETPROFILE", profile);

        this.$store.commit("dsoaLogin/MUTSETRESPUESTALOGINCHAT", token);
        console.log("cargando el TOKENCHAT CON ", this.tokenChat);
        this.$store.commit("dsoaLogin/MUTSETTOKEN", this.tokenChat);
      } else if (this.tokenChat) {
        this.$store.commit("dsoaLogin/MUTSETTOKEN", this.tokenChat);
      }

      // reperar STORE TOKEN
    },
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

    // this.traerLocalStorage()

    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    try {
      this.$socket.connect();
    } catch (error) {
      console.log("Error al Conectar al Socket App.vue " + error);
    }
  },

  async created() {
    const dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);

    // Auth0

    //	alert("prueba de pruebaContext");

    this.$store.dispatch("pruebaContext");
    //try       { await this.$auth.renewTokens() } catch (e) { console.error(e) }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
