<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
    SECCION HTML DEL COMPONENTE EDIT 
========================================================================================== -->

<template>
<vx-card>

     
    <p6005 v-show="activaP6005"   :isSidebarActive="activaP6005"   @closeSidebar="activaP6005 = false" /> 
    
    <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit" @on-complete="formSubmitted">
        <tab-content title="FORMULARIO GRUPO1" class="mb-5" icon="feather icon-user" :before-change="validateStep1">
            <form data-vv-scope="step-1">
                <!-- tab 1 content -->
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseString tipo="S" v-validate="'required'" v-model="COD_COMPANIA" label="Cod Compania" data-vv-name="COD_COMPANIA" data-vv-scope="step-1" />
                        <span class="text-danger">{{errors.first("step-1.COD_COMPANIA")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-validate="'required'" v-model="COD_CLIENTE" label="Cod Cliente" thousandSeparator="," separator="." precision=0 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="COD_CLIENTE" data-vv-scope="step-1" />
                        <span class="text-danger">{{errors.first("step-1.COD_CLIENTE")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="NOM_CLIENTE" label="Nom Cliente" label-placeholder="Nom Cliente" data-vv-name="NOM_CLIENTE" />
                        <span class="text-danger">{{errors.first("step-1.NOM_CLIENTE")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseListas label="Ind Estado" tipo="R" v-model="IND_ESTADO" name="IND_ESTADO" label-name="Ind Estado" :jsonlista="LISTA_ESTADO" />
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseString tipo="S" v-model="COD_CLASIFICACION" label="Cod Clasificacion" data-vv-name="COD_CLASIFICACION" />
                        <span class="text-danger">{{errors.first("step-1.COD_CLASIFICACION")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseString tipo="S" v-validate="'required'" v-model="TIP_IDENTIFICACION" label="Tip Identificacion" data-vv-name="TIP_IDENTIFICACION" />
                        <span class="text-danger">{{errors.first("step-1.TIP_IDENTIFICACION")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseString tipo="S" v-validate="'required'" v-model="NUM_IDENTIFICACION" label="Num Identificacion" data-vv-name="NUM_IDENTIFICACION" />
                        <span class="text-danger">{{errors.first("step-1.NUM_IDENTIFICACION")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseDate tipo="N" v-model="FEC_INGRESO" label="Fec Ingreso" data-vv-name="FEC_INGRESO" />
                        <span class="text-danger">{{errors.first("step-1.FEC_INGRESO")}}</span>
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <div class="centerx">

                            <vs-switch color="success" v-model="IND_TIPOSEXO" label="Ind Tiposexo"><span slot="1">Hombre</span><span slot="2">Mujer2</span>
                            </vs-switch>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseListas label="Ind Estadocivil" tipo="R" v-model="IND_ESTADOCIVIL" name="IND_ESTADOCIVIL" label-name="Ind Estadocivil" :jsonlista="LIST_ESTADOCIVIL" />
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseDate tipo="H" v-model="FEC_NACIMIENTO" label="Fec Nacimiento" data-vv-name="FEC_NACIMIENTO" />
                        <span class="text-danger">{{errors.first("step-1.FEC_NACIMIENTO")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-model="POR_DESCLI" label="Por Descli" thousandSeparator="," separator="." precision=2 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="POR_DESCLI" />
                        <span class="text-danger">{{errors.first("step-1.POR_DESCLI")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-model="NUM_DOCUMENTO" label="Num Documento" thousandSeparator="," separator="." precision=0 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="NUM_DOCUMENTO" />
                        <span class="text-danger">{{errors.first("step-1.NUM_DOCUMENTO")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseDate tipo="N" v-validate="'required'" v-model="FEC_INCLUSION" label="Fec Inclusion" data-vv-name="FEC_INCLUSION" />
                        <span class="text-danger">{{errors.first("step-1.FEC_INCLUSION")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <template>
                            <!--  para llamar a ruta de  Formulario vue -->
                            <vs-button v-show="activaAlmacenado" color="success" type="filled" @click="llamaRutaVue('/admin/empresa')">
                                Mantenimientos de Clientes</vs-button>
                        </template>
                    </div>

                </div>
            </form>
        </tab-content>

        <!-- tab 2 content -->

        <tab-content title="FORMULARIO GRUPO2 " class="mb-5" icon="feather icon-user" :before-change="validateStep2">
            <form data-vv-scope="step-2">
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-model="NUM_TELEFONO" label="Num Telefono" thousandSeparator="," separator="." precision=0 emptyValue=0 min=0 max=9007199254740991 data-vv-name="NUM_TELEFONO" />
                        <span class="text-danger">{{errors.first("step-2.NUM_TELEFONO")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseString tipo="S" v-model="DES_OBSERVACIONES" label="Des Observaciones" data-vv-name="DES_OBSERVACIONES" />
                        <span class="text-danger">{{errors.first("step-2.DES_OBSERVACIONES")}}</span>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full" v-model="NUM_CELULAR" label="Num Celular" label-placeholder="Num Celular" icon-pack="feather" icon="icon-smartphone" icon-no-border data-vv-name="NUM_CELULAR" />
                        <span class="text-danger">{{errors.first("step-2.NUM_CELULAR")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <div class="input-group">

                            <label>Codigo Pais</label><br>
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control" v-model="COD_PAIS" name="COD_PAIS" v-on:change="onchangePromp6005">

                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="setActivaPromp6005">IR</button>
                                </div>
                            </div>
                            <span class="form-control">{{DI_PAIS}}</span> <br>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <BaseListas label="Cod Provincia" tipo="R" v-model="COD_PROVINCIA" name="COD_PROVINCIA" label-name="Cod Provincia" :jsonlista="DATAPROVINCIA" />
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-model="COD_CANTON" label="Cod Canton" thousandSeparator="," separator="." precision=0 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="COD_CANTON" />
                        <span class="text-danger">{{errors.first("step-2.COD_CANTON")}}</span>

                    </div>

                    <div class="vx-col md:w-1/2 w-full">
                        <div class="input-group">

                            <label>Cod Distrito</label><br>
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control" v-model="COD_DISTRITO" name="COD_DISTRITO" v-on:change="onchangePromp6004">

                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="setActivaPromp6004">IR</button>
                                </div>
                            </div>
                            <span class="form-control">{{DI_DISTRITO}}</span> <br>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseN tipo="C" v-model="COD_CASERIO" label="Cod Caserio" thousandSeparator="," separator="." precision=0 emptyValue=0 min=-9007199254740991 max=9007199254740991 data-vv-name="COD_CASERIO" />
                        <span class="text-danger">{{errors.first("step-2.COD_CASERIO")}}</span>

                    </div>

                </div>
            </form>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="FORMULARIO GRUPO3" class="mb-5" icon="feather icon-user" :before-change="validateStep3">
            <form data-vv-scope="step-3">
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full">

                        <vs-textarea v-model="COMENTARIO" label="Comentario" data-vv-name="COMENTARIO" />
                        <span class="text-danger">{{errors.first("step-3.COMENTARIO")}}</span>
                    </div>

                    <div class="vx-col md:w-1/3 w-full mt-2">
                        <span class="text-danger">Referencia Foto</span>
                        <downloadDefault v-show="REFERENCIA_FOTO> 0" />
                        <upload-default v-show="activaUpload" :isSidebarActive="activaUpload" :tituloUpload="tituloAvatar" @closeSidebar="activaUpload = false" />
                        <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="uploadAvatar">
                            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                            <span class="ml-2 text-base text-primary">{{ REFERENCIA_FOTO}}</span>
                        </div>
                    </div>

                    <div class="vx-col md:w-1/2 w-full">

                        <BaseString tipo="S" v-model="HASH_DOC" label="Hash Doc" data-vv-name="HASH_DOC" />
                        <span class="text-danger">{{errors.first("step-3.HASH_DOC")}}</span>
                    </div>

                    <!--  Seccion Html para  agregar llamado a Procedimiento almacenado   6007 -->
                    <div class="vx-col md:w-1/3 w-full mt-2">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <vs-button color="primary" type="border" @click="callProc6007">Crea Registro2</vs-button>
                                    </td>
                                    <td>
                                        <proceSP v-show="activaAlmacenado" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- FIN DE PROCEDIMIENTO ALMACENADO  REPLACECODIGOOBJECT  -->
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
  import * as datos6001 from "./js/divi6001.js";
  import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
  import proceSP from "@/divisoft/storeProcDivisoft.vue";

  //  CMS IMPORT PARA CARGAR Y VER ARCHIVOS
  import UploadDefault from "@/divisoft/uploadFile/UploadDefault.vue";
  import downloadDefault from "@/divisoft/downloadFile/downloadDefault.vue";

  import BaseString from "@/divisoft/inputComponent/BaseString.vue";
  import BaseListas from "@/divisoft/inputComponent/BaseListas.vue";
  import BaseDate from "@/divisoft/inputComponent/BaseDate.vue";
  import BaseN from "@/divisoft/inputComponent/BaseinputDecimal.vue";

  // prompts 
  import p6005 from "@/divisoft/ob6005/Prompt6005.vue";

  const dict = datos6001.mensajesValidacion;
  // registra los mensajes personalizados
  Validator.localize("en", dict);

  export default {

      name: "Autocomplete",
      components: {

          FormWizard,
          TabContent,
          proceSP,

          Prism,
          //subir una imagen
          UploadDefault,
          downloadDefault,
          BaseString,
          BaseListas,
          BaseDate,
          BaseN,
          p6005
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
          this.defaultdatos = datos6001.datosDefault;
          this.$store.commit("MUTSETDATOSDEFAULT", this.defaultdatos);
      },

      created() {

          // DESTRUYE EL CARADOR DE  DOCUMENTOS
          eventBus.$off("cargaDoc");

          // SI HAY PROMPT

          eventBus.$on("datosprompt", (rowselectionprompt, indicadorPrompt) => {
            //  alert("respondio")
              console.log("llego",rowselectionprompt )
              this.rowselectionprompt = rowselectionprompt;
              this.indicadorPrompt = indicadorPrompt;
          });

          //PROCE ALMACENADO      
          // bus que recoge la respuesta de un procedimiento almacenado Trae eL Objeto
          eventBus.$on("datosProcedure", (respuestaProc, objectoId) => {

              let error = 0;
              let mensaje = "Proceso Exitoso";

              if (objectoId == "6007") {
                  respuestaProc.forEach(function callback(item) {
                      if (item.nombre == "GV_ERROR" && item.valor.length > 1) {
                          mensaje = item.valor;
                          error = 1;
                      }

                      if (item.nombre == "GN_ERROR" && item.valor.length > 1) {
                          mensaje = item.valor;
                          error = 1;
                      }
                  }); //Fin de  lectura de respuesta de Procedimieno
              }
              this.messageError = mensaje + "  " + objectoId;

              if (error == 0)
                  this.$vs.notify({
                      title: "Informe de Procedimiento Almacenado",
                      time: 6000,
                      text: "Proceso Exitoso",
                      color: "success"
                  });
              if (error == 1)
                  this.$vs.notify({
                      title: "Informe de Procedimiento Almacenado",
                      time: 6000,
                      text: this.messageError,
                      color: "warning"
                  });
              //   

          });

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
          eventBus.$off("datosprompt");

          eventBus.$off("cargaRegistro");
      },

      data() {
          return {
              activaP6005: false,
              activaAlmacenado: false,
              messageError: "Sin Errores",
              respuestaProc: [],
              ultimoObjeto: 0,
              indicadorDML: "I",

              // CMS CMS CMS CMS          DatOS cms Para manejo de EXPEDIENTE DIGITAL  MULTIMEDIA Debe venir en una funcion de Datos con la consulta
              CMSDATA6001: datos6001.CMSDATA6001,
              PROPSDataCMS: divilib.DataCMS,
              tituloAvatar: "Para Cambiar Avatar",
              verDocumento1: false,
              activaUpload: false,
              // CMSDATA6001: datos6001.CMSDATA6001,  PROPSDataCMS: divilib.DataCMS,  tituloAvatar: "Para Cambiar Avatar",  verDocumento1: false,

              configFechaHoraPicker2: divilib.FechaHoraformat,
              configHoraPicker2: divilib.Horaformat,
              valorAutocomplete: "",
              // CAMPOS DE LISTA  SI LOS HAHAY
              //IND_ESTADO
              LISTA_ESTADO: datos6001.LISTA_ESTADO, //IND_ESTADOCIVIL
              LIST_ESTADOCIVIL: datos6001.LIST_ESTADOCIVIL, //COD_PROVINCIA
              DATAPROVINCIA: datos6001.DATAPROVINCIA,
              //////////////// CAMPOS DEL MANTENIMIENTO  LLAMAR A UN DEFAULT

              COD_COMPANIA: "0",
              COD_CLIENTE: 0,
              NOM_CLIENTE: "0",
              IND_ESTADO: "0",
              COD_CLASIFICACION: "0",
              TIP_IDENTIFICACION: "0",
              NUM_IDENTIFICACION: "0",
              DIR_EMAIL: "0",
              NUM_TELEFONO: 0,
              FEC_INGRESO: "0",
              DES_OBSERVACIONES: "0",
              IND_TIPOSEXO: "0",
              IND_ESTADOCIVIL: "0",
              FEC_NACIMIENTO: "0",
              POR_DESCLI: 0,
              NUM_CELULAR: 0,
              NUM_DOCUMENTO: 0,
              FEC_INCLUSION: "0",
              COD_PAIS: 0,
              COD_PROVINCIA: 0,
              COD_CANTON: 0,
              COD_DISTRITO: 0,
              COD_CASERIO: 0,
              COMENTARIO: "0",
              REFERENCIA_FOTO: 0,
              HASH_DOC: "0",
              DI_PAIS: null,
              DI_DISTRITO: null,
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
          "rowselectionprompt": function () {
              if (this.indicadorPrompt ==6005) {

                  this.COD_PAIS = this.rowselectionprompt.CODIGO_PAIS;
                  this.DI_PAIS = this.rowselectionprompt.NOMBRE;
              }
              if (this.indicadorPrompt == 2) {

                  this.COD_DISTRITO = this.rowselectionprompt.DISTRITO;
                  this.DI_DISTRITO = this.rowselectionprompt.NOMBRE;
              }

          },

          "selectQuery": function () {
              if (this.ultimoObjeto == 6005)
                  this.DI_PAIS = this.selectQuery[0].NOMBRE;

              if (this.ultimoObjeto == 6004)
                  this.DI_DISTRITO = this.selectQuery[0].NOMBRE;

          },
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
              if (this.rowsForm[0].COD_COMPANIA > "0")
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
          // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO

          setActivaPromp6005() { //ERP_PAISES
              this.activaP6005 = true;
              var filtros6005 = [{
                  nombre: "nombre",
                  valor: ""
              }, ];

             this.activaP6005=true;

              //this.$parent.cargaPrompt6005(filtros6005);
          },
          // METODO onchangePromp
          onchangePromp6005() { //ERP_PAISES
              let filtros = [

                  {
                      nombre: "CODIGO_PAIS",
                      valor: this.COD_PAIS
                  },
              ];

              this.ultimoObjeto = 6005;
              this.buscarGenerico(6005, filtros, "NOMBRE", "");

          }, // METODO QUE CARGA LOS DATOS DEL FILTRO PARA LOS PROMPT  CARGA LOS DATOS DE FILTRO
          setActivaPromp6004() { //ERP_DISTRITOS
              var filtros6004 = [{
                      nombre: "CODIGO_PAIS",
                      valor: this.COD_PAIS
                  },
                  {
                      nombre: "PROVINCIA",
                      valor: this.COD_PROVINCIA
                  },
                  {
                      nombre: "CANTON",
                      valor: this.COD_CANTON
                  },
              ];

              this.$parent.cargaPrompt6004(filtros6004);
          },
          // METODO onchangePromp
          onchangePromp6004() { //ERP_DISTRITOS
              let filtros = [

                  {
                      nombre: "CODIGO_PAIS",
                      valor: this.COD_PAIS
                  },

                  {
                      nombre: "PROVINCIA",
                      valor: this.COD_PROVINCIA
                  },

                  {
                      nombre: "CANTON",
                      valor: this.COD_CANTON
                  },

                  {
                      nombre: "DISTRITO",
                      valor: this.COD_DISTRITO
                  },
              ];

              this.ultimoObjeto = 6004;
              this.buscarGenerico(6004, filtros, "NOMBRE", "");

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

          //TRAE DATOS PARA MOSTRAR EN FORMULARIO

          formSubmitted: function () {
              this.GuardaRegistro();
          },
          /////////// GUARDA DATOS GUARDA DATOS  GUARDA DATOS  GUARDA DATOS   ////////////      
          GuardaRegistro: function () {
              if (this.indicadorDML == "I" || this.indicadorDML == "U" || this.indicadorDML == "D") {
                  //HEADER
                  var header = {
                      MODO: this.indicadorDML,
                      OBJECTID: "6001",
                      CREDENCIAL: this.getProfile.Credencial,
                      USERNAME: this.getProfile.Username,
                      REGISTROSXPAGINA: "1",
                      PAGINA: "1"
                  };
                  this.headertxt = divilib.GetHeaderString(header);

                  // agrego las filas(EDIT)

                  let filas = datos6001.addFilasToSave(this.$data, this.CMSDataRespuesta);

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
                      ObjectId: "6001",
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
              this.COD_COMPANIA = datosRow.COD_COMPANIA;
              this.COD_CLIENTE = datosRow.COD_CLIENTE;
              this.NOM_CLIENTE = datosRow.NOM_CLIENTE;
              this.IND_ESTADO = datosRow.IND_ESTADO;
              this.COD_CLASIFICACION = datosRow.COD_CLASIFICACION;
              this.TIP_IDENTIFICACION = datosRow.TIP_IDENTIFICACION;
              this.NUM_IDENTIFICACION = datosRow.NUM_IDENTIFICACION;
              this.DIR_EMAIL = datosRow.DIR_EMAIL;
              this.NUM_TELEFONO = datosRow.NUM_TELEFONO;
              this.FEC_INGRESO = datosRow.FEC_INGRESO;
              this.DES_OBSERVACIONES = datosRow.DES_OBSERVACIONES;
              this.IND_TIPOSEXO = datosRow.IND_TIPOSEXO;
              this.IND_ESTADOCIVIL = datosRow.IND_ESTADOCIVIL;
              this.FEC_NACIMIENTO = datosRow.FEC_NACIMIENTO;
              this.POR_DESCLI = datosRow.POR_DESCLI;
              this.NUM_CELULAR = datosRow.NUM_CELULAR;
              this.NUM_DOCUMENTO = datosRow.NUM_DOCUMENTO;
              this.FEC_INCLUSION = datosRow.FEC_INCLUSION;
              this.COD_PAIS = datosRow.COD_PAIS;
              this.COD_PROVINCIA = datosRow.COD_PROVINCIA;
              this.COD_CANTON = datosRow.COD_CANTON;
              this.COD_DISTRITO = datosRow.COD_DISTRITO;
              this.COD_CASERIO = datosRow.COD_CASERIO;
              this.COMENTARIO = datosRow.COMENTARIO;
              this.REFERENCIA_FOTO = datosRow.REFERENCIA_FOTO;
              this.HASH_DOC = datosRow.HASH_DOC;
              this.DI_PAIS = datosRow.DI_PAIS;
              this.DI_DISTRITO = datosRow.DI_DISTRITO;

              if (datosRow.CMSDATA.length > 0) {
                  this.CMSDATA = atob(datosRow.CMSDATA);
                  this.CMSDATA = JSON.parse(this.CMSDATA);

                  if (this.REFERENCIA_FOTO > 0) {
                      //carga el Avatar
                      this.cargaAvatar();
                  } else {
                      this.PROPSDataCMS[0].LlaveExterna = this.CMSDATA[0].LlaveExterna
                      this.PROPSDataCMS[0].NumNivel = this.CMSDATA[0].NumNivel
                      this.PROPSDataCMS[0].NumDoc = this.CMSDATA[0].NumDoc
                      this.PROPSDataCMS[0].Credencial = this.getProfile.Credencial;

                      this.PROPSDataCMS[0].CodigoPeticion = 14;
                      this.PROPSDataCMS[0].GuardaArchivo = "B";
                      // CARGA BASICO
                      console.log("mutando MUTSETDATA", this.PROPSDataCMS)
                      this.$store.commit("MUTSETDATA", this.PROPSDataCMS);
                  }
              }

          },
          //cargaRegistroActual funcion completa   

          /// busca dato para el edit
          buscarRegistro: function (dinamicKey) {

              var header = {
                  MODO: "JJ",
                  OBJECTID: "6001",
                  CREDENCIAL: this.getProfile.Credencial,
                  USERNAME: this.getProfile.Username,
                  REGISTROSXPAGINA: "200",
                  PAGINA: "1",
                  ORDERBY: ""
              };
              this.headertxt = divilib.GetHeaderString(header);

              var origenUrl = "O";
              // agrego las filas
              var filas = datos6001.getMisFilas();
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
                  ObjectId: "6001",
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
                  Referencia: this.REFERENCIA_FOTO,
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

          //// VA AL FINAL EN LA SECCION DE   METODOS 
          // llama si hay procedimientos almacenados  CODIGO QUE SE GENERA PARA VIVIR INTERNAMENTE PEGADO EN OTRO FORMULARIO
          callProc6007() { //declara VARIABLE  activaProcOBJCODE

              let camposProce6007 = {
                  Credencial: this.getProfile.Credencial,
                  ObjectId: "6007",
                  Username: this.getProfile.Username,

                  interfase: "M",

                  camposProce: [{
                      "NOMBRE_CAMPO": "Gvcodcompania",
                      "NOMBRE_INTERNO": "GV_COD_COMPANIA",
                      "VALOR": this.COD_COMPANIA,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gncodcliente",
                      "NOMBRE_INTERNO": "GN_COD_CLIENTE",
                      "VALOR": this.COD_CLIENTE,
                      "TIPO": "2",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvnomcliente",
                      "NOMBRE_INTERNO": "GV_NOM_CLIENTE",
                      "VALOR": this.NOM_CLIENTE,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvindestado",
                      "NOMBRE_INTERNO": "GV_IND_ESTADO",
                      "VALOR": this.IND_ESTADO,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvcodclasificacion",
                      "NOMBRE_INTERNO": "GV_COD_CLASIFICACION",
                      "VALOR": this.COD_CLASIFICACION,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvtipidentificacion",
                      "NOMBRE_INTERNO": "GV_TIP_IDENTIFICACION",
                      "VALOR": this.TIP_IDENTIFICACION,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvnumidentificacion",
                      "NOMBRE_INTERNO": "GV_NUM_IDENTIFICACION",
                      "VALOR": this.NUM_IDENTIFICACION,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gvdiremail",
                      "NOMBRE_INTERNO": "GV_DIR_EMAIL",
                      "VALOR": this.DIR_EMAIL,
                      "TIPO": "1",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gbcomentario",
                      "NOMBRE_INTERNO": "GB_COMENTARIO",
                      "VALOR": this.COMENTARIO,
                      "TIPO": "5",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, {
                      "NOMBRE_CAMPO": "Gnnumtelefono",
                      "NOMBRE_INTERNO": "GN_NUM_TELEFONO",
                      "VALOR": this.NUM_TELEFONO,
                      "TIPO": "2",
                      "FORMATO": "",
                      "MIN": "",
                      "MAX": "",
                      "PLACEHOLDER": "",
                      "VALORES": []
                  }, ]
              };

              //this.activaProc6007=true;
              this.activaAlmacenado = true;
              eventBus.$emit("cargaStoreProcedure", camposProce6007);

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
