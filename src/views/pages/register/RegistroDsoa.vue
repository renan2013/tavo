<!-- =========================================================================================
File Name: RegistroDsoa.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card>
    <div class="clearfix">
      <div class="vx-card__title mb-8">
        <div>
          <vs-alert
            v-show="mensajeLogin"
            :active="inputValid"
            :color="AlertColor"
            class="text-dark mt-5"
          >
            {{ mensajeLogin }}
          </vs-alert>
          <br />
          <br />
          <br />
        </div>
      </div>
      <vs-input
        v-validate="'required|alpha_dash|min:3'"
        data-vv-validate-on="blur"
        label-placeholder="Nombre"
        name="nombre"
        placeholder="Nombre"
        v-model="nombre"
        class="w-full"
      />

      <vs-input
        data-vv-validate-on="blur"
        label-placeholder="apellidos"
        name="apellidos"
        placeholder="Apellidos"
        v-model="apellidos"
        class="w-full"
      />

      <vs-input
        v-validate="'required|min:6|max:10'"
        data-vv-validate-on="blur"
        name="usuario"
        type="usuario"
        label-placeholder="usuario"
        placeholder="Usuario"
        v-model="usuario"
        class="w-full mt-6"
      />

      <vs-input
        ref="password"
        type="password"
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        name="password"
        label-placeholder="Password"
        placeholder="Contraseña"
        v-model="password"
        class="w-full mt-6"
        v-on:change="onchangeConsiguePass"
      />

      <vs-input
        type="password"
        v-validate="'min:6|max:10|confirmed:password'"
        data-vv-validate-on="blur"
        data-vv-as="password"
        name="confirm_password"
        label-placeholder="Confirm Password"
        placeholder="Confirmar Contraseña"
        v-model="confirm_password"
        class="w-full mt-6"
      />

      <vs-input
        v-validate="'required|max:8|numeric'"
        data-vv-validate-on="blur"
        name="number"
        type="number"
        label-placeholder="Telefono"
        placeholder="Telefono"
        v-model="number"
        class="w-full mt-6"
      />
      <span class="text-danger text-sm">{{ errors.first("number") }}</span>

      <vs-input
        v-validate="'required|email'"
        data-vv-validate-on="blur"
        name="email"
        type="email"
        label-placeholder="Email"
        placeholder="Email"
        v-model="email"
        class="w-full mt-6"
      />
      <span class="text-danger text-sm">{{ errors.first("email") }}</span>
      <span class="text-danger">Imagen Avatar</span>
      <upload-default
        v-show="activaUpload"
        :isSidebarActive="activaUpload"
        :tituloUpload="tituloAvatar"
        @closeSidebar="activaUpload = false"
      />

      <div
        class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
        @click="uploadAvatar"
      >
        <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
        <span class="ml-2 text-base text-primary">{{ IMG_AVATAR }}</span>
      </div>

      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">
        Aceptar los
        <a href>terminos & condiciones</a> .
      </vs-checkbox>
      <vs-button type="border" to="/pages/login" class="mt-6">Login</vs-button>
      <vs-button
        v-show="enviar"
        class="float-right mt-6"
        @click="registroUsuario"
        :disabled="!validateForm"
        >Register</vs-button
      >
      <vs-button v-show="!enviar" class="float-right mt-6" @click="regresar"
        >Regresar</vs-button
      >
    </div>
  </vx-card>
</template>


<script>
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
import router from "@/router";
// mensajes de error personalizados
import { Validator } from "vee-validate";
// registra los mensajes personalizados

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import { eventBus } from "@/main"; // para que se hablen los componentes

import UploadDefault from "@/divisoft/uploadFile/UploadEmbebedPre.vue";

//import VueI18n from "vue-i18n";
//import validationMessages from "vee-validate/dist/locale/es";
//Validator.localize("es", dict);

export default {
  created() {
    //	 cuando se createReadStream

    eventBus.$on("RecogeDatosAvatar", (peticionAvatar) => {
      this.peticionAvatar = peticionAvatar;
      // console.log("peticion ABATAR YA EN REGISTRO ", this.peticionAvatar);
    });
  },

  components: {
    FormWizard,
    TabContent,
    UploadDefault,
  },

  watch: {
    getProfile: function () {
      //Salert("escuchando profile"+this.getProfile.Credencial);
      if (this.getProfile.Credencial == "R_CORRECTO") {
        this.enviar = false;

        this.$vs.notify({
          title: "GoP informa",
          text:
            "Ha si registrado correctamente, Para pode accesar A GO, debe de ratificar su correo y su telefono.",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
        });
        this.mensajeLogin =
          "Ha si registrado correctamente, Para pode accesar A GO, debe de ratificar su correo y su telefono. ";
      }
    },

    // SI HAY PROMPT
    getErrorLogin: function () {
      if (this.getErrorLogin != "0")
        this.$vs.notify({
          title: "GoP informa",

          text: "Se ha producido un error en Login ",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });
    },
  },
  data() {
    return {
      enviar: true,
      nombre: "",
      email: "",
      apellidos: "",
      number: "",
      usuario: "",
      password: "",
      activaUpload: false,
      tituloAvatar: "Para Cambiar Avatar",
      IMG_AVATAR: 0,
      peticionAvatar: "",
      CMSDATA: [
        {
          EntidadCodigo: "26",
          LlaveExterna: "9000",
          NumNivel: 1265,
          numDoc: 0,
          Encriptado: "",
          IndMultipleEntidad: "1",
          Directorio: "1",
          llavegenerica: "",
        },
      ],

      confirm_password: "",
      mensajeLogin: "...",
      isTermsConditionAccepted: false,
    };
  },
  computed: {
    getProfile() {
      return this.$store.state.dsoaLogin.profile;
    },
    inputValid() {
      if (this.getProfile.Credencial == "R_CORRECTO") {
        this.AlertColor = "success";
        this.mensajeLogin = "Se le ha enviado un Email a su correo Registrado";
      } else {
        this.mensajeLogin =
          "Error en el ejecutar las acciones de recuperacion de clave";
        this.AlertColor = "warning";
        return false;
      }
      return true;
    },
    getEncripta() {
      return this.$store.state.dsoaLogin.respuestaEncriptado;
    },
    validateForm() {
      return (
        // !this.errors.any() &&
        this.nombre !== "" &&
        this.usuario !== "" &&
        this.email !== "" &&
        this.number !== "" &&
        this.password !== "" &&
        this.confirm_password !== ""
      );
    },
    getErrorLogin() {
      return this.$store.state.dsoaLogin.errorProfile;
    },
  },
  methods: {
    regresar() {
      //regresa a LOgin
      router.push("/");
    }, // METODO busca
    onchangeConsiguePass() {
      //GO_SHOPMARCA
      this.$store.dispatch("dsoaLogin/acLoginEncripta", this.password);
    }, // METODO busca clave
    registroUsuario: function () {
      var origenUrl = "O";

      var header = {
        MODO: "E",
        OBJECTID: "97",
        CREDENCIAL: "REPLACECREDENCIAL",
        USERNAME: this.username,
        REGISTROSXPAGINA: "",
        PAGINA: "",
        ORDERBY: "",
      };

      var nombreCompleto;
      if (this.apellidos != "") {
        nombreCompleto = this.nombre + " " + this.apellidos;
      } else {
        nombreCompleto = this.nombre;
      }

      //crea SdtLogin
      var SdtLogin = {
        action: "I", //insertRegistros
        username: this.usuario,
        password: this.getEncripta,
        celular: this.number,
        email: this.email,
        nombre: nombreCompleto,
        empresa: "100003",
        direccionIP: "127.0.0.1",
        conexionADM: "security",
        credencial: "REPLACECREDENCIAL",
        passwordOld: "",
        keySecurity: "",
        Avatar: this.peticionAvatar,
      };

      var loginR = divilib.GetSdtLoginString(SdtLogin);

      //crea parametros
      var parametros = [];
      var parametro1 = {
        NOMBRE: "XML_SOLICITUD",
        OPERADOR: "=",
        VALOR1: loginR,
        VALOR2: "",
        CDATA: "1",
      };
      parametros.push(parametro1);

      //entrega arreglo de parametros recibe texto de parametros
      this.paramtxt = divilib.paramArraytoStrintg(parametros);
      this.headertxt = divilib.GetHeaderString(header);

      //Crea peticion
      var petTxt = {
        header: this.headertxt,
        parametros: this.paramtxt,
        filas: "",
      };

      //console.log("registroUsuario: " + petTxt);

      this.$store.commit("dsoaLogin/MUTSETURL", "O");
      this.$store.commit("dsoaLogin/MUTSETPETICIONTXT", petTxt);

      //agregar usuario a la hora
      var horaNumerico = Date.now();

      var pedido = {
        dml: "E",
        ObjectId: "97",
        credencial: horaNumerico,
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "6", //LOGIN
        origenUrl: origenUrl,
        tipoLogin: "I",
      };

      // console.log("registroUsuario: " + JSON.stringify(pedido));

      //llama action
      this.$store.dispatch("dsoaLogin/acLoginDsoa", pedido);
    },

    uploadAvatar() {
      this.activaUpload = true;

      this.CMSDATA = [
        {
          EntidadCodigo: "26",
          LlaveExterna: "9000",
          NumNivel: 1265,
          numDoc: 0,
          Encriptado: "",
          IndMultipleEntidad: "1",
          Directorio: "1",
          llavegenerica: "",
        },
      ];

      let respuestaCMS = [
        {
          EntidadCodigo: "26",
          Referencia: 0,
          LlaveExterna: "9000",
          NumNivel: 1265,
          NumDoc: 0,
          alto: 200,
          ancho: 200,
        },
      ];

      eventBus.$emit("cargaDocUploadEmbe", respuestaCMS);
    },
  },
};
</script>
