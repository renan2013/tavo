<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
 
<template>
<div id="data-list-list-view" class="vx-col md:w-1/2 w-full mb-base">

    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Nueva Busqueda</h4>
            {{ObjectID}}
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>
        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6">
            <div class="p-6">
                <!-- CAMPOS BUSQUEDA -->
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Campo</th>
                            <th scope="col">Operador</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="indextr" v-for="(item, indextr) in filtros">
                            <td>{{item.NOMBRE_CAMPO}}</td>
                            <td>
                                <select class="custom-select" id="inputGroupSelect01" v-model=" item.OPERADOR">
                                    <option :key="item2.TIPO" :value="item2.TIPO" :text="item2.LABEL" v-for="item2 in item.TIPO_FILTRO">{{item2.LABEL}}</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" class="form-control" placeholder="Ingrese el valor" v-model="item.VALOR" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" class="btn btn-primary" @click="ejecutaBusqueda">Buscar</button>
            </div>
        </VuePerfectScrollbar>
    </vs-sidebar>
</div>
</template>

 
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
//import { mapState } from "vuex";

export default {
    props: {
        header: {
            // header Es recibido del padre
            type: String,
            required: true
        },

        filtros: {
            // filtros por tabla  es para armar los campos que son buscadores
            type: Array,
            required: true
        },

        isSidebarActive: {
            type: Boolean,
            required: true
        },
        filas: {
            // filtros por tabla, un xml listo de las mismas filas del padre.
            type: String,
            required: true
        },
        ObjectID: {
            // filtros por tabla, un xml listo de las mismas filas del padre.
            type: Number,
            required: false
        }
    },

    data() {
        return {
            datosaqui: true,
            parametros: [],

            paramtxt: "",
            locallastheader: "", //guarda el ultimo header de este objeto
            locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
            locallaststrFilas: "" //guarda el ultimo filas de este objeto
        };
    },
    computed: {
        isSidebarActiveLocal: {
            get() {
                return this.isSidebarActive;
            },
            set(val) {
                if (!val) {
                    this.$emit("closeSidebar");
                    //this.initValues();
                }
            }
        },
        getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
    },
    methods: {
        //TRAE DATOS PARA MOSTRAR EN TABLA

        ejecutaBusqueda: function () {
            var origenUrl = "O";

            if (this.getProfile.Username == null) {
                this.$vs.notify({
                    title: "Informe de Procedimiento Almacenado",
                    time: 6000,
                    text: "Usuario No esta Identificado",
                    color: "warning"
                });
                this.$emit('closeSidebar');
            }
            if (this.getProfile.Credencial == null) {
                this.$vs.notify({
                    title: "Informe de Procedimiento Almacenado",
                    time: 6000,
                    text: "No tiene Autorizacion de Ejecucion o Credencial No presente ",
                    color: "warning"
                });
                this.$emit('closeSidebar');
                reurn;
            }

            // PREPARANDO PARAMETROS
            // recorro los  parametros y sus Valores

            //agrego los parametros
            let parametros = [];

            let parametro1 = {}; 

            //var xmlParametros = "";
            let  contador = 0;
            this.filtros.forEach(function callback(item) {
                if (item.VALOR.length > 0) {
                    parametro1 = {
                        NOMBRE: item.NOMBRE_INTERNO,
                        OPERADOR: item.OPERADOR,
                        VALOR1: item.VALOR,
                        VALOR2: "",
                        CDATA: "0"
                    };
                    parametros.push(parametro1);
                    contador++;
                }
                // tu iterador
            });
            //entrega arreglo de parametros recibe texto de parametros
            this.paramtxt = divilib.paramArraytoStrintg(parametros);
            // de add parametros
            this.$store.commit("MUTSETURL", "O");
            // carga los parametros
            var petFiltro = {
                header: this.header,
                parametros: this.paramtxt,
                filas: this.filas
            };
            this.$store.commit("MUTSETPETICIONTXT", petFiltro);

            var pedido = {
                dml: "JJ",
                Credencial: this.getProfile.Credencial,
                 ObjectId: this.ObjectID,
                formatoenvio: "N",
                formatorecibe: "N",
                indicador: "1", // CRUD
                origenUrl: origenUrl
            };
 
            //cambia a acDsoaPrueba // acDsoa
            this.$store.dispatch("acDsoa", pedido);

            this.locallastheader = this.header;
            this.locallaststrParametros = this.paramtxt;
            this.locallaststrFilas = this.filas;

            this.$emit("ajustaUltimoParam", this.paramtxt);
            this.$emit("closeSidebar");
        } // fin de  metodo
    }, // fin de  methods
    components: {
        VuePerfectScrollbar
    }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
    /deep/ .vs-sidebar--background {
        z-index: 52010;
    }

    /deep/ .vs-sidebar {
        z-index: 52010;
        width: 50%;
        max-width: 90vw;
    }
}
</style>
