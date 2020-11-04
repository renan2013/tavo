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
        <tab-content title="FORMULARIO GRUPO1" class="mb-5" icon="feather icon-user" :before-change="validateStep1">
            <form data-vv-scope="step-1">
                <!-- tab 1 content -->
                <div class="vx-row">

                    <div class="vx-col w-full">
                        <vx-input-group class="mb-base">

                            <template slot="prepend">
                                <vs-input :value="COD_PATNER" v-model="COD_PATNER" name="COD_PATNER" label="Código Patner" v-on:change="onchangePromp2520" />

                                <vs-button color="primary" type="border" @click="setActivaPromp2520">IR</vs-button>

                                <vs-input :value="DI_NEGOCIO" v-model="DI_NEGOCIO" name="DI_NEGOCIO" label="Nombre" />

                            </template>
                        </vx-input-group>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Cod Producto</p>
                        <vs-input size="large" name="COD_PRODUCTO" v-model="COD_PRODUCTO" class="mt-5 w-full" />
                        <span class="text-danger">{{errors.first("step-1.COD_PRODUCTO")}}</span>
                    </div>
                    <div class="vx-col w-full">
                        <vx-input-group class="mb-base">

                            <template slot="prepend">
                                <vs-input :value="COD_CATEGORIA" v-model="COD_CATEGORIA" name="COD_CATEGORIA" label="Código Categoría" v-on:change="onchangePromp2526" />

                                <vs-button color="primary" type="border" @click="setActivaPromp2526">IR</vs-button>

                                <vs-input :value="DI_CATEGORIA" v-model="DI_CATEGORIA" name="DI_CATEGORIA" label="Nombre" />

                            </template>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-full">
                        <vx-input-group class="mb-base">

                            <template slot="prepend">
                                <vs-input :value="COD_MARCA" v-model="COD_MARCA" name="COD_MARCA" label="Código Marca" v-on:change="onchangePromp2524" />

                                <vs-button color="primary" type="border" @click="setActivaPromp2524">IR</vs-button>

                                <vs-input :value="DI_MARCA" v-model="DI_MARCA" name="DI_MARCA" label="Nombre" />

                            </template>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-1/2">
                        <vs-input size="large" label="Cod Alterno" name="COD_ALTERNO" v-model="COD_ALTERNO" class="mt-5 w-full" />
                    </div>
                    <div class="vx-col w-1/2">
                        <vs-input size="large" label="Cod Barra" name="COD_BARRA" v-model="COD_BARRA" class="mt-5 w-full" />
                    </div>
                    <div class="vx-col w-1/2">
                        <p>Des Producto</p>
                        <vs-input size="large" v-validate="'required'" name="DES_PRODUCTO" v-model="DES_PRODUCTO" class="mt-5 w-full" />

                        <span class="text-danger">{{errors.first("step-1.DES_PRODUCTO")}}</span>
                    </div>
                    <div class="vx-col w-1/2">
                        <p>Det Producto</p>
                        <vs-input size="large" v-validate="'required'" name="DET_PRODUCTO" v-model="DET_PRODUCTO" class="mt-5 w-full" />

                        <span class="text-danger">{{errors.first("step-1.DET_PRODUCTO")}}</span>
                    </div>
                </div>
                </div>
            </form>
        </tab-content>

        <!-- tab 2 content -->

        <tab-content title="FORMULARIO GRUPO2 " class="mb-5" icon="feather icon-user" :before-change="validateStep2">
            <form data-vv-scope="step-2">
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">
                        <p>Can Existencia</p>
                        <vs-input size="large" name="CAN_EXISTENCIA" v-model="CAN_EXISTENCIA" class="mt-5 w-full" />
                        <span class="text-danger text-sm" v-show="errors.has('CAN_EXISTENCIA')">{{ errors.first('CAN_EXISTENCIA') }}</span>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Mto Neto</p>
                        <vs-input size="large" name="MTO_NETO" v-model="MTO_NETO" class="mt-5 w-full" />
                        <span class="text-danger text-sm" v-show="errors.has('MTO_NETO')">{{ errors.first('MTO_NETO') }}</span>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Mto Taxincluido</p>
                        <vs-input size="large" name="MTO_TAXINCLUIDO" v-model="MTO_TAXINCLUIDO" class="mt-5 w-full" />
                        <span class="text-danger text-sm" v-show="errors.has('MTO_TAXINCLUIDO')">{{ errors.first('MTO_TAXINCLUIDO') }}</span>
                    </div>
                    <div class="vx-col w-full">
                        <vx-input-group class="mb-base">

                            <template slot="prepend">
                                <vs-input :value="ID_TAX" v-model="ID_TAX" name="ID_TAX" label="Id Tax" v-on:change="onchangePromp2518" />

                                <vs-button color="primary" type="border" @click="setActivaPromp2518">IR</vs-button>

                                <vs-input :value="DI_TAX" v-model="DI_TAX" name="DI_TAX" label="Nombre" />

                            </template>
                        </vx-input-group>
                    </div>
                    <div class="vx-col w-1/2">
                        <p>Ind Principal</p>
                        <vs-input size="large" v-validate="'required'" name="IND_PRINCIPAL" v-model="IND_PRINCIPAL" class="mt-5 w-full" />

                        <span class="text-danger">{{errors.first("step-2.IND_PRINCIPAL")}}</span>
                    </div>
                    <div class="vx-col w-full">
                        <vx-input-group class="mb-base">

                            <template slot="prepend">
                                <vs-input :value="COD_RANGO" v-model="COD_RANGO" name="COD_RANGO" label="Código Rango" v-on:change="onchangePromp2523" />

                                <vs-button color="primary" type="border" @click="setActivaPromp2523">IR</vs-button>

                                <vs-input :value="DI_RANGO" v-model="DI_RANGO" name="DI_RANGO" label="Nombre" />

                            </template>
                        </vx-input-group>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Num Orden</p>
                        <vs-input size="large" name="NUM_ORDEN" v-model="NUM_ORDEN" class="mt-5 w-full" />
                        <span class="text-danger">{{errors.first("step-2.NUM_ORDEN")}}</span>
                    </div>
                </div>
            </form>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="FORMULARIO GRUPO3" class="mb-5" icon="feather icon-user" :before-change="validateStep3">
            <form data-vv-scope="step-3">
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">
                        <p>Kgs Peso</p>
                        <vs-input size="large" name="KGS_PESO" v-model="KGS_PESO" class="mt-5 w-full" />

                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Tam Alto</p>
                        <vs-input size="large" name="TAM_ALTO" v-model="TAM_ALTO" class="mt-5 w-full" />

                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Tam Ancho</p>
                        <vs-input size="large" name="TAM_ANCHO" v-model="TAM_ANCHO" class="mt-5 w-full" />

                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Tam Largo</p>
                        <vs-input size="large" name="TAM_LARGO" v-model="TAM_LARGO" class="mt-5 w-full" />

                    </div>
                    <div class="vx-col md:w-1/3 w-full mt-2">

                        <span class="text-danger">Img Avatar</span>
                        <downloadDefault v-show="IMG_AVATAR  > 0" />
                        <upload-default v-show="activaUpload" :isSidebarActive="activaUpload" :tituloUpload="tituloAvatar" @closeSidebar="activaUpload = false" />

                        <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="uploadAvatar">
                            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                            <span class="ml-2 text-base text-primary">{{ IMG_AVATAR  }}</span>
                        </div>
                    </div>

                    <div class="vx-col w-1/2">
                        <vs-input size="large" label="Url Referencia" name="URL_REFERENCIA" v-model="URL_REFERENCIA" class="mt-5 w-full" />
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <p>Ind Enviogratis</p>
                        <ul class="centerx">
                            <li :key="index" v-for="(item, index) in LI_ENVIOGRATIS">
                                <vs-radio v-model="IND_ENVIOGRATIS" :vs-value="item.value">{{item.text}}</vs-radio>
                            </li>
                        </ul>

                    </div>
                </div>
            </form>
        </tab-content>
    </form-wizard>
</vx-card>
</template>

<script>
  import {
      mapState
  } from "vuex"; //, mapMutations, mapActions 
  import {
      eventBus
  } from "@/main"; // para que se hablen los componentes  

  // SI ES POR PASOS  

  import {
      FormWizard,
      TabContent
  } from "vue-form-wizard";
  import "vue-form-wizard/dist/vue-form-wizard.min.css";

  // mensajes de error personalizados
  import {
      Validator
  } from "vee-validate";
  import * as datos2521 from "./js/divi2521.js";
  import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";

  // NO USAR SI NO HAY FECHAS
  import flatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.min.css";
  import {
      Spanish
  } from "flatpickr/dist/l10n/es.js";
  // FIN IMPORT POR FECHAS  

  //  CMS IMPORT PARA CARGAR Y VER ARCHIVOS
  import UploadDefault from "@/divisoft/uploadFile/UploadDefault.vue";

  import downloadDefault from "@/divisoft/downloadFile/dowloadImage.vue";

  const dict = datos2521.mensajesValidacion;
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
          this.defaultdatos = datos2521.datosDefault;
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
      beforeDestroy: function () {
          //Crea un bus  OYENTE
          // SI HAY PROMPT
          eventBus.$off("datosprompt");
          eventBus.$off("datosprompt");

          eventBus.$off("cargaRegistro");
      },

      watch: {
          // SI HAY PROMPT
          "rowselectionprompt": function () {
              if (this.indicadorPrompt == 1) {

                  this.COD_CIA = this.rowselectionprompt.COD_CIA;
                  this.ID_TAX = this.rowselectionprompt.ID_TAX;
                  this.DI_TAX = this.rowselectionprompt.NOM_TAX;
              }
              if (this.indicadorPrompt == 2) {

                  this.COD_PATNER = this.rowselectionprompt.COD_PATNER;
                  this.DI_NEGOCIO = this.rowselectionprompt.NOM_NEGOCIO;
              }
              if (this.indicadorPrompt == 3) {

                  this.COD_CATEGORIA = this.rowselectionprompt.COD_CATEGORIA;
                  this.DI_CATEGORIA = this.rowselectionprompt.DES_CATEGORIA;
              }
              if (this.indicadorPrompt == 4) {

                  this.COD_MARCA = this.rowselectionprompt.COD_MARCA;
                  this.DI_MARCA = this.rowselectionprompt.DES_MARCA;
              }
              if (this.indicadorPrompt == 5) {

                  this.COD_CIA = this.rowselectionprompt.COD_CIA;
                  this.ID_TAX = this.rowselectionprompt.ID_TAX;
                  this.DI_TAX = this.rowselectionprompt.NOM_TAX;
              }
              if (this.indicadorPrompt == 6) {

                  this.COD_RANGO = this.rowselectionprompt.COD_RANGO;
                  this.DI_RANGO = this.rowselectionprompt.DES_RANGO;
              }

          },

          "DataRequestGenerico": function () {
              alert(this.ultimoObjeto);
              if (this.ultimoObjeto == 2518) 
              this.DI_TAX = this.DataRequestGenerico[0].NOM_TAX;

              if (this.ultimoObjeto == 2520) 
              this.DI_NEGOCIO = this.DataRequestGenerico[0].NOM_NEGOCIO;

              if (this.ultimoObjeto == 2526) 
              this.DI_CATEGORIA = this.DataRequestGenerico[0].DES_CATEGORIA;

              if (this.ultimoObjeto == 2524) 
              this.DI_MARCA = this.DataRequestGenerico[0].DES_MARCA;

              if (this.ultimoObjeto == 2518) 
              this.DI_TAX = this.DataRequestGenerico[0].NOM_TAX;

              if (this.ultimoObjeto == 2523)
              this.DI_RANGO = this.DataRequestGenerico[0].DES_RANGO;

          },
          ///XXXXXXXXX 

          lastDbmsgCode: function () {
              if (this.lastDbmsgCode != 0) {
                  this.$vs.notify({
                      title: "Servicio Restfull",
                      time: 6000,
                      text: this.lastDbmsg,
                      color: "warning"
                  });
              }
          },

          currentRecord: function () {
              if (this.currentRecord.COD_PATNER > "0")
                  this.cargaRegistroActual(this.currentRecord);
          },

      },
      data() {
          return {

              messageError: "Sin Errores",
              respuestaProc: [],
              ultimoObjeto: 0,

              // CMS CMS CMS CMS          DatOS cms Para manejo de EXPEDIENTE DIGITAL  MULTIMEDIA Debe venir en una funcion de Datos con la consulta
              CMSDATA2521: datos2521.CMSDATA2521,
              PROPSDataCMS: divilib.DataCMS,
              tituloAvatar: "Para Cambiar Avatar",
              verDocumento1: false,
              activaUpload: false,
              // CMSDATA2521: datos2521.CMSDATA2521,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,

              ///////////////// FECHAS FECHAS
              configdateTimePicker: {
                  locale: Spanish
              },
              configFechaHoraPicker2: divilib.FechaHoraformat,
              configHoraPicker2: divilib.Horaformat,
              valorAutocomplete: "",
              // CAMPOS DE LISTA  SI LOS HAHAY
              LI_ENVIOGRATIS: datos2521.LI_ENVIOGRATIS,
              //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT

              COD_CIA: 0,
              COD_PATNER: 0,
              COD_PRODUCTO: 0,
              COD_CATEGORIA: 0,
              COD_MARCA: 0,
              COD_ALTERNO: "0",
              COD_BARRA: "0",
              DES_PRODUCTO: "0",
              DET_PRODUCTO: "0",
              CAN_EXISTENCIA: 0,
              MTO_NETO: 0,
              MTO_TAXINCLUIDO: 0,
              ID_TAX: 0,
              COD_RANGO: 0,
              IND_PRINCIPAL: "0",
              NUM_ORDEN: 0,
              KGS_PESO: 0,
              TAM_ALTO: 0,
              TAM_ANCHO: 0,
              TAM_LARGO: 0,
              IMG_AVATAR: 0,
              HASH_AVATAR: "0",
              URL_REFERENCIA: "0",
              IND_ENVIOGRATIS: "0",
              DI_CATEGORIA: null,
              DI_MARCA: null,
              DI_NEGOCIO: null,
              DI_RANGO: null,
              DI_TAX: null,
              DI_TAX: null,
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
                  return this.getindicadorDML == "U" ?
                      "Editando Registro 2" :
                      "Insertando Registro";
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
          setActivaPromp2518() { //GO_TAXES
              var filtros2518 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2518(filtros2518);
          },
          // METODO onchangePromp
          onchangePromp2518() { //GO_TAXES
              let filtros = [

                  {
                      nombre: "COD_CIA",
                      valor: this.COD_CIA
                  },

                  {
                      nombre: "ID_TAX",
                      valor: this.ID_TAX
                  },
              ];

              this.ultimoObjeto = 2518;
              this.buscarGenerico(2518, filtros, "NOM_TAX", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO

          setActivaPromp2520() { //GO_PATNER
              var filtros2520 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2520(filtros2520);
          },
          // METODO onchangePromp
          onchangePromp2520() { //GO_PATNER
              let filtros = [

                  {
                      nombre: "COD_PATNER",
                      valor: this.COD_PATNER
                  },
              ];

              this.ultimoObjeto = 2520;
              this.buscarGenerico(2520, filtros, "NOM_NEGOCIO", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
          setActivaPromp2526() { //GO_SHOPCATEGORIA
              var filtros2526 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2526(filtros2526);
          },
          // METODO onchangePromp
          onchangePromp2526() { //GO_SHOPCATEGORIA
              let filtros = [

                  {
                      nombre: "COD_CATEGORIA",
                      valor: this.COD_CATEGORIA
                  },
              ];

              this.ultimoObjeto = 2526;
              this.buscarGenerico(2526, filtros, "DES_CATEGORIA", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
          setActivaPromp2524() { //GO_SHOPMARCA
              var filtros2524 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2524(filtros2524);
          },
          // METODO onchangePromp
          onchangePromp2524() { //GO_SHOPMARCA
              let filtros = [

                  {
                      nombre: "COD_MARCA",
                      valor: this.COD_MARCA
                  },
              ];

              this.ultimoObjeto = 2524;
              this.buscarGenerico(2524, filtros, "DES_MARCA", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
          setActivaPromp2518() { //GO_TAXES
              var filtros2518 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2518(filtros2518);
          },
          // METODO onchangePromp
          onchangePromp2518() { //GO_TAXES
              let filtros = [

                  {
                      nombre: "COD_CIA",
                      valor: this.COD_CIA
                  },

                  {
                      nombre: "ID_TAX",
                      valor: this.ID_TAX
                  },
              ];

              this.ultimoObjeto = 2518;
              this.buscarGenerico(2518, filtros, "NOM_TAX", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
          setActivaPromp2523() { //GO_SHOPRANGOPRECIOS
              var filtros2523 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

              this.$parent.cargaPrompt2523(filtros2523);
          },
          // METODO onchangePromp
          onchangePromp2523() { //GO_SHOPRANGOPRECIOS
              let filtros = [

                  {
                      nombre: "COD_RANGO",
                      valor: this.COD_RANGO
                  },
              ];

              this.ultimoObjeto = 2523;
              this.buscarGenerico(2523, filtros, "DES_RANGO", "");

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

          addFilas: function () {
              var filas = [];

              filas.push({
                  NOMBRE: "COD_CIA",
                  VALOR1: this.COD_CIA,
                  VALOR2: "9999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_PATNER",
                  VALOR1: this.COD_PATNER,
                  VALOR2: "999999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_PRODUCTO",
                  VALOR1: this.COD_PRODUCTO,
                  VALOR2: "99999999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_CATEGORIA",
                  VALOR1: this.COD_CATEGORIA,
                  VALOR2: "999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_MARCA",
                  VALOR1: this.COD_MARCA,
                  VALOR2: "9999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_ALTERNO",
                  VALOR1: this.COD_ALTERNO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_BARRA",
                  VALOR1: this.COD_BARRA,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "DES_PRODUCTO",
                  VALOR1: this.DES_PRODUCTO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "DET_PRODUCTO",
                  VALOR1: this.DET_PRODUCTO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "CAN_EXISTENCIA",
                  VALOR1: this.CAN_EXISTENCIA,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "MTO_NETO",
                  VALOR1: this.MTO_NETO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "MTO_TAXINCLUIDO",
                  VALOR1: this.MTO_TAXINCLUIDO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "ID_TAX",
                  VALOR1: this.ID_TAX,
                  VALOR2: "99",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "COD_RANGO",
                  VALOR1: this.COD_RANGO,
                  VALOR2: "9999999999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "IND_PRINCIPAL",
                  VALOR1: this.IND_PRINCIPAL,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "NUM_ORDEN",
                  VALOR1: this.NUM_ORDEN,
                  VALOR2: "999999",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "KGS_PESO",
                  VALOR1: this.KGS_PESO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "TAM_ALTO",
                  VALOR1: this.TAM_ALTO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "TAM_ANCHO",
                  VALOR1: this.TAM_ANCHO,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "TAM_LARGO",
                  VALOR1: this.TAM_LARGO,
                  VALOR2: "",
                  CDATA: "0"
              });
              if (this.CMSDataRespuesta.Referencia > 0)
                  filas.push({
                      NOMBRE: "IMG_AVATAR",
                      VALOR1: this.CMSDataRespuesta.Referencia,
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
                  NOMBRE: "URL_REFERENCIA",
                  VALOR1: this.URL_REFERENCIA,
                  VALOR2: "",
                  CDATA: "0"
              });
              filas.push({
                  NOMBRE: "IND_ENVIOGRATIS",
                  VALOR1: this.IND_ENVIOGRATIS,
                  VALOR2: "",
                  CDATA: "0"
              });
              this.filastxt = divilib.filaArraytoStrintg(filas, "S");
          },

          //TRAE DATOS PARA MOSTRAR EN FORMULARIO

          formSubmitted: function () {
              this.GuardaRegistro();
          },
          GuardaRegistro: function () {
              //HEADER
              var header = {
                  MODO: this.getindicadorDML,
                  OBJECTID: "2521",
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
                  ObjectId: "2521",
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
          cargaRegistroActual: function (datosRow) {
              this.COD_CIA = datosRow.COD_CIA;
              this.COD_PATNER = datosRow.COD_PATNER;
              this.COD_PRODUCTO = datosRow.COD_PRODUCTO;
              this.COD_CATEGORIA = datosRow.COD_CATEGORIA;
              this.COD_MARCA = datosRow.COD_MARCA;
              this.COD_ALTERNO = datosRow.COD_ALTERNO;
              this.COD_BARRA = datosRow.COD_BARRA;
              this.DES_PRODUCTO = datosRow.DES_PRODUCTO;
              this.DET_PRODUCTO = datosRow.DET_PRODUCTO;
              this.CAN_EXISTENCIA = datosRow.CAN_EXISTENCIA;
              this.MTO_NETO = datosRow.MTO_NETO;
              this.MTO_TAXINCLUIDO = datosRow.MTO_TAXINCLUIDO;
              this.ID_TAX = datosRow.ID_TAX;
              this.COD_RANGO = datosRow.COD_RANGO;
              this.IND_PRINCIPAL = datosRow.IND_PRINCIPAL;
              this.NUM_ORDEN = datosRow.NUM_ORDEN;
              this.KGS_PESO = datosRow.KGS_PESO;
              this.TAM_ALTO = datosRow.TAM_ALTO;
              this.TAM_ANCHO = datosRow.TAM_ANCHO;
              this.TAM_LARGO = datosRow.TAM_LARGO;
              this.IMG_AVATAR = datosRow.IMG_AVATAR;
              this.HASH_AVATAR = datosRow.HASH_AVATAR;
              this.URL_REFERENCIA = datosRow.URL_REFERENCIA;
              this.IND_ENVIOGRATIS = datosRow.IND_ENVIOGRATIS;
              this.DI_CATEGORIA = datosRow.DI_CATEGORIA;
              this.DI_MARCA = datosRow.DI_MARCA;
              this.DI_NEGOCIO = datosRow.DI_NEGOCIO;
              this.DI_RANGO = datosRow.DI_RANGO;
              this.DI_TAX = datosRow.DI_TAX;
              this.DI_TAX = datosRow.DI_TAX;

              if (this.IMG_AVATAR > 0) {
                  this.CMSDATA = atob(datosRow.CMSDATA);
                  this.CMSDATA = JSON.parse(this.CMSDATA);

                  //carga el Avatar
                  this.cargaAvatar();
              }
          },
          //cargaRegistroActual funcion completa   

          /// busca dato para el edit
          buscarRegistro: function (dinamicKey) {

              var header = {
                  MODO: "JJ",
                  OBJECTID: "2521",
                  CREDENCIAL: this.getProfile.Credencial,
                  USERNAME: this.getProfile.Username,
                  REGISTROSXPAGINA: "200",
                  PAGINA: "1",
                  ORDERBY: ""
              };
              this.headertxt = divilib.GetHeaderString(header);

              var origenUrl = "O";
              // agrego las filas
              var filas = datos2521.getMisFilas();
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
                  ObjectId: "2521",
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
          cargaAvatar() {
              let respuestaCMS = [{
                  Referencia: this.IMG_AVATAR,
                  LlaveExterna: this.CMSDATA[0].LlaveExterna,
                  NumNivel: this.CMSDATA[0].NumNivel,
                  NumDoc: this.CMSDATA[0].NumDoc
              }];

              eventBus.$emit("cargaDoc", respuestaCMS);
              // console.log("LO QUE VA ENVIAR ", respuestaCMS);
          }, // FIN DE CARGAR UN DOCUMENTO

          uploadAvatar() {
              this.activaUpload = true;

              let respuestaCMS = [{
                  Referencia: 0,
                  LlaveExterna: this.CMSDATA[0].LlaveExterna,
                  NumNivel: this.CMSDATA[0].NumNivel,
                  NumDoc: this.CMSDATA[0].NumDoc
              }];

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
