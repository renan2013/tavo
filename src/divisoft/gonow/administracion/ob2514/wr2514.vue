<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->

<template>
  <div id="avatar-2514">
    <grid2514 v-show="!activaEdit"></grid2514>
    <Edit2514
      v-show="activaEdit && !activaPromp"
      :key2="editKey"
      :datosEdit="datosEdit"
      @closeSidebar="activaEdit = false"
    />
  </div>
</template>
<script>
import { mapState } from "vuex"; //, mapMutations, mapActions
import grid2514 from "./grid2514.vue";
import Edit2514 from "./Edit2514.vue";

import promptDivi from "@/divisoft/promptDivisoft.vue";

import { eventBus } from "@/main"; // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo
import * as datos2514 from "./js/divi2514.js";
export default {
  components: {
    grid2514,
    Edit2514,
    filtrosDivisoft
  },

  data() {
    return {
      //APP

      promptKey: 1,
      editKey: 1,
      activaPromp: false,

      //SI HAY PROCEDIMIENTOS ALMACENDAOS

      //DATOS PROMPT  BASE

      indicadorDML: "U",
      activaEdit: false,
      filtros: datos2514.filtros,

      locallastheader: "", //guarda el ultimo header de este objeto
      locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
      locallaststrFilas: "", //guarda el ultimo filas de este objeto
      autor: "Ademar Diaz"
    };
  },

  // antes de  inciar la pagina  cargalas  Filas que lleva que es una constante

  computed: {
    ...mapState([
      "dsoaModel",
      "datosJ",
      "datosV",
      "selectedRow",
      "rows",
      "datosGridPhp",
      "datosGrid",
      "tableKey",
      "urlOrigen",
      "laststrheader",
      "laststrParametros",
      "laststrFilas"
    ]),

    datosEdit: {
      get() {
        //return this.$store.state.datosGridPhp.rows;
        return [{ datosRow: [], indicadorDML: this.indicadorDML }]; //llena la tabla con los datos obtenidos
      }
    },

    lastDbmsg() {
      return this.$store.state.lastBdmsage;
    },
    lastDbmsgCode() {
      return this.$store.state.lastBdmsgcode;
    }
  },
  methods: {
    incrementaEkey() {
      this.editKey++;
    }
  }
}; // fin de Metodos
</script>
