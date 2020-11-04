
<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->


<template>
    <div id="avatar-2521">  
        <grid2521 
        v-show="!activaEdit"></grid2521>
          
        <Edit2521 
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
import grid2521 from "./grid2521.vue"  
import Edit2521 from "./Edit2521.vue"

 import promptDivi from "@/divisoft/promptDivisoft.vue"; 

import {eventBus} from "@/main";  // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos2521 from  "./js/divi2521.js"; 
export default{
    components: { 
        grid2521, 
        Edit2521,
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
        filtros: datos2521.filtros,

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
    lastBdmsgcode () {
      return this.$store.state.lastBdmsgcode;
    }, 
  }, 
  methods: { 
       incrementaEkey()
       {
          this.editKey++;
       },
       
       
       cargaPrompt2521(filtrosParam2521)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "NOM_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPPRODUCTOS",ObjectId:2521,idprompt:1, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2521;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Cia",
                     field: "COD_CIA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "NOM_CIA",
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
      
       cargaPrompt2520(filtrosParam2520)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_PATNER", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "NOM_NEGOCIO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_PATNER",ObjectId:2520,idprompt:2, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2520;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Patner",
                     field: "COD_PATNER",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "NOM_NEGOCIO",
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

          //console.log("padre cargaPrompt2520,",filtrosParam2520);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2524(filtrosParam2524)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_MARCA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_MARCA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPMARCA",ObjectId:2524,idprompt:3, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2524;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Marca",
                     field: "COD_MARCA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_MARCA",
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

          //console.log("padre cargaPrompt2524,",filtrosParam2524);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2518(filtrosParam2518)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "ID_TAX", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "NOM_TAX", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_TAXES",ObjectId:2518,idprompt:4, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2518;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Cod Cia",
                     field: "COD_CIA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Id Tax",
                     field: "ID_TAX",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "NOM_TAX",
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

          //console.log("padre cargaPrompt2518,",filtrosParam2518);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2523(filtrosParam2523)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_RANGO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_RANGO", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_SHOPRANGOPRECIOS",ObjectId:2523,idprompt:5, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2523;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Rango",
                     field: "COD_RANGO",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "DES_RANGO",
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

          //console.log("padre cargaPrompt2523,",filtrosParam2523);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
     
  }
};  // fin de Metodos 
</script>
 