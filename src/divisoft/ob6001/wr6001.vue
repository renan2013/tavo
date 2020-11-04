<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->

<template>
<div id="avatar-6001">
    <grid6001 v-show="!activaEdit"></grid6001>

    <Edit6001 v-show="activaEdit && !activaPromp" :key2="editKey" :datosEdit="datosEdit" :modollamado="$route.params.tipo" @closeSidebar="activaEdit = false" />

    <promptDivi v-show="activaPromp" :key="promptKey" :datosPrompt="datosPrompt" @closeSidebar="activaPromp = false" />

</div>
</template>

<script>
import {
    mapState
} from "vuex"; //, mapMutations, mapActions
import grid6001 from "./grid6001.vue"
import Edit6001 from "./Edit6001.vue"

import promptDivi from "@/divisoft/promptDivisoft.vue";

import {
    eventBus
} from "@/main"; // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos6001 from "./js/divi6001.js";
export default {
    components: {
        grid6001,
        Edit6001,
        filtrosDivisoft,
        promptDivi
    },

    data() {

        return {
            //APP

            promptKey: 1,
            editKey: 1,
            activaPromp: false,

            //SI HAY PROCEDIMIENTOS ALMACENDAOS

            //DATOS PROMPT  BASE  
            datosPrompt: [{
                titulo: "",
                ObjectId: 1,
                idprompt: 1,
                columnDefs: [{
                    headerName: "Etiqueta",
                    field: "NOMBRE",
                    filter: true,
                    width: 300,
                    checkboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    headerCheckboxSelection: true,
                    pinned: "left" // lo pone a la izquierda como pivot
                }],
                filas: [{
                    NOMBRE: ""
                }],
                datos: [{
                    nombre: "NA",
                    valor: "-1"
                }]
            }],

            indicadorDML: "U",
            activaEdit: false,
            filtros: datos6001.filtros,

            locallastheader: "", //guarda el ultimo header de este objeto
            locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
            locallaststrFilas: "", //guarda el ultimo filas de este objeto
            autor: "Ademar Diaz"
        };
    },

    // antes de  inciar la pagina  cargalas  Filas que lleva que es una constante 

    computed: {
        ...mapState(["dsoaModel", "datosJ", "datosV", "selectedRow", "rows", "datosGridPhp", "datosGrid", "tableKey", "urlOrigen",
            "laststrheader", "laststrParametros", "laststrFilas"
        ]),

        datosEdit: {
            get() {
                //return this.$store.state.datosGridPhp.rows;
                return [{
                    datosRow: [],
                    indicadorDML: this.indicadorDML
                }]; //llena la tabla con los datos obtenidos
            },

        },

        lastDbmsg() {
            return this.$store.state.lastBdmsage;
        },
        lastBdmsgcode() {
            return this.$store.state.lastBdmsgcode;
        },
    },
    methods: {
        incrementaEkey() {
            this.editKey++;
        },

        cargaPrompt6005(filtrosParam6005) {
            var filas = [];
            filas.push({
                NOMBRE: "CODIGO_PAIS",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });
            filas.push({
                NOMBRE: "NOMBRE",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });

            this.datosPrompt = [];
            this.datosPrompt = [{
                titulo: "ERP_PAISES",
                ObjectId: 6005,
                idprompt: 1,
                filas: [],
                datos: []
            }];

            this.datosPrompt[0].datos = filtrosParam6005;
            this.datosPrompt[0].filas = filas;

            var columnDefs = [{
                    headerName: "Codigo Pais",
                    field: "CODIGO_PAIS",
                    filter: true,
                    width: 200
                },
                {
                    headerName: "Nombre Pais",
                    field: "NOMBRE",
                    filter: true,
                    width: 300,
                    checkboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    headerCheckboxSelection: true,
                    lockPosition: true,
                    pinned: "left" // lo pone a la izquierda como pivot
                },
            ]

            this.datosPrompt[0].columnDefs = columnDefs;

            //console.log("padre cargaPrompt6005,",filtrosParam6005);
            this.promptKey++;
            this.editKey++;
            this.activaPromp = true;

        },

        cargaPrompt6004(filtrosParam6004) {
            var filas = [];
            filas.push({
                NOMBRE: "CODIGO_PAIS",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });
            filas.push({
                NOMBRE: "PROVINCIA",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });
            filas.push({
                NOMBRE: "CANTON",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });
            filas.push({
                NOMBRE: "DISTRITO",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });
            filas.push({
                NOMBRE: "NOMBRE",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });

            this.datosPrompt = [];
            this.datosPrompt = [{
                titulo: "ERP_DISTRITOS",
                ObjectId: 6004,
                idprompt: 2,
                filas: [],
                datos: []
            }];

            this.datosPrompt[0].datos = filtrosParam6004;
            this.datosPrompt[0].filas = filas;

            var columnDefs = [{
                    headerName: "Cod Pais",
                    field: "CODIGO_PAIS",
                    filter: true,
                    width: 200
                },
                {
                    headerName: "Cod Provincia",
                    field: "PROVINCIA",
                    filter: true,
                    width: 200
                },
                {
                    headerName: "Cod Canton",
                    field: "CANTON",
                    filter: true,
                    width: 200
                },
                {
                    headerName: "Cod Distrito",
                    field: "DISTRITO",
                    filter: true,
                    width: 200
                },
                {
                    headerName: "Nombre Distrito",
                    field: "NOMBRE",
                    filter: true,
                    width: 300,
                    checkboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    headerCheckboxSelection: true,
                    lockPosition: true,
                    pinned: "left" // lo pone a la izquierda como pivot
                },
            ]

            this.datosPrompt[0].columnDefs = columnDefs;
            //console.log("padre cargaPrompt6004,",filtrosParam6004);
            this.promptKey++;
            this.editKey++;
            this.activaPromp = true;

        },

    }
}; // fin de Metodos 
</script>
