
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
            title="FORMULARIO GRUPO"
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
                              </div> <div class="vx-col md:w-1/2 w-full">  
                                       <ul class="centerx"  >
                                               <li  :key="index"  v-for="(item, index) in LI_TIPIDENT" >
                                                      <vs-radio v-model="ID_TIPOIDENTIFICACION" :vs-value="item.value">{{item.text}}</vs-radio>
                                               </li>
                                          </ul> 
                                        
                                      </div>    <div class="vx-col w-1/2">
        <vs-input size="large"    label="Id Identificacion" name="ID_IDENTIFICACION" v-model="ID_IDENTIFICACION" class="mt-5 w-full" /> 
      </div><div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required'"   label="Nom Persona" name="NOM_PERSONA" v-model="NOM_PERSONA" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-1.NOM_PERSONA")}}</span>
      </div><div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required'"   label="Apellido1" name="APELLIDO1" v-model="APELLIDO1" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-1.APELLIDO1")}}</span>
      </div><div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required'"   label="Apellido2" name="APELLIDO2" v-model="APELLIDO2" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-1.APELLIDO2")}}</span>
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
                <template>
                  <p>Fec Ingreso</p>

                  <flat-pickr
                    :config="configdateTimePicker"
                    v-model="FEC_INGRESO"
                    placeholder="Fec Ingreso"
                    label="Fec Ingreso"
                  />
                  </template>
                </div>           
                                          
                                          <div class="vx-col w-1/2">
        <vs-input size="large"    label="Cta Correo" name="CTA_CORREO" v-model="CTA_CORREO" class="mt-5 w-full" /> 
      </div> 
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="NUM_TELEFONO" v-model="NUM_TELEFONO" class="mt-5 w-full" />
                
                              </div> 
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                                  <vs-input
                                    :value="COD_DIRECCION"
                                    v-model="COD_DIRECCION"
                                    name="COD_DIRECCION"
                                    label="Código Dirección"
                                  />
                                  
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
                                    label="Nombre"
                                  />

                                </template>
                              </vx-input-group>
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
import * as datos2511 from "./js/divi2511.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"; 
 
// NO USAR SI NO HAY FECHAS
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
// FIN IMPORT POR FECHAS  
 
 
 
const dict = datos2511.mensajesValidacion;
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
    this.defaultdatos = datos2511.datosDefault;
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
                                 
      this.COD_CIA = this.rowselectionprompt.COD_CIA;
      this.DI_CIA = this.rowselectionprompt.NOM_CIA;
  }
                                                 if (this.indicadorPrompt == 2) {
                                 
      this.COD_DIRECCION = this.rowselectionprompt.COD_DIRECCION;
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
        // CMSDATA2511: datos2511.CMSDATA2511,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,
       
      ///////////////// FECHAS FECHAS
      configdateTimePicker: {
        locale: Spanish
      },
      configFechaHoraPicker2:divilib.FechaHoraformat,
      configHoraPicker2:divilib.Horaformat,
      valorAutocomplete: "",
      // CAMPOS DE LISTA  SI LOS HAHAY
       LI_TIPIDENT :datos2511.LI_TIPIDENT,LI_ESTADO :datos2511.LI_ESTADO,
      //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT
      
            COD_CIA:0,
     ID_TIPOIDENTIFICACION:"0",
     ID_IDENTIFICACION:"0",
     NOM_PERSONA:"0",
     APELLIDO1:"0",
     APELLIDO2:"0",
     FEC_INGRESO:"0",
     CTA_CORREO:"0",
     NUM_TELEFONO:0,
     COD_DIRECCION:0,
     IND_ESTADO:"0",
     DI_DIRECCION:null,
     DI_CIA:null,
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
    setActivaPromp2500() {  //GO_COMPANIA
      var filtros2500 = [  
        { nombre: "nombre", valor:""},];

      this.$parent.cargaPrompt2500(filtros2500);
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
        NOMBRE: "COD_CIA",
        VALOR1: this.COD_CIA,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "ID_TIPOIDENTIFICACION",
        VALOR1: this.ID_TIPOIDENTIFICACION,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "ID_IDENTIFICACION",
        VALOR1: this.ID_IDENTIFICACION,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NOM_PERSONA",
        VALOR1: this.NOM_PERSONA,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "APELLIDO1",
        VALOR1: this.APELLIDO1,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "APELLIDO2",
        VALOR1: this.APELLIDO2,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "FEC_INGRESO",
        VALOR1: this.FEC_INGRESO,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "CTA_CORREO",
        VALOR1: this.CTA_CORREO,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "NUM_TELEFONO",
        VALOR1: this.NUM_TELEFONO,
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
        OBJECTID: "2511",
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
         ObjectId:"2511",
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
          this.COD_CIA = datosRow.COD_CIA;
          this.ID_TIPOIDENTIFICACION = datosRow.ID_TIPOIDENTIFICACION;
          this.ID_IDENTIFICACION = datosRow.ID_IDENTIFICACION;
          this.NOM_PERSONA = datosRow.NOM_PERSONA;
          this.APELLIDO1 = datosRow.APELLIDO1;
          this.APELLIDO2 = datosRow.APELLIDO2;
          this.FEC_INGRESO = datosRow.FEC_INGRESO;
          this.CTA_CORREO = datosRow.CTA_CORREO;
          this.NUM_TELEFONO = datosRow.NUM_TELEFONO;
          this.COD_DIRECCION = datosRow.COD_DIRECCION;
          this.IND_ESTADO = datosRow.IND_ESTADO;
          this.DI_DIRECCION = datosRow.DI_DIRECCION;
          this.DI_CIA = datosRow.DI_CIA;

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
        OBJECTID: "2511",
        CREDENCIAL: this.getProfile.Credencial,
        USERNAME: this.getProfile.Username,
        REGISTROSXPAGINA: "200",
        PAGINA: "1",
        ORDERBY: ""
      };
      this.headertxt = divilib.GetHeaderString(header);

      var origenUrl = "O";
       // agrego las filas
         var filas = datos2511.getMisFilas();
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
         ObjectId:"2511",
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
