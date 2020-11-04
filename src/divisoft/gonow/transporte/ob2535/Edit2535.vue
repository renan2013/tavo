
<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
    SECCION HTML DEL COMPONENTE EDIT 
========================================================================================== -->
<template>
<vx-card>
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
                
                                 <div class="vx-col md:w-1/2 w-full">
                                 <p>Cod Chofer</p>
                                <vs-input size="large" name="COD_CHOFER" v-model="COD_CHOFER" class="mt-5 w-full" />
                                <span class="text-danger">{{errors.first("step-1.COD_CHOFER")}}</span>
                              </div> 
                   <div class="vx-col w-full">
                               <vx-input-group class="mb-base">
                               
                                <template slot="prepend">
                                  <vs-input
                                    :value="COD_CATEGORIA_TAXI"
                                    v-model="COD_CATEGORIA_TAXI"
                                    name="COD_CATEGORIA_TAXI"
                                    label="Código Categoria Taxi"
                                     v-on:change="onchangePromp2515"
                                    
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2515"
                                    >IR</vs-button
                                  >
                                  <span class="text-success"></span>
                                  <span class="text-info"><br/>{{TIP_COMISIONTAXI}}</span>

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
                                    label="Cod Cia"
                                     v-on:change="onchangePromp2511"
                                    
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2511"
                                    >IR</vs-button
                                  >
                                  <span class="text-success"></span>
                                  <span class="text-info"><br/>{{NOM_PERSONA}}</span>

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
                                    label="Cod Cia"
                                     v-on:change="onchangePromp2511"
                                    
                                  />
                                  
                                  <vs-button
                                    color="primary"
                                    type="border"
                                    @click="setActivaPromp2511"
                                    >IR</vs-button
                                  >
                                  <span class="text-success"></span>
                                  <span class="text-info"><br/>{{NOM_PERSONA}}</span>

                                </template>
                              </vx-input-group>
                              </div> <div class="vx-col md:w-1/2 w-full">  
                                                     <vs-switch color="success"  v-model="IND_ESTADO"><span slot="1">Activo</span><span slot="2">Inactivo</span>
                                                    </vs-switch> 
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
               <div class="vx-col w-1/2">
      <p>Cod Zona</p>
        <vs-input size="large" v-validate="'required'"    name="COD_ZONA" v-model="COD_ZONA" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-2.COD_ZONA")}}</span>
      </div><div class="vx-col w-1/2">
        <vs-input size="large"    label="Tipo Chofer" name="TIPO_CHOFER" v-model="TIPO_CHOFER" class="mt-5 w-full" /> 
      </div>
                                                      <div class="vx-col md:w-1/2 w-full">
                                                      <p>Longitud</p>
                                                <vs-input size="large"   name="LONGITUD" v-model="LONGITUD" class="mt-5 w-full" />
                                                
                                              </div>
                                                      <div class="vx-col md:w-1/2 w-full">
                                                      <p>Latitud</p>
                                                <vs-input size="large"   name="LATITUD" v-model="LATITUD" class="mt-5 w-full" />
                                                
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
              <div class="vx-col w-1/2">
        <vs-input size="large"    label="Num Placa" name="NUM_PLACA" v-model="NUM_PLACA" class="mt-5 w-full" /> 
      </div><div class="vx-col w-1/2">
        <vs-input size="large"    label="Des Marca" name="DES_MARCA" v-model="DES_MARCA" class="mt-5 w-full" /> 
      </div><div class="vx-col w-1/2">
        <vs-input size="large"    label="Des Modelo" name="DES_MODELO" v-model="DES_MODELO" class="mt-5 w-full" /> 
      </div> 
                                 <div class="vx-col md:w-1/2 w-full">
                                 <p>Num Anno</p>
                                <vs-input size="large"   name="NUM_ANNO" v-model="NUM_ANNO" class="mt-5 w-full" />
                
                              </div>  
                                        <div class="vx-col md:w-1/3 w-full mt-2">
                                        
                  <span class="text-danger">Img Avatar</span>
                  <downloadDefault v-show="IMG_AVATAR  > 0" />
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
                    <span class="ml-2 text-base text-primary">{{ IMG_AVATAR  }}</span>
                  </div>
                </div>
                            
                                     
                                 <div class="vx-col md:w-1/2 w-full">
                                 <p>Num Contrato</p>
                                <vs-input size="large"   name="NUM_CONTRATO" v-model="NUM_CONTRATO" class="mt-5 w-full" />
                
                              </div>   
          </div>
           </form>
      </tab-content>
  </form-wizard>
  </vx-card>
</template>

 
<script>  


  import { mapState } from "vuex"; //, mapMutations, mapActions 
import { eventBus } from "@/main"; // para que se hablen los componentes  
 
 
  // SI ES POR PASOS  
  
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
 


// mensajes de error personalizados
import { Validator } from "vee-validate";
import * as datos2535 from "./js/divi2535.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"; 

// NO USAR SI NO HAY FECHAS
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
// FIN IMPORT POR FECHAS  
  
     //  CMS IMPORT PARA CARGAR Y VER ARCHIVOS
import UploadDefault from "@/divisoft/uploadFile/UploadDefault.vue";

import downloadDefault from "@/divisoft/downloadFile/dowloadImage.vue";
 
 
const dict = datos2535.mensajesValidacion;
// registra los mensajes personalizados
Validator.localize("en", dict); 

export default {
    
  name: "Autocomplete",
   components: {
 
      FormWizard,
    TabContent,
     
    flatPickr,
   
    Prism,   
    //subir una imagen
    UploadDefault,
     downloadDefault
  },
  props: {
    datosEdit: {
      type: Array,
      required: true
    },
    modollamado: {
      type: String,
      required: true
    },
  },

  beforeMount() {
    //DEFINE COLUMNAS DE LA TABLA
    this.defaultdatos = datos2535.datosDefault;
    this.$store.commit("MUTSETDATOSDEFAULT", this.defaultdatos);
  },
 
  created() {
  
    // DESTRUYE EL CARADOR DE  DOCUMENTOS
            eventBus.$off("cargaDoc");  
            
       // SI HAY PROMPT
         
            eventBus.$on("datosprompt", (rowselectionprompt, indicadorPrompt) => {
              this.rowselectionprompt = rowselectionprompt;
              this.indicadorPrompt = indicadorPrompt;
            });  
       
      //AQUI VA EL BUS PARA PROCEDIMIENTOS ALMACENADOS 
    
    eventBus.$on("cargaRegistro", dinamicKey => {
      //busca el registro para editarlo 
      if (dinamicKey[0].valor == "0")
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
                                 
      this.COD_CATEGORIA_TAXI = this.rowselectionprompt.COD_CATEGORIA_TAXI;
      this.TIP_COMISIONTAXI = this.rowselectionprompt.TIP_COMISIONTAXI;
  }                                   
                                                 if (this.indicadorPrompt == 2) {
                                 
      this.COD_CIA = this.rowselectionprompt.COD_CIA;
      this.NOM_PERSONA = this.rowselectionprompt.NOM_PERSONA;
  }                                   
                                                 if (this.indicadorPrompt == 3) {
                                 
      this.COD_CIA = this.rowselectionprompt.COD_CIA;
      this.NOM_PERSONA = this.rowselectionprompt.NOM_PERSONA;
  }                                   
                                 
  },   

"DataRequestGenerico": function() { 
    if (this.ultimoObjeto==2515) 
                                                    this.TIP_COMISIONTAXI=this.DataRequestGenerico[0].TIP_COMISIONTAXI;

    if (this.ultimoObjeto==2511) 
                                                    this.NOM_PERSONA=this.DataRequestGenerico[0].NOM_PERSONA;

    if (this.ultimoObjeto==2511) 
                                                    this.NOM_PERSONA=this.DataRequestGenerico[0].NOM_PERSONA;

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
  
    currentRecord: function() {
      if (this.currentRecord.COD_CHOFER > "0")
        this.cargaRegistroActual(this.currentRecord);
    }, 
  
  },
  data() {
    return {
    
    
        messageError: "Sin Errores",
        respuestaProc: [],
         ultimoObjeto:0,
         
        
      // CMS CMS CMS CMS          DatOS cms Para manejo de EXPEDIENTE DIGITAL  MULTIMEDIA Debe venir en una funcion de Datos con la consulta
       CMSDATA2535: datos2535.CMSDATA2535,
      PROPSDataCMS: divilib.DataCMS,
      tituloAvatar: "Para Cambiar Avatar",
      verDocumento1: false,
      activaUpload: false, 
               // CMSDATA2535: datos2535.CMSDATA2535,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,
       
      ///////////////// FECHAS FECHAS
      configdateTimePicker: {
        locale: Spanish
      },
      configFechaHoraPicker2:divilib.FechaHoraformat,
      configHoraPicker2:divilib.Horaformat,
      valorAutocomplete: "",
      // CAMPOS DE LISTA  SI LOS HAHAY
       
      //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT
      
            COD_CHOFER:0,
     COD_CATEGORIA_TAXI:0,
     COD_PERSONA:0,
     COD_CIA:0,
     COD_ZONA:"0",
     TIPO_CHOFER:"0",
     LONGITUD:0,
     LATITUD:0,
     NUM_CALIFICACION:0,
     NUM_PLACA:"0",
     DES_MARCA:"0",
     DES_MODELO:"0",
     NUM_ANNO:0,
     IMG_AVATAR:0,
     HASH_AVATAR:"0",
     NUM_CONTRATO:0,
     HASH_CONTRATO:"0",
     IND_ESTADO:"0",
     TIP_COMISIONTAXI:null,
     NOM_PERSONA:null,
     NOM_PERSONA:null,
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
    
       // cuando es un gerico 
        DataRequestGenerico() {
            return this.$store.state.selectQuery;
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
  
    // PARA LLAMAR UNA RUTA EXTERNA CON UN FORMULARIO
    llamaRutaVue(routename) {
              this.$router.push(routename) 
           // this.$parent.activaEditSimple = false;
        },
         
    // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT
    // SI HAY PROMPT
          // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2515() {  //GO_COMISIONTAXI
      var filtros2515 = [  
        { nombre: "nombre", valor:""},];

      this.$parent.cargaPrompt2515(filtros2515);
    }, 
           // METODO onchangePromp
    onchangePromp2515() {  //GO_COMISIONTAXI
     let filtros = [  
                                                              
                                                                  { nombre: "COD_CATEGORIA_TAXI", valor:this.COD_CATEGORIA_TAXI }, 
                                                             ];
                                                             
                                                            this.ultimoObjeto=2515;
                                                            this.buscarGenerico(2515,filtros ,"TIP_COMISIONTAXI","");
                                                            
                                                        },      // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2511() {  //GO_PERSONAS
      var filtros2511 = [  
        { nombre: "COD_PERSONA", valor:this.COD_PERSONA },];

      this.$parent.cargaPrompt2511(filtros2511);
    }, 
           // METODO onchangePromp
    onchangePromp2511() {  //GO_PERSONAS
     let filtros = [  
                                                              
                                                                  { nombre: "COD_PERSONA", valor:this.COD_PERSONA },  
                                                              
                                                                  { nombre: "COD_CIA", valor:this.COD_CIA }, 
                                                             ];
                                                             
                                                            this.ultimoObjeto=2511;
                                                            this.buscarGenerico(2511,filtros ,"NOM_PERSONA","");
                                                            
                                                        },      // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
    setActivaPromp2511() {  //GO_PERSONAS
      var filtros2511 = [  
        { nombre: "COD_PERSONA", valor:this.COD_PERSONA },];

      this.$parent.cargaPrompt2511(filtros2511);
    }, 
           // METODO onchangePromp
    onchangePromp2511() {  //GO_PERSONAS
     let filtros = [  
                                                              
                                                                  { nombre: "COD_PERSONA", valor:this.COD_PERSONA },  
                                                              
                                                                  { nombre: "COD_CIA", valor:this.COD_CIA }, 
                                                             ];
                                                             
                                                            this.ultimoObjeto=2511;
                                                            this.buscarGenerico(2511,filtros ,"NOM_PERSONA","");
                                                            
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
                                    NOMBRE: "COD_CHOFER",
                                    VALOR1: this.COD_CHOFER,
                                    VALOR2: "9999999999",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "COD_CATEGORIA_TAXI",
                                    VALOR1: this.COD_CATEGORIA_TAXI,
                                    VALOR2: "9",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "COD_PERSONA",
                                    VALOR1: this.COD_PERSONA,
                                    VALOR2: "99999999",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "COD_CIA",
                                    VALOR1: this.COD_CIA,
                                    VALOR2: "999",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "COD_ZONA",
                                    VALOR1: this.COD_ZONA,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "TIPO_CHOFER",
                                    VALOR1: this.TIPO_CHOFER,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "LONGITUD",
                                    VALOR1: this.LONGITUD,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "LATITUD",
                                    VALOR1: this.LATITUD,
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
                                    NOMBRE: "NUM_PLACA",
                                    VALOR1: this.NUM_PLACA,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "DES_MARCA",
                                    VALOR1: this.DES_MARCA,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "DES_MODELO",
                                    VALOR1: this.DES_MODELO,
                                    VALOR2: "",
                                    CDATA: "0"
                                  }); 
                                  filas.push({
                                    NOMBRE: "NUM_ANNO",
                                    VALOR1: this.NUM_ANNO,
                                    VALOR2: "9999",
                                    CDATA: "0"
                                  }); 
                                 if (this.CMSDataRespuesta.Referencia>0)
                                        filas.push({
                                          NOMBRE: "IMG_AVATAR",
                                        VALOR1: this.CMSDataRespuesta.Referencia , 
                                        VALOR2: "",
                                        CDATA: "0"
                                        });
                                        else
                                        
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
                                    VALOR2: "999999999999",
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
        OBJECTID: "2535",
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
         ObjectId:"2535",
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
          this.COD_CHOFER = datosRow.COD_CHOFER;
          this.COD_CATEGORIA_TAXI = datosRow.COD_CATEGORIA_TAXI;
          this.COD_PERSONA = datosRow.COD_PERSONA;
          this.COD_CIA = datosRow.COD_CIA;
          this.COD_ZONA = datosRow.COD_ZONA;
          this.TIPO_CHOFER = datosRow.TIPO_CHOFER;
          this.LONGITUD = datosRow.LONGITUD;
          this.LATITUD = datosRow.LATITUD;
          this.NUM_CALIFICACION = datosRow.NUM_CALIFICACION;
          this.NUM_PLACA = datosRow.NUM_PLACA;
          this.DES_MARCA = datosRow.DES_MARCA;
          this.DES_MODELO = datosRow.DES_MODELO;
          this.NUM_ANNO = datosRow.NUM_ANNO;
          this.IMG_AVATAR = datosRow.IMG_AVATAR;
          this.HASH_AVATAR = datosRow.HASH_AVATAR;
          this.NUM_CONTRATO = datosRow.NUM_CONTRATO;
          this.HASH_CONTRATO = datosRow.HASH_CONTRATO;
          this.IND_ESTADO = datosRow.IND_ESTADO;
          this.TIP_COMISIONTAXI = datosRow.TIP_COMISIONTAXI;
          this.NOM_PERSONA = datosRow.NOM_PERSONA;
          this.NOM_PERSONA = datosRow.NOM_PERSONA;

         if (this.IMG_AVATAR>0)
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
        OBJECTID: "2535",
        CREDENCIAL: this.getProfile.Credencial,
        USERNAME: this.getProfile.Username,
        REGISTROSXPAGINA: "200",
        PAGINA: "1",
        ORDERBY: ""
      };
      this.headertxt = divilib.GetHeaderString(header);

      var origenUrl = "O";
       // agrego las filas
         var filas = datos2535.getMisFilas();
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
         ObjectId:"2535",
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
    
    ///////////////////////// CODIGO GENERICO PARA BUSQUEDAS RAPIDAS  ///////////////////////////    
      buscarGenerico: function (objectID,dinamicKey,nombreFila,FormatoFila) {
        // METODO GENERICO  PARA PROMPTS Y OTROS 
            var pedido = {
                    dml: "JJ", //SJ
                    Credencial: this.getProfile.Credencial,
                    ObjectId: objectID,
                    formatoenvio: "N",
                    formatorecibe: "N",
                    indicador: "8", //select
                    origenUrl: this.origenUrl,
                    FilaRecupera:nombreFila, 
                    FormatoFila:FormatoFila,
                    parametros:dinamicKey
                }  
              this.$store.dispatch("acQueryGenerico", pedido) 
         },

 
    //// METODOS DE CMS SOLO SI LLEVA DOCUMENTOS EL MANTENIMIENTO 
   // SI HAY UN DOCUMENTO MULTIMEDIA EN LA LISTA  
     cargaAvatar() {
      let respuestaCMS = [
        {
          Referencia: this.IMG_AVATAR,
          LlaveExterna: this.CMSDATA[0].LlaveExterna,
          NumNivel: this.CMSDATA[0].NumNivel,
          NumDoc: this.CMSDATA[0].NumDoc
        }
      ];

      eventBus.$emit("cargaDoc", respuestaCMS);
     // console.log("LO QUE VA ENVIAR ", respuestaCMS);
    },  // FIN DE CARGAR UN DOCUMENTO

                uploadAvatar() {
                  this.activaUpload = true;

                  let respuestaCMS = [
                    {
                      Referencia: 0,  
                      LlaveExterna: this.CMSDATA[0].LlaveExterna,
                      NumNivel: this.CMSDATA[0].NumNivel,
                      NumDoc: this.CMSDATA[0].NumDoc
                    }
                  ];

                  eventBus.$emit("cargaDocUpload", respuestaCMS);
              },  
    
     
    
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
