
<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->


<template>
    <div id="avatar-2544">  
        <grid2544 
        v-show="!activaEdit"></grid2544>
          
        <Edit2544 
        v-show="activaEdit && !activaPromp"  
        :key2="editKey"  
        :datosEdit="datosEdit"     
        :modollamado="$route.params.tipo"     
         @closeSidebar="activaEdit = false"  
         />   
         
         <promptDivi v-show="activaPromp" :key ="promptKey"  :datosPrompt="datosPrompt"  @closeSidebar="activaPromp = false" />
           
    </div>
</template>
<script>
 
import { mapState } from "vuex"; //, mapMutations, mapActions
import grid2544 from "./grid2544.vue"  
import Edit2544 from "./Edit2544.vue"

 import promptDivi from "@/divisoft/promptDivisoft.vue"; 

import {eventBus} from "@/main";  // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos2544 from  "./js/divi2544.js"; 
export default{
    components: { 
        grid2544, 
        Edit2544,
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
        filtros: datos2544.filtros,

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
       
       
       cargaPrompt2526(filtrosParam2526)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CATEGORIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_CATEGORIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPCATEGORIA",ObjectId:2526,idprompt:1, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2526;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Cod Categoria",
                     field: "COD_CATEGORIA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_CATEGORIA",
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

          //console.log("padre cargaPrompt2526,",filtrosParam2526);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2521(filtrosParam2521)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_PATNER", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "COD_PRODUCTO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_PRODUCTO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPPRODUCTOS",ObjectId:2521,idprompt:2, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2521;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Patner",
                     field: "COD_PATNER",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Código Producto",
                     field: "COD_PRODUCTO",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_PRODUCTO",
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

          //console.log("padre cargaPrompt2521,",filtrosParam2521);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2521(filtrosParam2521)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_PATNER", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "COD_PRODUCTO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_PRODUCTO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPPRODUCTOS",ObjectId:2521,idprompt:3, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2521;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Patner",
                     field: "COD_PATNER",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Código Producto",
                     field: "COD_PRODUCTO",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_PRODUCTO",
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

          //console.log("padre cargaPrompt2521,",filtrosParam2521);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
     
  }
};  // fin de Metodos 
</script>
 