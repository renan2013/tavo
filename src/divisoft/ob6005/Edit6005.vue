<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
     SECCION HTML DEL COMPONENTE EDIT 
========================================================================================== -->

<template>
<vx-card :title="getAction" code-toggler>
    <div>
        <h1>Mantenimiento de Registros</h1>
    </div>
    <!-- TITULO DEL ENCABEZADO -->
    <div class="mt-6 flex items-center justify-between px-6">
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6">
        <vx-input-group class="mb-base">
            <div class="vx-row">

                <div class="vx-col md:w-1/2 w-full">

                    <BaseString tipo="S" v-validate="'required'" v-model="CODIGO_PAIS" label="Codigo Pais" data-vv-name="CODIGO_PAIS" data-vv-scope="step-1" />
                    <span class="text-danger">{{errors.first("step-1.CODIGO_PAIS")}}</span>
                </div>

                <div class="vx-col md:w-1/2 w-full">

                    <BaseString tipo="S" v-validate="'required'" v-model="NOMBRE" label="Nombre" data-vv-name="NOMBRE" data-vv-scope="step-1" />
                    <span class="text-danger">{{errors.first("step-1.NOMBRE")}}</span>
                </div>

                <div class="vx-col md:w-1/2 w-full">

                    <BaseString tipo="S" v-validate="'required'" v-model="NACIONALIDAD" label="Nacionalidad" data-vv-name="NACIONALIDAD" data-vv-scope="step-1" />
                    <span class="text-danger">{{errors.first("step-1.NACIONALIDAD")}}</span>
                </div>

                <div class="vx-col md:w-1/2 w-full">

                    <BaseN tipo="C" v-model="COD_MONEDA" label="Cod Moneda" thousandSeparator="," separator="." precision=0 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="COD_MONEDA" />
                    <span class="text-danger">{{errors.first("step-1.COD_MONEDA")}}</span>

                </div>

                <div class="vx-col md:w-1/2 w-full">

                    <BaseString tipo="S" v-model="CODIGO_INTERNACIONAL" label="Codigo Internacional" data-vv-name="CODIGO_INTERNACIONAL" />
                    <span class="text-danger">{{errors.first("step-1.CODIGO_INTERNACIONAL")}}</span>
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
  import {
      mapState
  } from "vuex"; //, mapMutations, mapActions 
  import {
      eventBus
  } from "@/main"; // para que se hablen los componentes  

  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  // mensajes de error personalizados
  import {
      Validator
  } from "vee-validate";
  import * as datos6005 from "./js/divi6005.js";
  import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";

  import BaseString from "@/divisoft/inputComponent/BaseString.vue";
  import BaseListas from "@/divisoft/inputComponent/BaseListas.vue";
  import BaseDate from "@/divisoft/inputComponent/BaseDate.vue";
  import BaseN from "@/divisoft/inputComponent/BaseinputDecimal.vue";

  const dict = datos6005.mensajesValidacion;
  // registra los mensajes personalizados
  Validator.localize("en", dict);

  export default {

      name: "Autocomplete",
      components: {

          VuePerfectScrollbar,

          Prism,
          BaseString,
          BaseListas,
          BaseDate,
          BaseN
      },
      props: {
          datosEdit: {
              type: Array,
              required: true
          },
          modollamado: {
              type: String
          },
      },

      beforeMount() {
            
          //DEFINE COLUMNAS DE LA TABLA
          this.defaultdatos = datos6005.datosDefault;
          this.$store.commit("MUTSETDATOSDEFAULT", this.defaultdatos);
      },

      created() {

          // DESTRUYE EL CARADOR DE  DOCUMENTOS
          eventBus.$off("cargaDoc");

          // SI HAY PROMPT

          //AQUI VA EL BUS PARA PROCEDIMIENTOS ALMACENADOS 

          eventBus.$on("cargaRegistro", dinamicKey => {
              //busca el registro para editarlo 
              this.indicadorDML = "U";
              if (dinamicKey[0].valor == "0") {
                  this.indicadorDML = "I";
                  this.buscarRegistro(this.defaultdatos[0]);
              } else
                  this.buscarRegistro(dinamicKey);
          });
      },
      beforeDestroy: function () {
          //Crea un bus  OYENTE
          // SI HAY PROMPT

          eventBus.$off("datosprompt");

          eventBus.$off("cargaRegistro");
      },

      data() {
          return {

              activaAlmacenado: false,
              messageError: "Sin Errores",
              respuestaProc: [],
              ultimoObjeto: 0,
              indicadorDML: "I",

              // CMS CMS CMS CMS          DatOS cms Para manejo de EXPEDIENTE DIGITAL  MULTIMEDIA Debe venir en una funcion de Datos con la consulta
              // CMSDATA6005: datos6005.CMSDATA6005,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,

              configFechaHoraPicker2: divilib.FechaHoraformat,
              configHoraPicker2: divilib.Horaformat,
              valorAutocomplete: "",
              // CAMPOS DE LISTA  SI LOS HAHAY

              //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT

              CODIGO_PAIS: 0,
              NOMBRE: "0",
              NACIONALIDAD: "0",
              COD_MONEDA: 0,
              CODIGO_INTERNACIONAL: "0",
              //Datos  Iniciales  
              actualizo: false,
              iniciado: false,
              defaultdatos: [],
              // SI No hay lista de Valores puede quitarse
              indicadorPrompt: 0,
              rowselectionprompt: [],
              datosPrompt: [{
                  titulo: ""
              }],

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

      watch: {
          // SI HAY PROMPT
          ///XXXXXXXXX 

          lastBdmsgcode: function () {
              if (this.lastBdmsgcode != 0) {
                  this.$vs.notify({
                      title: "Servicio Restfull",
                      time: 6000,
                      text: this.lastDbmsg,
                      color: "warning"
                  });
              }
          },

          "rowsForm": function () {
              if (this.rowsForm[0].CODIGO_PAIS > "0")
                  this.cargaRegistroActual(this.rowsForm[0]);
          },

      },

      computed: {
          ...mapState([
              "dsoaModel",
              "DataCMS",
              "rowsForm",
              "DataCMS",
              "tableKey",
              "urlOrigen",
              // "indicadorDML",
              "lastBdmsage",
              "estadoProcesando",
              "selectQuery",

          ]),
          getProfile() {
              return this.$store.state.dsoaLogin.profile[0];
          },
          CMSDataRespuesta() {
              return this.$store.state.DataCMS;
          },
          getAction: {
              get() {
                  return this.indicadorDML == "U" ?
                      "Editando Registro 2" :
                      "Insertando Registro";
              }
          },

      },

      methods: {

          // PARA LLAMAR UNA RUTA EXTERNA CON UN FORMULARIO
          llamaRutaVue(routename) {
              this.$router.push(routename)
              // this.$parent.activaEditSimple = false;
          },

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

          //TRAE DATOS PARA MOSTRAR EN FORMULARIO

          formSubmitted: function () {
              this.$validator.validateAll().then(result => {
                  if (result)
                      this.GuardaRegistro();
                  else
                      reject("correct all values");

              })
          },

          /////////// GUARDA DATOS GUARDA DATOS  GUARDA DATOS  GUARDA DATOS   ////////////      
          GuardaRegistro: function () {
              if (this.indicadorDML == "I" || this.indicadorDML == "U" || this.indicadorDML == "D") {
                  //HEADER
                  var header = {
                      MODO: this.indicadorDML,
                      OBJECTID: "6005",
                      CREDENCIAL: this.getProfile.Credencial,
                      USERNAME: this.getProfile.Username,
                      REGISTROSXPAGINA: "1",
                      PAGINA: "1"
                  };
                  this.headertxt = divilib.GetHeaderString(header);

                  // agrego las filas(EDIT)

                  let filas = datos6005.addFilasToSave(this.$data, this.CMSDataRespuesta);

                  this.filastxt = divilib.filaArraytoStrintg(filas, "S");
                  this.filastxt = this.filastxt.replaceAll("undefined", "");

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
                      dml: this.indicadorDML,
                      Credencial: this.getProfile.Credencial,
                      ObjectId: "6005",
                      formatoenvio: "N",
                      formatorecibe: "N",
                      indicador: "3", // CRUD
                      origenUrl: this.origenUrl
                  };

                  //cambia a acDsoaPrueba // acDsoa
                  this.$store.dispatch("acDsoa", pedido);

                  this.$parent.activaEdit = false;
              } else
                  alert(" Crud No presente")
          }, // fin de  metodo

          // CARGA DE una variable Bd a DOM
          cargaRegistroActual: function (datosRow) {
              this.CODIGO_PAIS = datosRow.CODIGO_PAIS;
              this.NOMBRE = datosRow.NOMBRE;
              this.NACIONALIDAD = datosRow.NACIONALIDAD;
              this.COD_MONEDA = datosRow.COD_MONEDA;
              this.CODIGO_INTERNACIONAL = datosRow.CODIGO_INTERNACIONAL;
          }, //FIN DE CARGAREGISTROACTUAL   //cargaRegistroActual funcion completa   

          /// busca dato para el edit
          buscarRegistro: function (dinamicKey) {

              var header = {
                  MODO: "JJ",
                  OBJECTID: "6005",
                  CREDENCIAL: this.getProfile.Credencial,
                  USERNAME: this.getProfile.Username,
                  REGISTROSXPAGINA: "200",
                  PAGINA: "1",
                  ORDERBY: ""
              };
              this.headertxt = divilib.GetHeaderString(header);

              var origenUrl = "O";
              // agrego las filas
              var filas = datos6005.getMisFilas();
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
                  ObjectId: "6005",
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
          buscarGenerico: function (objectID, dinamicKey, nombreFila, FormatoFila) {
              // METODO GENERICO  PARA PROMPTS Y OTROS 
              var pedido = {
                  dml: "JJ", //SJ
                  Credencial: this.getProfile.Credencial,
                  ObjectId: objectID,
                  formatoenvio: "N",
                  formatorecibe: "N",
                  indicador: "8", //select
                  origenUrl: this.origenUrl,
                  FilaRecupera: nombreFila,
                  FormatoFila: FormatoFila,
                  parametros: dinamicKey
              }
              this.$store.dispatch("acQueryGenerico", pedido)
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
