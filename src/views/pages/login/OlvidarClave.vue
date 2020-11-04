<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
<div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
        <vx-card>
            <div slot="no-body" class="full-page-bg-color">
                <div class="vx-row">
                    <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                        <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto" />
                    </div>
                     
                    <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                        <div class="p-8">
                            <div class="vx-card__title mb-8">
                                <div>
                                      <vs-alert v-show="mensajeLogin" :active="inputValid" :color="AlertColor"  class="text-dark mt-5"> {{mensajeLogin}} </vs-alert>
                                      <br/>
                                      <br/>
                                      <br/>
                                 </div>
                                <h4 class="mb-4">Recuperar contraseña</h4>
                                <p>Le enviaremos las instrucciones para realizar el cambio de clave al correo electrónico asociado a su cuenta.</p>
                            </div>
                            <span class="input-group-text">{{ID_USUARIO}}</span>
                           
                            <br>
                            <div class="input-group mb-3">
                                <p>Ingrese los últimos 4 digitos del número celular asociado a su cuenta que Termina segun los 2 ultimos digitos</p>
                                <div class="input-group-prepend">
                                    <span class="input-group-text">{{celular}}</span>
                                </div>
                                <vs-input v-validate="'required|max:4|numeric'" size="default"
                                 data-vv-validate-on="blur" name="NUM_CELULAR" 
                                 v-model="CUATRODIGITOS" 
                                  v-on:change="onchangeVerificaCelular"
                                 class="w-1/3" />
                            </div>

                            <span class="text-danger text-sm">{{ errors.first('numCel') }}</span>
                            <br /> <br />
                            <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Regresar al Login</vs-button>
                            <vs-button class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0" :disabled="!validateForm || !RECUPERAR" @click="recuperarClave('R')">Recuperar Contraseña</vs-button>
                        </div>
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</div>
</template>

<script>
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";

export default {
    created()
    {
        this.CUATRODIGITOS="**"+this.getProfile.Celular.substring(6,8);
        this.NUM_CELULAR=this.getProfile.Celular;

        this.ID_USUARIO=this.getProfile.Username;

    },

      watch: {

      "getProfile": function () {

           if (this.getProfile.Credencial=="R_CORRECTO"  )
           { 
            


            this.$vs.notify({
                 title: 'GoP informa', 
                 text: "Se le ha enviado un Email a su correo Registrado",
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success"
              });
                          this.mensajeLogin="Se le ha enviado un Email a su correo Registrado";
                }
                
          },
 
          // SI HAY PROMPT
          "getErrorLogin": function () {

              if (this.getErrorLogin != "0") 
              
                this.$vs.notify({
               title: 'GoP informa',
               
                text: "Se ha producido un error en Login ",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warning"
              });
               
 
          }
     },
    data() {
        return {
            //se carga con un computado o un prop desde el otro componente
            celular: "****-",
            ID_USUARIO: "",
            CUATRODIGITOS:"",
            NUM_CELULAR: "",
            RECUPERAR:false,
             mensajeLogin:"...",
              AlertColor:"primary",
        };
    },
    computed: {

    inputValid() { 
       if (this.getProfile.Credencial=="R_CORRECTO"  ) {
          this.AlertColor="success"
         this.mensajeLogin="Se le ha enviado un Email a su correo Registrado"
         

      } else 
      {
         this.mensajeLogin="Error en el ejecutar las acciones de recuperacion de clave"
         this.AlertColor="warning"
         return false;
      }
       return true
    },

         getProfile() {
            return this.$store.state.dsoaLogin.profile;
        },
        getErrorLogin() {
           return this.$store.state.dsoaLogin.errorProfile;
         },
        validateForm() {
            return !this.errors.any() && this.NUM_CELULAR !== ''
        }
    },
    methods: {
        //función para iniciar sesión
        onchangeVerificaCelular() {
             if (this.CUATRODIGITOS== this.NUM_CELULAR.substring(4,8) )
                 this.RECUPERAR=true;
             else
               this.RECUPERAR=false;
            

        },

     recuperarClave: function (indicadorTipoLogin)  {
              //función para iniciar sesión
       this.mensajeLogin="Procesando...."       
      var origenUrl = "O"; 
      this.password = "NA"; //A en B64 
      var header = {
        MODO: "E",
        OBJECTID: "97",
        CREDENCIAL: "REPLACECREDENCIAL",
        USERNAME: this.username,
        REGISTROSXPAGINA: "",
        PAGINA: "",
        ORDERBY: ""
      };

      //crea SdtLogin
      var SdtLogin = {
        action: indicadorTipoLogin,
        username: this.ID_USUARIO,
        password: "NA",
        direccionIP: this.getPublicIp,
        conexionADM: "security",
        credencial: "NA",
        celular: "",
        email: "",
        nombre: "",
        empresa: "",
        passwordOld: "",
        keySecurity: ""
      };

      var loginR = divilib.GetSdtLoginString(SdtLogin);

      //crea parametros
      var parametros = [];

      var parametro1 = {
                NOMBRE: "XML_SOLICITUD",
                OPERADOR: "=",
                VALOR1: loginR,
                VALOR2: "",
                CDATA: "1"
      };
      parametros.push(parametro1);

      //entrega arreglo de parametros recibe texto de parametros
      this.paramtxt = divilib.paramArraytoStrintg(parametros);
      this.headertxt = divilib.GetHeaderString(header);

      //Crea peticion
      var petTxt = {
        header: this.headertxt,
        parametros: this.paramtxt,
        filas: ""
      };

      this.$store.commit("dsoaLogin/MUTSETURL", "O");
      this.$store.commit("dsoaLogin/MUTSETPETICIONTXT", petTxt);

      //agregar usuario a la hora
      var horaNumerico = Date.now();
      console.log("The time elapsed in millisecond is: " + horaNumerico);
     

      //Crea pedido
      var pedido = {
        dml: "E",
        ObjectId: "97",
        credencial: horaNumerico,
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "6", //LOGIN
        origenUrl: origenUrl,
        tipoLogin: indicadorTipoLogin

      }; 
      //llama action
      this.$store.dispatch("dsoaLogin/acLoginDsoa", pedido);
    },
    }
};
</script>

<style>
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
