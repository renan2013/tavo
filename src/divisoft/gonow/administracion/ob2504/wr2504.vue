


<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->


<template>
    <div id="avatar-2504">  
        <grid2504 v-show="!activaEdit"></grid2504>  
        <Edit2504 v-show="activaEdit && !activaPromp"  :key2="editKey"  :datosEdit="datosEdit"  @closeSidebar="activaEdit = false"  />   
        <promptDivi v-show="activaPromp"                                   :key ="promptKey"  :datosPrompt="datosPrompt"  @closeSidebar="activaPromp = false" /> 
    </div>
</template>
<script>
 
import { mapState } from "vuex"; //, mapMutations, mapActions
import grid2504 from "./grid2504.vue"  
import Edit2504 from "./Edit2504.vue"

 import promptDivi from "@/divisoft/promptDivisoft.vue"; 

import {eventBus} from "@/main";  // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos2504 from  "./js/divi2504.js"; 
export default{
    components: { 
        grid2504, 
        Edit2504,
        filtrosDivisoft,
        promptDivi
    },
      
    data() {
    
    return { 
      //APP
      
        promptKey:1, 
        editKey:1,
        activaPromp : false,    
        
        //SI HAY PROCEDIMIENTOS ALMACENDAOS
        
      
        //DATOS PROMPT  BASE  
        datosPrompt:[  
          {    titulo:"",
                ObjectId:1,
                idprompt:1, 
                columnDefs: [
              {
                                          headerName: "Etiqueta",
                                          field: "NOMBRE",
                                          filter: true,
                                          width: 300,
                                          checkboxSelection: true,
                                          headerCheckboxSelectionFilteredOnly: true,
                                          headerCheckboxSelection: true,
                                          pinned: "left" // lo pone a la izquierda como pivot
                                        }], 
        filas:[{NOMBRE:""}], 
        datos:[{ nombre: "NA", valor: "-1" }]
        }
        ],  
        
        indicadorDML:"U",
        activaEdit: false,  
        filtros: datos2504.filtros,

        locallastheader: "",  //guarda el ultimo header de este objeto
        locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
        locallaststrFilas: "",//guarda el ultimo filas de este objeto
        autor:"Ademar Diaz"
    };
  },
  
   // antes de  inciar la pagina  cargalas  Filas que lleva que es una constante 
    
  computed: 
  {
    ...mapState(["dsoaModel", "datosJ", "datosV", "selectedRow","rows","datosGridPhp","datosGrid","tableKey","urlOrigen",
    "laststrheader","laststrParametros","laststrFilas"]),
  
    datosEdit: {
      get() {
        //return this.$store.state.datosGridPhp.rows;
         return [{datosRow:[],  indicadorDML:this.indicadorDML } ]; //llena la tabla con los datos obtenidos
      },
    
    },
    
   lastDbmsg () {
      return this.$store.state.lastBdmsage;
    },
    lastDbmsgCode () {
      return this.$store.state.lastBdmsgcode;
    }, 
  }, 
  methods: { 
       incrementaEkey()
       {
          this.editKey++;
       },
       
       
       cargaPrompt2503(filtrosParam2503)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_PAIS", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "COD_PROVINCIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_PROVINCIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_PROVINCIAS",ObjectId:2503,idprompt:1, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2503;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Cod Pais",
                     field: "COD_PAIS",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Código Provincia",
                     field: "COD_PROVINCIA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre Provincia",
                     field: "DES_PROVINCIA",
                      filter: true,
                      width: 200 
                  }, 
                  ]     
        
        this.datosPrompt[0].columnDefs=columnDefs; 

          //console.log("padre cargaPrompt2503,",filtrosParam2503);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
     
  }
};  // fin de Metodos 
</script>
 