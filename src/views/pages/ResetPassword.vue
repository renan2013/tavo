<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
        <vx-card>
            <div slot="no-body" class="full-page-bg-color">
                <div class="vx-row">
                    <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                        <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                    </div>
                    <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                        <div class="p-8">
                            <div class="vx-card__title mb-8">
                                <h4 class="mb-4">Cambiar la Clave</h4>
                                <p>Ingrese la Clave Nueva</p>
                               
                            </div>
                            <div class="vx-card__title mb-8">
                                <span class="ml-2">Usuario:{{usuario}}</span>
                            </div>
                            <div class="vx-card__title mb-8">
                                <span class="ml-2">Correo:{{email}}</span>
                            </div>

                            <vs-input type="password" label-placeholder="Password"
                            v-model="claveActual" class="w-full mb-6" v-on:change="onchangeConsiguePass" />

                            <vs-input type="password" label-placeholder="Confirm Password"
                             v-model="claveActual2" class="w-full mb-8" v-on:change="onchangeConsiguePass2" />

                            <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                <vs-button type="border" to="/pages/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To Login</vs-button>
                                <vs-button
                                 class="w-full sm:w-auto"
                                 @click="realizaCambio('C')" 
                                   realizaCambio>Reset</vs-button>
                            </div>
                           

                        </div>
                    </div>
                </div>
            </div>
        </vx-card>
         <vs-alert :active="inputValid" :color="AlertColor"  class="text-dark mt-5"> {{SystemMessage}} </vs-alert>
    </div>
</div>
</template>

<script>

import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
export default {

    

    created() {

        if (this.$route.params.KEY === this.getClave && this.getClave.length > 0) {

            let clave = this.$route.params.KEY
            clave = clave.substr(0, 32)
            this.$store.commit("dsoaLogin/MUTSETCLAVECONTROL", "");
          
            this.usuario = this.getProfile.Username
            this.email = this.getProfile.Email
        } else
            this.$router.push("/pages/login").catch(() => {})

            this.usuario=this.getProfile.Username;

    },

    watch: {
     
     // cuenado respondio el cambio de  password 
      getProfile: function () {
           
            this.$vs.notify({
               title: 'GoP informa', 
                text: "Cambio Realizado con Exito ",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warning"
              });
                
          },
          getProfile2: function () {
           
            this.$vs.notify({
               title: 'GoP informa', 
                text: "Cambio Realizado con Exito ",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warning"
              });
                
          },
 
          // SI HAY PROMPT
          getErrorLogin: function () { 
 
              if (this.getErrorLogin != "0")  
                 if (this.getErrorLogin == "1002") 
                 { 
                   this.mensajeLogin="Hay un proceso de Recuperacion de Clave Iniciado, Debe de Concluirlo ";

                 this.$vs.notify({
                      title: 'GoP informa',
                        text: "Hay un proceso de Recuperacion de Clave Iniciado, Debe de Concluirlo ",
                        iconPack: "feather",
                        icon: "icon-alert-circle",
                        color: "warning"
                      });
                   }     
                 else
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
            usuario:"",
            email: '',
            claveActual: '',
            claveActual2: '',
            paso1: false,
            paso2:false,
            paso3:false,
            SystemMessage:"..."
        }
    },
    computed: {
        getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
        getProfile2() {
            return this.$store.state.dsoaLogin.profile;
        },
        getClave() {
            return this.$store.state.dsoaLogin.claveCambioClave;
        },
        // escucha si el login  respondio error 
        getErrorLogin() {
           return this.$store.state.dsoaLogin.errorProfile;
        },
       getEncripta() {
          return this.$store.state.dsoaLogin.respuestaEncriptado;
        }
    },

    methods: {

        onchangeConsiguePass() {
            //GO_SHOPMARCA 

            let clave=this.claveActual;
            this.$store.dispatch("dsoaLogin/acLoginEncripta",clave);
            
        }, // METODO busca clave

        onchangeConsiguePass2() {
            //GO_SHOPMARCA
            if (this.getEncripta!=null)
               this.paso1 = true;
            else
            {
              
               this.paso1 =false
            } 
          
            if (this.claveActual === this.claveActual2)
                this.paso2 = true;
            else
            {
                this.paso2 = false;
                this.SystemMessage="No hay Coincidencia entre las claves Ingresadas"
            }
        }, // METODO busca clave

        realizaCambio: function (indicadorTipoLogin)
         {
             
            if (this.paso1 && this.paso2)
            {
            var origenUrl = "O";

             

            var header = {
                MODO: "E",
                OBJECTID: "97",
                CREDENCIAL: "REPLACECREDENCIAL",
                USERNAME: this.getProfile.Username,
                REGISTROSXPAGINA: "",
                PAGINA: "",
                ORDERBY: ""
            };

            //crea SdtLogin
            var SdtLogin = {
                action: indicadorTipoLogin,
                username: this.getProfile.Username,
                password: this.getEncripta,
                direccionIP: this.getPublicIp,
                conexionADM: "security",
                credencial: "REPLACECREDENCIAL",
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
            this.$store.commit("dsoaLogin/MUTSETPROFILE",[]);
             
            this.$store.dispatch("dsoaLogin/acLoginDsoa", pedido);
           } 
        },

    },
    
}
</script>
