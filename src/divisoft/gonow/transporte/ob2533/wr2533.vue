


<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->


<template>
    <div id="avatar-2533">  
        <grid2533 
        v-show="!activaEdit"></grid2533>
          
        <Edit2533 
        v-show="activaEdit && !activaPromp"  
        :key2="editKey"  
        :datosEdit="datosEdit"     
        :modollamado="$route.params.tipo"     
         @closeSidebar="activaEdit = false"  
         />   
         
    </div>
</template>
<script>
 
import { mapState } from "vuex"; //, mapMutations, mapActions
import grid2533 from "./grid2533.vue"  
import Edit2533 from "./Edit2533.vue"

  

import {eventBus} from "@/main";  // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos2533 from  "./js/divi2533.js"; 
export default{
    components: { 
        grid2533, 
        Edit2533,
        filtrosDivisoft,
        
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
        filtros: datos2533.filtros,

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
       
       
       cargaPrompt2534(filtrosParam2534)
        {
          var filas=[];
 filas.push(  { NOMBRE: "NUM_RANGOVOLUMEN", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_RANGOVOLUMEN", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_RANGOVOLUMEN",ObjectId:2534,idprompt:1, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2534;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Número Rangovolumen",
                     field: "NUM_RANGOVOLUMEN",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_RANGOVOLUMEN",
                      filter: true,
                      width: 300,
                      checkboxSelection: true,
                      headerCheckboxSelectionFilteredOnly: true,
                      headerCheckboxSelection: true,
                      lockPosition: true,
                       pinned: "left" // lo pone a la izquierda como pivot
                  }, 
                  ]     
        
        this.datosPrompt[0].columnDefs=columnDefs; 

          //console.log("padre cargaPrompt2534,",filtrosParam2534);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2532(filtrosParam2532)
        {
          var filas=[];
 filas.push(  { NOMBRE: "NUM_TRANSPORTE", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_TRANSPORTE", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_TIPOTRANSPORTE",ObjectId:2532,idprompt:2, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2532;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Número Transporte",
                     field: "NUM_TRANSPORTE",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_TRANSPORTE",
                      filter: true,
                      width: 300,
                      checkboxSelection: true,
                      headerCheckboxSelectionFilteredOnly: true,
                      headerCheckboxSelection: true,
                      lockPosition: true,
                       pinned: "left" // lo pone a la izquierda como pivot
                  }, 
                  ]     
        
        this.datosPrompt[0].columnDefs=columnDefs; 

          //console.log("padre cargaPrompt2532,",filtrosParam2532);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
     
  }
};  // fin de Metodos 
</script>
 