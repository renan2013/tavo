
<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
    SECCION HTML DEL COMPONENTE EDIT 
========================================================================================== -->
<template>
  <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit" @on-complete="formSubmitted">
      <tab-content
            title="FORMULARIO GRUPO1"
            class="mb-5"
            icon="feather icon-user"
            :before-change="validateStep1"
          >
          <form data-vv-scope="step-1">
          <!-- tab 1 content -->
          <div class="vx-row">
                
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                                  <vs-input
                                    :value="COD_CATEGORIAPATNER"
                                    v-model="COD_CATEGORIAPATNER"
                                    name="COD_CATEGORIAPATNER"
                                    label="Código Categoriapatner"
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2512"
                                    >IR</vs-button
                                  >
                                  
                                  <vs-input
                                    :value="DI_VALOR"
                                    v-model="DI_VALOR"
                                    name="DI_VALOR"
                                    label="Valor"
                                  />

                                </template>
                              </vx-input-group>
                              </div> 
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                                  <vs-input
                                    :value="COD_CIA"
                                    v-model="COD_CIA"
                                    name="COD_CIA"
                                    label="Código Cia"
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2500"
                                    >IR</vs-button
                                  >
                                  
                                  <vs-input
                                    :value="DI_CIA"
                                    v-model="DI_CIA"
                                    name="DI_CIA"
                                    label="Nombre"
                                  />

                                </template>
                              </vx-input-group>
                              </div> 
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                                  <vs-input
                                    :value="COD_PERSONA"
                                    v-model="COD_PERSONA"
                                    name="COD_PERSONA"
                                    label="Código Persona"
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2511"
                                    >IR</vs-button
                                  >
                                  
                                  <vs-input
                                    :value="DI_NOMBRE"
                                    v-model="DI_NOMBRE"
                                    name="DI_NOMBRE"
                                    label="Nombre"
                                  />

                                </template>
                              </vx-input-group>
                              </div><div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required'"   label="Nom Negocio" name="NOM_NEGOCIO" v-model="NOM_NEGOCIO" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-1.NOM_NEGOCIO")}}</span>
      </div> 
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                      
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2509"
                                    >IR</vs-button
                                  >
                                  
                                  <vs-input
                                    :value="DI_DIRECCION"
                                    v-model="DI_DIRECCION"
                                    name="DI_DIRECCION"
                                    label="Dirección"
                                  />

                                </template>
                              </vx-input-group>
                              </div> <div class="vx-col md:w-1/2 w-full">  
                                       <ul class="centerx"  >
                                               <li  :key="index"  v-for="(item, index) in LI_ESTADO" >
                                                      <vs-radio v-model="IND_ESTADO" :vs-value="item.value">{{item.text}}</vs-radio>
                                               </li>
                                          </ul> 
                                        
                                      </div>     
              </div>
          </div>
           </form>
      </tab-content>

      <!-- tab 2 content -->
       
      <tab-content
            title="FORMULARIO GRUPO2 "
            class="mb-5"
            icon="feather icon-user"
            :before-change="validateStep2"
          >
      <form data-vv-scope="step-2">
          <div class="vx-row">
                
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="NUM_TELEFONO1" v-model="NUM_TELEFONO1" class="mt-5 w-full" />
                                <span class="text-danger">{{errors.first("step-2.NUM_TELEFONO1")}}</span>
                              </div> 
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="NUM_TEFEFONO2" v-model="NUM_TEFEFONO2" class="mt-5 w-full" />
                
                              </div> <div class="vx-col md:w-1/2 w-full">  
                                       <ul class="centerx"  >
                                               <li  :key="index"  v-for="(item, index) in LI_TIPOPATNER" >
                                                      <vs-radio v-model="TIP_PATNER" :vs-value="item.value">{{item.text}}</vs-radio>
                                               </li>
                                          </ul> 
                                        
                                      </div>    
                                                      <div class="vx-col md:w-1/2 w-full">
                                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^[0-9]\d*(\.\d+)?$" name="NUM_CALIFICACION" v-model="NUM_CALIFICACION" class="mt-5 w-full" />
                                                <span class="text-danger text-sm" v-show="errors.has('NUM_CALIFICACION')">{{ errors.first('NUM_CALIFICACION') }}</span>
                                              </div> 
          </div>
           </form>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content
            title="FORMULARIO GRUPO3"
            class="mb-5"
            icon="feather icon-user"
            :before-change="validateStep3"
          >
           <form data-vv-scope="step-3">
          <div class="vx-row">
               
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="IMG_AVATAR" v-model="IMG_AVATAR" class="mt-5 w-full" />
                
                              </div><div class="vx-col w-1/2">
        <vs-input size="large"    label="Hash Avatar" name="HASH_AVATAR" v-model="HASH_AVATAR" class="mt-5 w-full" /> 
      </div> 
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="NUM_CONTRATO" v-model="NUM_CONTRATO" class="mt-5 w-full" />
                
                              </div><div class="vx-col w-1/2">
        <vs-input size="large"    label="Hash Contrato" name="HASH_CONTRATO" v-model="HASH_CONTRATO" class="mt-5 w-full" /> 
      </div>   
          </div>
           </form>
      </tab-content>
  </form-wizard>
</template>

 
<script>  


  import { mapState } from "vuex"; //, mapMutations, mapActions 
import { eventBus } from "@/main"; // para que se hablen los componentes  

 
  // SI ES POR PASOS  
  
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
 


// mensajes de error personalizados
import { Validator } from "vee-validate";
import * as datos2520 from "./js/divi2520.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"; 
 
// NO USAR SI NO HAY FECHAS
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
// FIN IMPORT POR FECHAS  
 
 
 
const dict = datos2520.mensajesValidacion;
// registra los mensajes personalizados
Validator.localize("en", dict); 

export default {
    
  name: "Autocomplete",
   components: {
   
      FormWizard,
    TabContent,
     
    flatPickr,
   
    Prism 
  },
  props: {
    datosEdit: {
      type: Array,
      required: true
    }
  },

  beforeMount() {
    //DEFINE COLUMNAS DE LA TABLA
    this.defaultdatos = datos2520.datosDefault;
    this.$store.commit("MUTSETDATOSDEFAULT", this.defaultdatos);
  },
 
  created() {
       // SI HAY PROMPT
         
            eventBus.$on("datosprompt", (rowselectionprompt, indicadorPrompt) => {
              this.rowselectionprompt = rowselectionprompt;
              this.indicadorPrompt = indicadorPrompt;
            });  
       
      //AQUI VA EL BUS PARA PROCEDIMIENTOS ALMACENADOS 
    
    eventBus.$on("cargaRegistro", dinamicKey => {
      //busca el registro para editarlo 
      if (dinamicKey[1].valor == "0")
         this.buscarRegistro(this.defaultdatos[0]);
      else 
      this.buscarRegistro(dinamicKey);
    });
  },
  beforeDestroy: function() {
    //Crea un bus  OYENTE
    // SI HAY PROMPT
    eventBus.$off("datosprompt");  
    eventBus.$off("datosprompt");
    
    eventBus.$off("cargaRegistro");
  },

  
  watch: { 
    // SI HAY PROMPT
    
             "rowselectionprompt": function() { 
                if (this.indicadorPrompt == 1) {
                                 
      this.COD_CATEGORIAPATNER = this.rowselectionprompt.COD_CATEGORIAPATNER;
      this.DI_VALOR = this.rowselectionprompt.VALOR_COMISIONPATNER;
  }
                                                 if (this.indicadorPrompt == 2) {
                                 
      this.COD_CIA = this.rowselectionprompt.COD_CIA;
      this.DI_CIA = this.rowselectionprompt.NOM_CIA;
  }
                                                 if (this.indicadorPrompt == 3) {
                                 
      this.COD_PERSONA = this.rowselectionprompt.COD_PERSONA;
      this.DI_NOMBRE = this.rowselectionprompt.NOM_PERSONA;
  }
                                                 if (this.indicadorPrompt == 4) {
                                 
      this.DI_DIRECCION = this.rowselectionprompt.DES_DIRECCION;
  }
                                 
  },   
    ///XXXXXXXXX 
    
   lastDbmsgCode:function(){
    if(this.lastDbmsgCode!=0){
      this.$vs.notify({
                title: "Servicio Restfull",
                time: 6000,
                text: this.lastDbmsg,
                color: "warning"
            });
    }
  },
  /*
    currentRecord: function() {
      if (this.currentRecord.LLAVEREGISTRO > 0)
        this.cargaRegistroActual(this.currentRecord);
    },*/
  
  },
  data() {
    return {
    
    
        messageError: "Sin Errores",
        respuestaProc: [],
         
        
      // CMS CMS CMS CMS          DatOS cms Para manejo de EXPEDIENTE DIGITAL  MULTIMEDIA Debe venir en una funcion de Datos con la consulta
        // CMSDATA2520: datos2520.CMSDATA2520,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,
       
      ///////////////// FECHAS FECHAS
      configdateTimePicker: {
        locale: Spanish
      },
      configFechaHoraPicker2:divilib.FechaHoraformat,
      configHoraPicker2:divilib.Horaformat,
      valorAutocomplete: "",
      // CAMPOS DE LISTA  SI LOS HAHAY
       LI_TIPOPATNER :datos2520.LI_TIPOPATNER,LI_ESTADO :datos2520.LI_ESTADO,
      //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT
      
            COD_CATEGORIAPATNER:"0",
     COD_CIA:0,
     COD_PERSONA:0,
     NOM_NEGOCIO:"0",
     COD_DIRECCION:0,
     NUM_TELEFONO1:0,
     NUM_TEFEFONO2:0,
     TIP_PATNER:"0",
     NUM_CALIFICACION:0,
     IMG_AVATAR:0,
     HASH_AVATAR:"0",
     NUM_CONTRATO:0,
     HASH_CONTRATO:"0",
     IND_ESTADO:"0",
     DI_CIA:null,
     DI_VALOR:null,
     DI_DIRECCION:null,
     DI_NOMBRE:null,
    //Datos  Iniciales  
      actualizo: false,
      iniciado: false,
      defaultdatos: [],
        // SI No hay lista de Valores puede quitarse
      indicadorPrompt: 0, 
      rowselectionprompt: [],
      datosPrompt: [{ titulo: "" }],
      
      //Formulario 
      counterDanger: false,
      origenUrl: "J",  
      activaPrompt: false, 
      //scrollbar
      settings: {
        maxScrollbarLength: 60
      },
      
      parametros: [],
      locallastheader: "", //guarda el ultimo header de este objeto
      locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
      locallaststrFilas: "", //guarda el ultimo filas de este objeto
      paramtxt: "",
      filastxt: "",
      header: ""
    };
  },

  computed: {
    ...mapState(["dsoaModel", "rowsForm", "DataCMS", "tableKey", "urlOrigen"]),
    getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },

    currentRecord() {
      return this.$store.state.rowsForm[0];
    },
    CMSDataRespuesta() {
      return this.$store.state.DataCMS;
    },
    getAction: {
      get() {
        return this.getindicadorDML == "U"
          ? "Editando Registro 2"
          : "Insertando Registro";
      }
    },
    getindicadorDML() {
      return this.datosEdit[0].indicadorDML;
    },

    lastDbmsg() {
      return this.$store.state.lastBdmsage;
    },
    procesando() {
      return this.$store.state.estadoProcesando;
    },
    lastDbmsgCode() {
      return this.$store.state.lastBdmsgcode;
    },
    estadoProcesando() {
      return this.$store.state.estadoProcesando;
    }
  },

  methods: {
    // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT
    // SI HAY PROMPT
          // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2512() {  //GO_COMISIONPATNER
      var filtros2512 = [  
        { nombre: "nombre", valor:""},];

      this.$parent.cargaPrompt2512(filtros2512);
    }, 
           // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2500() {  //GO_COMPANIA
      var filtros2500 = [  
        { nombre: "nombre", valor:""},];

      this.$parent.cargaPrompt2500(filtros2500);
    }, 
           // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2511() {  //GO_PERSONAS
      var filtros2511 = [  
        { nombre: "COD_CIA", valor:this.COD_CIA },];

      this.$parent.cargaPrompt2511(filtros2511);
    }, 
           // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2509() {  //GO_DIRECCIONES
      var filtros2509 = [  
        { nombre: "nombre", valor:""},];

      this.$parent.cargaPrompt2509(filtros2509);
    }, 
     
      
    // FIN DE PROMPT  xxxxxxxxx

    // FIN DE  METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT

    regresa() {
      this.$parent.activaEdit = false;
    },
     
    //FORMULARIO
    
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },
    validateStep2() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-2").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },

 validateStep3() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-3").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    }, 
    // FIN DE VALIDA PASOS ESTO SI ES UN FORMULARIO DE PASOS 
    
     addFilas: function() {
            var filas = [];
 
      filas.push({
        NOMBRE: "COD_CATEGORIAPATNER",
        VALOR1: this.COD_CATEGORIAPATNER,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_CIA",
        VALOR1: this.COD_CIA,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_PERSONA",
        VALOR1: this.COD_PERSONA,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NOM_NEGOCIO",
        VALOR1: this.NOM_NEGOCIO,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "COD_DIRECCION",
        VALOR1: this.COD_DIRECCION,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TELEFONO1",
        VALOR1: this.NUM_TELEFONO1,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TEFEFONO2",
        VALOR1: this.NUM_TEFEFONO2,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "TIP_PATNER",
        VALOR1: this.TIP_PATNER,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_CALIFICACION",
        VALOR1: this.NUM_CALIFICACION,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IMG_AVATAR",
        VALOR1: this.IMG_AVATAR,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "HASH_AVATAR",
        VALOR1: this.HASH_AVATAR,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_CONTRATO",
        VALOR1: this.NUM_CONTRATO,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "HASH_CONTRATO",
        VALOR1: this.HASH_CONTRATO,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "IND_ESTADO",
        VALOR1: this.IND_ESTADO,
        VALOR2: "",
        CDATA: "0"
      }); 
      this.filastxt = divilib.filaArraytoStrintg(filas, "S");
    },


    //TRAE DATOS PARA MOSTRAR EN FORMULARIO
    
    formSubmitted: function() {
      this.GuardaRegistro();
      },
    GuardaRegistro: function() {
      //HEADER
      var header = {
        MODO: this.getindicadorDML,
        OBJECTID: "2520",
        CREDENCIAL: this.getProfile.Credencial,
        USERNAME: this.getProfile.Username,
        REGISTROSXPAGINA: "200",
        PAGINA: "1" 
      };
      this.headertxt = divilib.GetHeaderString(header);

      // agrego las filas
      this.addFilas();
      this.paramtxt = " <Param><ParamItem/></Param>";
      // cargo la peticion texto
      var petTxt = {
        header: this.headertxt,
        parametros: this.paramtxt,
        filas: this.filastxt
      };

      this.$store.commit("MUTSETURL", "O"); //indUrl
      this.$store.commit("MUTSETPETICIONTXT", petTxt);

      var pedido = {
        dml: this.getindicadorDML,
        Credencial: this.getProfile.Credencial,
         ObjectId:"2520",
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "3", // CRUD
        origenUrl: this.origenUrl
      };

      //cambia a acDsoaPrueba // acDsoa
      this.$store.dispatch("acDsoa", pedido);

      this.$parent.activaEdit = false;
    }, // fin de  metodo

    // CARGA DE una variable Bd a DOM
     cargaRegistroActual: function(datosRow) { 
          this.COD_CATEGORIAPATNER = datosRow.COD_CATEGORIAPATNER;
          this.COD_CIA = datosRow.COD_CIA;
          this.COD_PERSONA = datosRow.COD_PERSONA;
          this.NOM_NEGOCIO = datosRow.NOM_NEGOCIO;
          this.COD_DIRECCION = datosRow.COD_DIRECCION;
          this.NUM_TELEFONO1 = datosRow.NUM_TELEFONO1;
          this.NUM_TEFEFONO2 = datosRow.NUM_TEFEFONO2;
          this.TIP_PATNER = datosRow.TIP_PATNER;
          this.NUM_CALIFICACION = datosRow.NUM_CALIFICACION;
          this.IMG_AVATAR = datosRow.IMG_AVATAR;
          this.HASH_AVATAR = datosRow.HASH_AVATAR;
          this.NUM_CONTRATO = datosRow.NUM_CONTRATO;
          this.HASH_CONTRATO = datosRow.HASH_CONTRATO;
          this.IND_ESTADO = datosRow.IND_ESTADO;
          this.DI_CIA = datosRow.DI_CIA;
          this.DI_VALOR = datosRow.DI_VALOR;
          this.DI_DIRECCION = datosRow.DI_DIRECCION;
          this.DI_NOMBRE = datosRow.DI_NOMBRE;

         if (this.REFERENCIA_FOTO>0)
         {
            this.CMSDATA = atob(datosRow.CMSDATA);
             this.CMSDATA = JSON.parse(this.CMSDATA);

            //carga el Avatar
            this.cargaAvatar();
           }
    },
   //cargaRegistroActual funcion completa   
      
    /// busca dato para el edit
    buscarRegistro: function(dinamicKey) {
    
      var header = {
        MODO: "JJ",
        OBJECTID: "2520",
        CREDENCIAL: this.getProfile.Credencial,
        USERNAME: this.getProfile.Username,
        REGISTROSXPAGINA: "200",
        PAGINA: "1",
        ORDERBY: ""
      };
      this.headertxt = divilib.GetHeaderString(header);

      var origenUrl = "O";
       // agrego las filas
         var filas = datos2520.getMisFilas();
         this.filastxt = divilib.filaArraytoStrintg(filas, "N");
    
      
      var parametros = [];
      var parametro1 = {
        NOMBRE: "",
        OPERADOR: "=",
        VALOR1: "",
        VALOR2: "",
        CDATA: "0"
      };

      dinamicKey.forEach(function callback(item) {
        if (item.valor.length > 0) {
          parametro1 = {
            NOMBRE: item.nombre,
            OPERADOR: "=",
            VALOR1: item.valor,
            VALOR2: "",
            CDATA: "0"
          };
          parametros.push(parametro1);
        }
      });

      //entrega arreglo de parametros recibe texto de parametros
      this.paramtxt = divilib.paramArraytoStrintg(parametros);

      // cargo la peticion texto
      //bien
      var petTxt = {
        header: this.headertxt,
        parametros: this.paramtxt,
        filas: this.filastxt
      };
      this.$store.commit("MUTSETURL", "O");
      this.$store.commit("MUTSETPETICIONTXT", petTxt);
      var pedido = {
        dml: "JJ", //SJ
        Credencial: this.getProfile.Credencial,
         ObjectId:"2520",
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "2", //select
        origenUrl: origenUrl
      };

      //cambia a acDsoaPrueba // acDsoa

      this.$store.dispatch("acDsoa", pedido);

      this.datosJson = {
        indicadorDML: "U",
        locallaststrParametros: this.locallaststrParametros
      };
      this.$parent.indicadorDML = "U";
      this.$parent.activaEdit = true; // enciende los datos de Edicion
    },
 
    //// METODOS DE CMS SOLO SI LLEVA DOCUMENTOS EL MANTENIMIENTO 
   // SI HAY UN DOCUMENTO MULTIMEDIA EN LA LISTA  
      
    
     
    
  } // fin de  methods
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 80%;
    max-width: 90vw;
  }
}
</style>
