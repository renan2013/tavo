<template>


<vs-popup fullscreen title="Ejecuta Procedimientos Almacenados" :active.sync="popupActive">
    <vx-card code-toggler>
        <div>
            <h1>{{camposProce.Titulo}}</h1>
        </div>
        <!-- TITULO DEL ENCABEZADO -->
        <div class="mt-6 flex items-center justify-between px-6">
            <div class="vx-col w-1/2">
                <button type="submit" class="btn btn-primary" @click="formSubmitted">Ejecutar</button>
            </div>
            <div class="vx-col w-1/2">
                <vs-button @click="popupActive=false" color="primary">Regresar</vs-button>
            </div>

        </div>
        <vs-divider class="mb-0"></vs-divider>
        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6">
            <vx-input-group class="mb-base">
                <div class="vx-row">
                    <div class="vx-row">

                        <div class="vx-col w-1/2" :key="indextr" v-for="(item, indextr) in camposProce.camposProce">

                            <vs-input v-if="item.TIPO==1" size="large" v-validate="'required'" placeholder="Ingrese el valor" :label="item.NOMBRE_CAMPO" v-model="item.VALOR" class="mt-5 w-full" />

                            <vs-input v-if="item.TIPO==2" size="large" v-validate="'numeric'" placeholder="Ingrese el valor" :label="item.NOMBRE_CAMPO" v-model="item.VALOR" class="mt-5 w-full" />

                            <vs-input v-if="item.TIPO==3" size="large" placeholder="Ingrese el valor" :label="item.NOMBRE_CAMPO" v-model="item.VALOR" class="mt-5 w-full" />

                            <template>

                                <flat-pickr v-if="item.TIPO==4" :config="configdateTimePicker" v-model="item.VALOR" :placeholder="item.NOMBRE_CAMPO" />
                            </template>

                            <vs-input v-if="item.TIPO==5" size="large" name="item.NOMBRE_INTERNO" placeholder="item.NOMBRE_CAMPO" v-model="item.VALOR" class="mt-5 w-full" />

                            <ul class="centerx" v-if="item.TIPO==6">
                                <li :keyVal="index" v-for="(itemVal, index) in item.VALORES">
                                    <vs-radio v-model="item.VALOR" :vs-value="itemVal.value">{{itemVal.text}}</vs-radio>
                                </li>
                            </ul>

                            <vs-select v-if="item.TIPO==7   ||item.TIPO==8" v-model="item.VALOR" class="w-full select-large">
                                <vs-select-item :key="index2" :value="itemVal.value" :text="itemVal.text" v-for="(itemVal,index2)
                        in item.VALORES" class="w-full" />
                            </vs-select>

                            <vs-input v-if="item.TIPO==12" size="large" v-validate="'email'" v-model="item.VALOR" placeholder="item.NOMBRE_CAMPO" name="item.NOMBRE_INTERNO" class="mt-5 w-full" />

                            <template>
                                <div v-if="item.TIPO==44" class="centerx">
                                    <vs-input-number v-model="item.VALOR" />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" @click="formSubmitted">Ejecutar</button>

            </vx-input-group>
        </VuePerfectScrollbar>
    </vx-card>
</vs-popup>
</template>
 
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import * as divilib from '@/divisoftlibs/utilDivisoftJS.js'; 
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import {
    eventBus
} from '@/main'; // para que se hablen los componentes

export default {
    components: {
        VuePerfectScrollbar,
        VuePerfectScrollbar
    },
    watch: {
        // SI HAY PROMPT
        getRespuestaProcedimiento: function () {
            let respuestaProc = '';
            let txtdefault = [];
            //console.log("watch getRespuestaProcedimiento",this.getRespuestaProcedimiento);
            if (this.getRespuestaProcedimiento == 'ERROR') {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'No se Ejecuto el proceso ID ' + this.camposProce.ObjectId + '  ' + this.getRespuestaProceERROR,
                    color: 'warning'
                });
            }

            if (this.getRespuestaProcedimiento.length > 4) {
                respuestaProc = '';

                if (this.camposProce.tipoRespuestaProc == 'J') {
                    respuestaProc = divilib.xmlToJson(this.getRespuestaProcedimiento, 'GN_ERROR');
                    this.$store.commit('MUTSETOBJETOJSONPROC', respuestaProc);
                } else {
                    respuestaProc = this.getRespuestaProcedimiento;
                    this.$store.commit('MUTSETOBJETOJSONPROC', txtdefault);
                }

                //PONE EN STORE LA RESPUESTA DEL PROCEDIMIENTO

                eventBus.$emit('datosProcedure', respuestaProc, this.camposProce.ObjectId);
            }
        }
    },

    created() {
        //	 cuando se createReadStream
        eventBus.$on('cargaStoreProcedure', CamposProce => {
            // LIMPIA VARIABLES
            this.popupActive = true;
            this.camposProce = CamposProce;

            if (this.camposProce.Username == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'Usuario No esta Identificado',
                    color: 'warning'
                });
                this.$emit('closeSidebar');
            }
            if (this.camposProce.Credencial == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'No tiene Autorizacion de Ejecucion o Credencial No presente ',
                    color: 'warning'
                });
                this.$emit('closeSidebar');
                reurn;
            }
            if (this.camposProce.ObjectId == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'Procedimiento o Funcion no esta Identificado',
                    color: 'warning'
                });
            }
            this.respuestaProc = [];

            this.$store.commit('MUTSETOBJETOJSONPROC', this.respuestaProc);
            this.$store.commit('MUTSETRESPUESTAProc', '');
            if (this.camposProce.interfase == 'I') {
                // INTERNO  SE EJECUTA Y REGRESA
                this.popupActive = false;
                this.formSubmitted();
            }
        });
    },
    reDestroy: function() {
    //Crea un bus  OYENTE
    // SI HAY PROMPT
    eventBus.$off("cargaStoreProcedure");   
  },
    data() {
        return {
            tipoRespuestaProc: 'J',
            popupActive: false,
            respuestaProc: [],

            camposProce: {
                Credencial: '123',
                ObjectId: '123',
                Username: '',
                camposProce: [{
                    NOMBRE_CAMPO: 'Cod Compania',
                    NOMBRE_INTERNO: 'COD_COMPANIA',
                    VALOR: ''
                }]
            },

            datosaqui: true,
            parametros: [],
            paramtxt: ''
        };
    },
    computed: {
        getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },
        isSidebarActiveLocal: {
            get() {
                return this.isSidebarActive;
            },
            set(val) {
                if (!val) {
                    this.$emit('closeSidebar');
                    //this.initValues();
                }
            }
        },
        getRespuestaProcedimiento() {
            return this.$store.state.procRESPUESTAXML;
        },
        getRespuestaProceERROR: {
            get() {
                return this.$store.state.lastBdmsage;
            }
        }
    }, // fin de computados
    methods: {
        //TRAE DATOS PARA MOSTRAR EN TABLA
        formSubmitted: function () {
            this.respuestaProc = [];
            this.$store.commit('MUTSETOBJETOJSONPROC', this.respuestaProc);
            this.$store.commit('MUTSETRESPUESTAProc', '');
            if (this.camposProce.Username == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'Usuario No esta Identificado',
                    color: 'warning'
                });
                this.$emit('closeSidebar');
                reurn;
            }
            if (this.camposProce.Credencial == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'No tiene Autorizacion de Ejecucion o Credencial No presente ',
                    color: 'warning'
                });
                this.$emit('closeSidebar');
                reurn;
            }
            if (this.camposProce.ObjectId == null) {
                this.$vs.notify({
                    title: 'Informe de Procedimiento Almacenado',
                    time: 6000,
                    text: 'Procedimiento o Funcion no esta Identificado',
                    color: 'warning'
                });
                this.$emit('closeSidebar');
            } else {
                var origenUrl = 'O';
                var header = {
                    MODO: this.camposProce.DML,
                    OBJECTID: this.camposProce.ObjectId,
                    CREDENCIAL:this.getProfile.Credencial,
                    USERNAME:  this.getProfile.Username,
                    REGISTROSXPAGINA: '0',
                    PAGINA: '0',
                    ORDERBY: ''
                };
                this.headertxt = divilib.GetHeaderString(header);
                //agrego los parametros
                var parametros = [];
                var parametro1 = {
                    NOMBRE: '',
                    OPERADOR: '=',
                    VALOR1: '',
                    VALOR2: '',
                    CDATA: '0'
                };
                var xmlParametros = '';
                var contador = 0;

                this.camposProce.camposProce.forEach(function callback(item) {
                 // alert(item.TIPO+"  y "+item.VALOR);
                    if (item.TIPO == 2 || item.TIPO == 3) {
                        if (item.VALOR != null) {
                            parametro1 = {
                                NOMBRE: item.NOMBRE_INTERNO,
                                OPERADOR: item.OPERADOR,
                                VALOR1: item.VALOR,
                                VALOR2: '',
                                CDATA: '0'
                            };
                            parametros.push(parametro1);
                            contador++;
                        } else {
                            parametro1 = {
                                NOMBRE: item.NOMBRE_INTERNO,
                                OPERADOR: item.OPERADOR,
                                VALOR1: '',
                                VALOR2: '',
                                CDATA: '0'
                            };
                            parametros.push(parametro1);
                            contador++;
                        }
                    } else {
                        if (item.VALOR.length > 0) {
                            parametro1 = {
                                NOMBRE: item.NOMBRE_INTERNO,
                                OPERADOR: item.OPERADOR,
                                VALOR1: item.VALOR,
                                VALOR2: '',
                                CDATA: '0'
                            };
                            parametros.push(parametro1);
                            contador++;
                        } else {
                            parametro1 = {
                                NOMBRE: item.NOMBRE_INTERNO,
                                OPERADOR: item.OPERADOR,
                                VALOR1: '',
                                VALOR2: '',
                                CDATA: '0'
                            };
                            parametros.push(parametro1);
                            contador++;
                        }
                    }

                    // tu iterador
                });
                //entrega arreglo de parametros recibe texto de parametros
                this.paramtxt = divilib.paramArraytoStrintg(parametros);
                // de add parametros
                this.$store.commit('MUTSETURL', 'O');

                this.filastxt = '';
                // carga los parametros
                var petTxt = {
                    header: this.headertxt,
                    parametros: this.paramtxt,
                    filas: this.filastxt
                };

                this.$store.commit('MUTSETURL', 'O');
                this.$store.commit('MUTSETPETICIONTXT', petTxt);

                var pedido = {
                    dml: 'E',
                    Credencial: this.camposProce.Credencial,
                    ObjectId: this.camposProce.ObjectId,
                    formatoenvio: 'N',
                    formatorecibe: 'N',
                    indicador: '7', //EXECUTE
                    origenUrl: origenUrl
                };
            }
            //cambia a acDsoaPrueba
            this.$store.dispatch('acDsoa', pedido);
            this.$emit('closeSidebar');
        } // fin de ejecutaProcedimiento
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
