


<!-- =========================================================================================
  MODELO VUE.JS  VUAX DIVISOFT  2020  
    AUTOR: ADEMAR DIAZ 
    MODELO DE EDICION DE TABLAS CONFIGURABLE 
    CREADO POR  DIVISOFT DSOA 2020
    COMPONENTE WRAPER    
    ES EL HORQUESTADOR DE TODO EL COMPONENTE
========================================================================================== -->


<template>
    <div id="avatar-2520">  
        <grid2520 v-show="!activaEdit"></grid2520>  
        <Edit2520 v-show="activaEdit && !activaPromp"  :key2="editKey"  :datosEdit="datosEdit"  @closeSidebar="activaEdit = false"  />   
        <promptDivi v-show="activaPromp"                                   :key ="promptKey"  :datosPrompt="datosPrompt"  @closeSidebar="activaPromp = false" /> 
    </div>
</template>
<script>
 
import { mapState } from "vuex"; //, mapMutations, mapActions
import grid2520 from "./grid2520.vue"  
import Edit2520 from "./Edit2520.vue"

 import promptDivi from "@/divisoft/promptDivisoft.vue"; 

import {eventBus} from "@/main";  // para que se hablen los componentes
// ESTE ES UN FILTRO GENERICO, Si se necesita  puede incluir  un filtro personalizado
import filtrosDivisoft from "@/divisoft/filtrosDivisoft.vue";
//archivo que contiene constantes y procedimientos miscelaneos de apoyo 
import * as datos2520 from  "./js/divi2520.js"; 
export default{
    components: { 
        grid2520, 
        Edit2520,
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
        filtros: datos2520.filtros,

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
       
       
       cargaPrompt2512(filtrosParam2512)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CATEGORIAPATNER", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "VALOR_COMISIONPATNER", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_COMISIONPATNER",ObjectId:2512,idprompt:1, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2512;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Categoriapatner",
                     field: "COD_CATEGORIAPATNER",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Valor",
                     field: "VALOR_COMISIONPATNER",
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

          //console.log("padre cargaPrompt2512,",filtrosParam2512);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2500(filtrosParam2500)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "NOM_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_COMPANIA",ObjectId:2500,idprompt:2, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2500;
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

          //console.log("padre cargaPrompt2500,",filtrosParam2500);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2511(filtrosParam2511)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_CIA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "COD_PERSONA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "NOM_PERSONA", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_PERSONAS",ObjectId:2511,idprompt:3, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2511;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Cia",
                     field: "COD_CIA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Código Persona",
                     field: "COD_PERSONA",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Nombre",
                     field: "NOM_PERSONA",
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

          //console.log("padre cargaPrompt2511,",filtrosParam2511);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
       cargaPrompt2509(filtrosParam2509)
        {
          var filas=[];
 filas.push(  { NOMBRE: "COD_DIRECCION", VALOR1: "", VALOR2: "", CDATA: "0" });
                             filas.push(  { NOMBRE: "DES_DIRECCION", VALOR1: "", VALOR2: "", CDATA: "0" });
                             
   this.datosPrompt=[];
   this.datosPrompt=[  {titulo:"GO_DIRECCIONES",ObjectId:2509,idprompt:4, filas:[], datos:[]}];

   this.datosPrompt[0].datos=filtrosParam2509;
   this.datosPrompt[0].filas=filas;
                              
   var columnDefs = [
                                {
                     headerName: "Código Dirección",
                     field: "COD_DIRECCION",
                      filter: true,
                      width: 200 
                  }, 
                   {
                     headerName: "Dirección",
                     field: "DES_DIRECCION",
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

          //console.log("padre cargaPrompt2509,",filtrosParam2509);
        this.promptKey++; 
        this.editKey++;
        this.activaPromp=true;
                              
        },     
      
     
  }
};  // fin de Metodos 
</script>
 