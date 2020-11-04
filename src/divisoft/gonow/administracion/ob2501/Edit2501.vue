
<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
     SECCION HTML DEL COMPONENTE EDIT 
========================================================================================== -->


<template>
  <vx-card :title="getAction" code-toggler>
    <div><h1>Mantenimiento de Registros</h1></div>
    <!-- TITULO DEL ENCABEZADO -->
    <div class="mt-6 flex items-center justify-between px-6">
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div> 
    <vs-divider class="mb-0"></vs-divider> 
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6"> 
        <vx-input-group class="mb-base">
            <div class="vx-row"> 
                      
                                 <div class="vx-col md:w-1/2 w-full">
                                <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" label="Must match the specified regular expression : ^([0-9]+)$ - numbers only" name="COD_ZONA" v-model="COD_ZONA" class="mt-5 w-full" />
                                <span class="text-danger">{{errors.first("step-1.COD_ZONA")}}</span>
                              </div><div class="vx-col w-1/2">
        <vs-input size="large" v-validate="'required'"   label="Des Zona" name="DES_ZONA" v-model="DES_ZONA" class="mt-5 w-full" />
         
        <span class="text-danger">{{errors.first("step-1.DES_ZONA")}}</span>
      </div> 
      <div class="vx-col md:w-1/2 w-full">  
                                       <ul class="centerx"  >
                                               <li  :key="index"  v-for="(item, index) in LI_ZONA" >
                                                      <vs-radio v-model="IND_ESTADO" :vs-value="item.value">{{item.text}}</vs-radio>
                                               </li>
                                          </ul> 
                                        
                                      </div>    
            </div> 
            <button type="submit" class="btn btn-success" @click="GuardaRegistro()">
            Salvar Datos 
            </button>
        </vx-input-group>
    </VuePerfectScrollbar>
  </vx-card>
</template> 

 
<script>  


  import { mapState } from "vuex"; //, mapMutations, mapActions 
import { eventBus } from "@/main"; // para que se hablen los componentes  

     import VuePerfectScrollbar from 'vue-perfect-scrollbar'; 


// mensajes de error personalizados
import { Validator } from "vee-validate";
import * as datos2501 from "./js/divi2501.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"; 
 
// NO USAR SI NO HAY FECHAS
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
// FIN IMPORT POR FECHAS  
 
 
 
const dict = datos2501.mensajesValidacion;
// registra los mensajes personalizados
Validator.localize("en", dict); 

export default {
    
  name: "Autocomplete",
   components: {
   
         VuePerfectScrollbar,
     
    flatPickr,
   
    Prism 
  },
  props:{
      datosEdit: {
      type: Array,
      required: true
    }
  },

  beforeMount() {
    //DEFINE COLUMNAS DE LA TABLA
    this.defaultdatos = datos2501.datosDefault;
    this.$store.commit("MUTSETDATOSDEFAULT", this.defaultdatos);
  },
 
  created() {
       // SI HAY PROMPT
          
       
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
    
    eventBus.$off("cargaRegistro");
  },

  
  watch: { 
    // SI HAY PROMPT
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
        // CMSDATA2501: datos2501.CMSDATA2501,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,
       
      ///////////////// FECHAS FECHAS
      configdateTimePicker: {
        locale: Spanish
      },
      configFechaHoraPicker2:divilib.FechaHoraformat,
      configHoraPicker2:divilib.Horaformat,
      valorAutocomplete: "",
      // CAMPOS DE LISTA  SI LOS HAHAY
       LI_ZONA :datos2501.LI_ZONA,
      //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT
      
            COD_ZONA:0,
     DES_ZONA:"0",
     IND_ESTADO:"0",
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
        NOMBRE: "COD_ZONA",
        VALOR1: this.COD_ZONA,
        VALOR2: "",
        CDATA: "0"
      }); 
      filas.push({
        NOMBRE: "DES_ZONA",
        VALOR1: this.DES_ZONA,
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
        OBJECTID: "2501",
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
         ObjectId:"2501",
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
          this.COD_ZONA = datosRow.COD_ZONA;
          this.DES_ZONA = datosRow.DES_ZONA;
          this.IND_ESTADO = datosRow.IND_ESTADO;

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
        OBJECTID: "2501",
        CREDENCIAL: this.getProfile.Credencial,
        USERNAME: this.getProfile.Username,
        REGISTROSXPAGINA: "200",
        PAGINA: "1",
        ORDERBY: ""
      };
      this.headertxt = divilib.GetHeaderString(header);

      var origenUrl = "O";
       // agrego las filas
         var filas = datos2501.getMisFilas();
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
         ObjectId:"2501",
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
 
