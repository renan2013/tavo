<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT SOA 2020
========================================================================================== -->

<template>

    <div v-if="isNinja" id="GRID6005">
        <table class="table">
            <tbody>
                <tr>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="RegistroNuevo">Agregar Registo</button>
                        {{modoFormulario}}
                    </td>
                    <td>
                        <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="activaFiltro = true">

                            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                            <span class="ml-2 text-base text-primary">Consulta Base Datos</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <filtrosDivisoft v-show="activaFiltro" :header="locallastheader" :isSidebarActive="activaFiltro" :filas="locallaststrFilas" :filtros="filtros" :ObjectID=6005 @closeSidebar="activaFiltro = false" @ajustaUltimoParam="ajustaUltimoParam" />
        <!-- TABLE ACTION ROW -->
        <div class="flex flex-wrap justify-between items-center">
            <!-- ITEMS PER PAGE / PAGINACIÓN -->
            <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ getDdatosRow.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : getDdatosRow.length }} of {{ getDdatosRow.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                            <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                            <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                            <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                            <span>100</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                            <span>150</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </div>
            <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <!--BUSCAR-->
                <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Buscar..." />
                <!--EXPORTAR EXCEL-->
                <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Exportar a Excel</vs-button>
            </div>
        </div>
        <div style="height: 100%">
            <!--COMPONENTE GRID-->
            <ag-grid-vue class="ag-theme-material w-100 my-4 ag-grid-table" :gridOptions="gridOptions" :columnDefs="columnDefs" :defaultColDef="defaultColDef" :rowData="getDdatosRow" rowSelection="single" colResizeDefault="shift" :animateRows="true" :floatingFilter="true" :pagination="true" :suppressDragLeaveHidesColumns="true" :paginationPageSize="paginationPageSize" :suppressPaginationPanel="false" @cellDoubleClicked="onDoubleClicked">
            </ag-grid-vue>
        </div>
        <pre></pre>
    </div>

</template>

<script>
// importa librerias que necesita

import {
    AgGridVue
} from "ag-grid-vue";
import {
    mapState
} from "vuex"; //, mapMutations, mapActions
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

import {
    eventBus
} from "@/main"; // para que se hablen los componentes

import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo
import * as datos6005 from "./js/divi6005.js";

export default {
    components: {
        AgGridVue,
        filtrosDivisoft
    },

    // antes de  inciar la pagina  cargalas  Filas que lleva que es una constante
    // en  divi000X.js que es un libreria que guarda constantes y puede contener funciones de apoyo al  Documento
    beforeMount() {
        this.modoFormulario = this.$route.params.tipo;

        //DEFINE COLUMNAS DE LA TABLA
        this.columnDefs = datos6005.columnDefs;
        if (this.modoFormulario == "P")
            this.columnDefs = datos6005.columnDefsPrompt;

        let defaultdatos = datos6005.datosDefault;
        this.$store.commit("MUTSETDATOSDEFAULT", defaultdatos);
    },

    // Cuando se monta la aplicacion
    mounted() {
        this.buscarDatos();
        this.gridApi = this.gridOptions.api;
        this.gridColumnApi = this.gridOptions.columnApi;
    },

    data() {
        return {
            modoFormulario: 'N',
            //APP
            activaEdit: false,
            locallastheader: "", //guarda el ultimo header de este objeto
            locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
            locallaststrFilas: "", //guarda el ultimo filas de este objeto 
            paramtxt: "",
            filastxt: "",
            header: "",
            isNinja: true,
            staticKey: [],
            // rowsForm:[],
            dinamicKey: [],

            origenUrl: "J",
            dml: "I",

            //BUSCAR
            searchQuery: "",
            activaFiltro: false,
            //DATA GRID
            gridOptions: {},
            maxPageNumbers: 100,
            gridApi: null,
            exp: null,
            columnDefs: null,

            defaultColDef: {
                sortable: true,
                resizable: true,
                editable: false, //true
                filter: true,
                suppressMenu: false
            },

            // seccion de filtros  Para llamar al  componente consulta
            filtros: datos6005.filtros
            // fin de filtros
            //////////////////////////////////////
        };
    },
    computed: {
        ...mapState([
            "datosGrid",
            "tableKey",
            "estadoProcesando",
            "lastBdmsage",
            "lastBdmsgcode"
        ]),

        paginationPageSize() {
            if (this.gridApi) return this.gridApi.paginationGetPageSize();
            else return 10;
        },
        getAutor() {
            return this.$parent.autor;
        },
        getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },

        totalPages() {
            if (this.gridApi) return this.gridApi.paginationGetTotalPages();
            else return 0;
        },

        currentPage: {
            get() {
                if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
                else return 1;
            },
            set(val) {
                this.gridApi.paginationGoToPage(val - 1);
            }
        },

        getDatos() {
            return this.$store.getters.getRows;
            //return   this.$store.state.datosJ.rows;
        },

        getDdatosRow: {
            get() {
                //return this.$store.state.datosGridPhp.rows;
                return this.$store.state.datosGrid.rows; //llena la tabla con los datos obtenidos
            }
        },
        currentRecord() {
            return this.$store.state.rowsForm[0];
        },

        getDdatosPages: {
            get() {
                return 0;
            }
        },
        lastDbmsg() {
            return this.$store.state.lastBdmsage;
        },
        lastBdmsgcode() {
            return this.$store.state.lastBdmsgcode;
        }
    },

    methods: {
        fechas() {
            var myDate = new Date();
            var ahora = myDate.valueOf();
            //console.info("antes ",ahora);
            divilib.diviTimer(5000);

            myDate = new Date();
            ahora = myDate.valueOf();
            //console.info("despues ",ahora);
        },
        reRender() {
            this.$forceUpdate();
        },

        onRowSelected() {
            let rowsSelection = this.gridOptions.api.getSelectedRows();
            //console.info("rowsSelection",rowsSelection);
        },

        onSelectionChanged(event) {
            var rowCount = event.api.getSelectedNodes().length;
            return rowCount;
        },

        ajustaUltimoParam(parametros) {
            this.locallaststrParametros = parametros;
        },

        refreshConsulta() {
            // hace una nueva consulta despues de insertar, borrar o modificar
            if (this.lastBdmsgcode != 0) this.$swal(this.lastDbmsg);

            this.$store.commit("MUTSETURL", "O");

            var petFiltro = {
                header: this.locallastheader,
                parametros: this.locallaststrParametros,
                filas: this.locallaststrFilas
            };

            this.$store.commit("MUTSETPETICIONTXT", petFiltro);

            var pedido = {
                dml: "JJ",
                Credencial: this.getProfile.Credencial,
                ObjectId: "6005",
                formatoenvio: "N",
                formatorecibe: "N",
                indicador: "1", //select
                origenUrl: this.origenUrl
            };
            //cambia a acDsoaPrueba // acDsoa
            this.$store.dispatch("acDsoa", pedido);
        },
        //PARA EDITAR
        onDoubleClicked(event) {
            //LIMPIA TABLEKEY
            if (this.modoFormulario == "P") {
                alert("carga Para PROMPT")

                    let rowsSelection = this.gridOptions.api.getSelectedRows();  
                    console.log(JSON.stringify(rowsSelection))
                   // eventBus.$emit('datosprompt',rowsSelection[0],6005   )//this.datosPrompt[0].idprompt);
                   // this.$parent.activaPromp= false;
                    this.$router.go(-1)
            } else {

                var defaultdatos = datos6005.datosDefault;
                this.$store.commit("MUTSETDATOSDEFAULT", defaultdatos);

                //LLAVES  Gen_CAMPOS_GRID(1)
                this.dinamicKey = [];
                this.dinamicKey.push({
                    nombre: "CODIGO_PAIS",
                    valor: event.node.data.CODIGO_PAIS
                });

                //llama método editar Registro

                eventBus.$emit("cargaRegistro", this.dinamicKey);

                this.$emit("incrementaEkey");
                this.$parent.activaEdit = true;
                this.dml = "U";
            }
        },

        //FUNCION BUSQUEDA EN EL INPUT DE ARRIBA
        updateSearchQuery(val) {
            this.gridApi.setQuickFilter(val);
        },
        // addFilas Gen_CAMPOS_GRID(1)
        addFilas: function () {
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
            filas.push({
                NOMBRE: "NACIONALIDAD",
                VALOR1: "",
                VALOR2: "",
                CDATA: "0"
            });

            this.filastxt = divilib.filaArraytoStrintg(filas, "N");
        },

        //LLAMA AL COMPONENTE EDIT PARA  AGREGAR UN REGISTRO NUEVO
        // RegistroNuevo Gen_CAMPOS_GRID(3)
        RegistroNuevo() {
            this.$parent.indicadorDML = "I";
            this.dinamicKey = [];
            var defaultdatos = datos6005.datosDefault;
            this.$store.commit("mutsetDatosDefault", defaultdatos);
            //LLAVES
            this.dinamicKey.push({
                nombre: "CODIGO_PAIS",
                valor: "0"
            });
            //llama método editar registro
            eventBus.$emit("cargaRegistro", this.dinamicKey);

            this.$parent.activaEdit = true; // enciende los datos de Edicion
        },

        //TRAE DATOS PARA QUE EL FORMULARIO EDIT LO CARGUE Y MODIFIQUE

        //TRAE DATOS PARA MOSTRAR en el Grid
        buscarDatos: function () {
            var origenUrl = "O";
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
            // arma la encabezado peticion
            // agrego las filas

            // RegistroNuevo Gen_CAMPOS_GRID(3)
            var parametros = [];
            //  FIN DE LLAVE FIJA

            //entrega arreglo de parametros recibe texto de parametros
            this.paramtxt = divilib.paramArraytoStrintg(parametros);
            //}
            // cargo la peticion texto
            var petTxt = {
                header: this.headertxt,
                parametros: this.paramtxt,
                filas: this.filastxt
            };

            this.$store.commit("MUTSETURL", "O");
            this.$store.commit("MUTSETPETICIONTXT", petTxt);

            var pedido = {
                dml: "JJ",
                Credencial: this.getProfile.Credencial,
                ObjectId: "6005",
                formatoenvio: "N",
                formatorecibe: "N",
                indicador: "1", //select
                origenUrl: origenUrl
            };

            //cambia a acDsoaPrueba // acDsoa
            this.$store.dispatch("acDsoa", pedido);

            //carga la ultima peticion  header parametros y addFilas
            this.locallastheader = this.headertxt;
            this.locallaststrParametros = this.paramtxt;
            this.locallaststrFilas = this.filastxt;
        }
    }
    // busq el  Registro a cargar
}; // fin de Metodos
</script>
