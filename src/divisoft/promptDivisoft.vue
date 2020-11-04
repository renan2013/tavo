<template>
  <div>
    <div   id="ag-grid-demo">   
 
    <div>{{ getTitulo }}</div>  
      
        
      {{datosPrompt[0].datos}}
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
          <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery"  @input="updateSearchQuery" placeholder="Buscar..." />
          <!--EXPORTAR EXCEL-->
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Exportar a Excel</vs-button>
        </div>
      </div>
      <div style="height: 100%">
        <!-- rowSelection="multiple" // :floatingFilter="true" -->
        
        <!--COMPONENTE GRID-->
        <ag-grid-vue
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :gridOptions="gridOptions"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="getDdatosRow"
          rowSelection="single" 
          colResizeDefault="shift"
          :animateRows="true"
          :floatingFilter="true"
          :pagination="true"
          :suppressDragLeaveHidesColumns="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="false"
          @cellDoubleClicked="onDoubleClicked">
        </ag-grid-vue>
      </div>
      <pre></pre>
    </div>
      
     
  </div>
</template>
  
<script>
// importa librerias que necesita 
import { AgGridVue } from "ag-grid-vue";
import { mapState } from "vuex"; //, mapMutations, mapActions
import {eventBus} from "@/main";  // para que se hablen los componentes
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

import * as divilib from '@/divisoftlibs/utilDivisoftJS.js'; 

export default {
  components: {
    AgGridVue
  }, 
   
  props: {
	  datosPrompt: {  //registros del prompt 
			// header Es recibido del padre
			type: Array,
      required: true
      }
    }, 
    
  // antes de  inciar la pagina  cargalas  Filas que lleva que es una constante 
  // en  divi000X.js que es un libreria que guarda constantes y puede contener funciones de apoyo al  Documento
  beforeMount() { 
    //DEFINE COLUMNAS DE LA TABLA
     
    this.columnDefs = this.datosPrompt[0].columnDefs;    
  },

// Cuando se monta la aplicacion
  mounted() { 

     if (this.datosPrompt[0].datos[0].nombre=="NA"  )
        this.datosPrompt[0].datos[0].nombre="NA";
      
     else   
     {
        
      this.buscaRegistros();
      }  

    ///this.buscaRegistros();
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi; 
  },
 

  computed: 
  {
    ...mapState([ "datosJ",  "selectedRow","rows", "datosGrid","tableKey","urlOrigen",
    "laststrheader","laststrParametros","laststrFilas"]),
       
    

     getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },

    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 10;
    },

    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    getTitulo() {
      return this.datosPrompt[0].titulo+" XXX";
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
        return this.$store.state.datosPrompt.rows; //llena la tabla con los datos obtenidos
        
      },
    
    }, 
    getDdatosPages: {
      get() {
        return 0;
      }
    },
   lastDbmsg () {
      return this.$store.state.lastBdmsage;
    },
    lastDbmsgCode () {
      return this.$store.state.lastBdmsgcode;
    }, 
  },

  data() {
    return { 
      //APP
       activaEdit: false, 
       locallastheader: "",  //guarda el ultimo header de este objeto
       locallaststrParametros: "", //guarda el ultimo  parametros de este objeto
       locallaststrFilas: "",//guarda el ultimo filas de este objeto

       paramtxt:"",
       filastxt:"",
       header:"",  
      
      staticKey: [],
      rowsForm:[],
      dinamicKey: [],
      titulo:'Consulta de Cantones',


      origenUrl : "J",
      dml : "I",

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
        filter:true,
        suppressMenu: false,
      }, 
  //////////////////////////////////////
     
    };
  },

  methods: {    
    //PARA EDITAR
    onDoubleClicked(event) { 

      let rowsSelection = this.gridOptions.api.getSelectedRows();
//      console.log("prompt row selection ",rowsSelection );
        
     //LLAMA AL INVOCADOR Y LE ENTREA LOS DATOS
     
      eventBus.$emit('datosprompt',rowsSelection[0],this.datosPrompt[0].idprompt);
       this.$parent.activaPromp= false;
    },

    //FUNCION BUSQUEDA EN EL INPUT DE ARRIBA
    updateSearchQuery(val)
     {
      this.gridApi.setQuickFilter(val);
    },

    addFilas: function()
     {

       var filas=[];

       var fila1 = { NOMBRE: "",  VALOR1: "", VALOR2: "", CDATA: "0"};
 
       var xmlFilas="";
       var contador=0; 
       
          
          this.datosPrompt[0].filas.forEach(function callback(item) { 
              
              fila1 = { NOMBRE: item.NOMBRE,  VALOR1:"", VALOR2: "", CDATA: "0"};
              filas.push(fila1); 
             contador++;
              
    // tu iterador
         });  
         
         this.filastxt=divilib.filaArraytoStrintg(filas,"N");
    },
      

    //TRAE DATOS PARA MOSTRAR EN TABLA INCIALMENTE
     buscaRegistros : function() 
     {
      
      var origenUrl = "O";  
      var header={ MODO: "JJ", 
      OBJECTID: this.datosPrompt[0].ObjectId, 
      CREDENCIAL: this.getProfile.Credencial, 
      USERNAME:  this.getProfile.UserName, 
      REGISTROSXPAGINA: "200", 
      PAGINA: "1", 
      ORDERBY: ""};
      this.headertxt =divilib.GetHeaderString(header);  
      // arma la encabezado peticion
      // agrego las filas

       this.addFilas();  

       var parametros=[];
       var parametro1 = { NOMBRE: "", OPERADOR: "=", VALOR1: "01", VALOR2: "", CDATA: "0"};
 
       var xmlParametros="";
       var contador=0; 
       this.datosPrompt[0].datos.forEach(function callback(item) { 

       if (item.valor.length>0)
              { 
              parametro1 = { NOMBRE: item.nombre, OPERADOR:  "=" , VALOR1:item.valor, VALOR2: "", CDATA: "0"};
              parametros.push(parametro1); 
             contador++;
             }
         }); 
       //entrega arreglo de parametros recibe texto de parametros
       if (contador==0)
           this.paramtxt= "<Param/>"; 
       else
          this.paramtxt=divilib.paramArraytoStrintg(parametros);  
      // cargo la peticion texto

      
      console.log("header",this.headertxt);
      console.log("param",this.paramtxt);
      console.log("filas",this.filastxt);
      
      var petTxt= {header:this.headertxt, parametros:this.paramtxt , filas:this.filastxt }; 


      this.$store.commit("MUTSETURL", "O"); 
      this.$store.commit("MUTSETPETICIONTXT",petTxt); 

      var pedido = {
        dml: "JJ",

        Credencial: this.getProfile.Credencial,
        ObjectId:this.datosPrompt[0].ObjectId,
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "5", // prompt
        origenUrl: origenUrl
      };
      
      //cambia a acDsoaPrueba // acDsoa
      this.$store.dispatch("acDsoa", pedido); 

    },
   },
};  // fin de Metodos 
</script>
  
		