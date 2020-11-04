<template>
  <div class="demo-alignment">
   
      <vs-popup fullscreen :title="camposProce.Titulo" :active.sync="popupActive">

          
<template> 
 <div id="data-list-list-view"  class="vx-col md:w-1/2 w-full mb-base">
 
    <div class="mt-6 flex items-center justify-between px-6">
         <vs-button @click="popupActive=false" color="primary">Regresar</vs-button> 
    </div>
       
      <div class="p-6">
        <!-- NAME -->
        <table class="table">
  <thead>
    <tr>
      <th scope="col">campo</th>
      <th scope="col">Valor</th>
      <th scope="col">campo</th>
      <th scope="col">Valor</th>
    </tr>
  </thead>
  <tbody>
 

    <tr :key="indextr" v-for="(item, indextr) in camposProce.camposProce">
      <td>{{item.NOMBRE_CAMPO}}</td>

       <td v-if="item.TIPO==1">
         <input type="text" class="form-control" placeholder="Ingrese el valor" v-model="item.VALOR"/>
       </td>  
 
        <td v-if="item.TIPO==2" >
          <div class="vx-col w-1/2">
             <vs-input size="large" v-validate="'numeric'"   name="item.NOMBRE_INTERNO" v-model="item.VALOR" class="mt-5 w-full" />
           </div>
        </td>  

        <td v-if="item.TIPO==3" >
              <div class="vx-col md:w-1/2 w-full">
                 <vs-input size="large" v-validate="{regex: '^([0-9]+)$' }" name="item.NOMBRE_INTERNO" v-model="item.VALOR" class="mt-5 w-full" />
              </div>
         </td>  

          <td v-if="item.TIPO==4" >
              <div class="vx-col md:w-1/2 w-full">
                <template>
                   
                  <flat-pickr
                    :config="configdateTimePicker"
                    v-model="item.VALOR"
                    :placeholder="item.NOMBRE_CAMPO"
                  />
                  
                  </template>
                </div>    
         </td>  
         <td v-if="item.TIPO==5" >
           <div class="vx-col w-1/2">
        <vs-input size="large"   
              name="item.NOMBRE_INTERNO"
              placeholder="item.NOMBRE_CAMPO"
              v-model="item.VALOR"
              class="mt-5 w-full" /> 
      </div> 
         </td> 
        <td v-if="item.TIPO==6"  >
             <div class="vx-col md:w-1/2 w-full">  
                  <ul class="centerx"  >
                     <li :keyVal="index"  v-for="(itemVal, index) in item.VALORES">
                         <vs-radio v-model="item.VALOR" :vs-value="itemVal.value" >{{itemVal.text}}</vs-radio>
                     </li>
                   </ul> 
                                        
             </div>     
        </td>     
         <td v-if="item.TIPO==7   ||item.TIPO==8" >
          <div class="vx-col md:w-1/2 w-full mt-5">
                    <vs-select  v-model="item.VALOR"  class="w-full select-large"  >
                        <vs-select-item :key="index2" :value="itemVal.value" :text="itemVal.text" v-for="(itemVal,index2)
                        in item.VALORES" class="w-full" />
                    </vs-select>
          </div>
         </td>  
         <td v-if="item.TIPO==12" > 
           <div class="vx-col w-1/2">
              <vs-input size="large" v-validate="'email'"
               v-model="item.VALOR"
               placeholder="item.NOMBRE_CAMPO"
                name="item.NOMBRE_INTERNO"
                 class="mt-5 w-full" />
          </div>  

         </td>  

        <td v-if="item.TIPO==44" >  
           <div class="vx-col md:w-1/2 w-full">
                <template>
                    <div class="centerx">
                      <vs-input-number v-model="item.VALOR" />
                    </div>
                  </template>
            </div> 
         </td>  
    </tr> 
    
  </tbody>
 </table> 
 </div> 
       <button type="submit" class="btn btn-primary" @click="ejecutaProcedimiento">Ejecutar</button>
 
     
   </div>
</template>
      </vs-popup>
  </div>
</template>
 
 <script>

  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import * as divilib from '@/divisoftlibs/utilDivisoftJS.js';

  import {eventBus} from "@/main";  // para que se hablen los componentes
  
  export default { 
 
   watch: { 
    // SI HAY PROMPT
      "getRespuestaProcedimiento": function() {   
             if (this.getRespuestaProcedimiento=="ERROR")
              { 
                
                this.$vs.notify({
                    title:"Informe de Procedimiento Almacenado",
                    time: 6000,
                    text:"No se Ejecuto el proceso ID "+this.camposProce.ObjectId +"  "+this.getRespuestaProceERROR,
                    color:"warning"});
               } 
             else
            
       
            if (this.getRespuestaProcedimiento.length>5)
             { 
              this.respuestaProc=divilib.xmlToJson(this.getRespuestaProcedimiento ,"GN_ERROR"); 
            //PONE EN STORE LA RESPUESTA DEL PROCEDIMIENTO  

              this.$store.commit("MUTSETOBJETOJSONPROC", this.respuestaProc);  
              eventBus.$emit('datosProcedure',this.respuestaProc,this.camposProce.ObjectId);
             } 
        } 
  },
  
  created() { 	 
			//	 cuando se createReadStream
         eventBus.$on('cargaStoreProcedure', (CamposProce) => {
             // LIMPIA VARIABLES 
              this.popupActive= true;
              this.camposProce=CamposProce;	
              if(this.camposProce.Username == null){
                 this.$vs.notify({
                        title:"Informe de Procedimiento Almacenado",
                        time: 6000,
                        text:"Usuario No esta Identificado",
                        color:"warning"});
                          this.$emit('closeSidebar'); 
                }    
            if(this.camposProce.Credencial== null){
              this.$vs.notify({
                        title:"Informe de Procedimiento Almacenado",
                        time: 6000,
                        text:"No tiene Autorizacion de Ejecucion o Credencial No presente ",
                        color:"warning"});
                          this.$emit('closeSidebar'); 
                        reurn;
            }    
            if(this.camposProce.ObjectId == null){
                  this.$vs.notify({
                              title:"Informe de Procedimiento Almacenado",
                              time: 6000,
                              text:"Procedimiento o Funcion no esta Identificado",
                              color:"warning"});
                }    
              this.respuestaProc= []; 
              this.$store.commit("MUTSETOBJETOJSONPROC", this.respuestaProc);
              this.$store.commit("MUTSETRESPUESTAProc", "");
            
             
         }); 
       },
    data() {
    return {
         popupActive: false,
      respuestaProc: [], 

      camposProce:{ 
        Credencial:"123",
        ObjectId:"123",   
        Username:"",
        camposProce:  [
                       {"NOMBRE_CAMPO": "Cod Compania","NOMBRE_INTERNO": "COD_COMPANIA","VALOR": "" }
                       ],
        }, 
       
       datosaqui: true,
       parametros:[], 
       paramtxt:"",
       
          
    }
  },
  computed: { 
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar');
          //this.initValues();
        }
      }
    }, 

    getRespuestaProcedimiento: {
            get() { 
                return this.$store.state.procRESPUESTAXML;  
            }
        },
     getRespuestaProceERROR: {
            get() { 
                return this.$store.state.lastBdmsage;  
            }
        },   
         
  }, // fin de computados
  methods: {
    //TRAE DATOS PARA MOSTRAR EN TABLA 
    ejecutaProcedimiento: function() {  

       this.respuestaProc= []; 
       this.$store.commit("MUTSETOBJETOJSONPROC", this.respuestaProc);
       this.$store.commit("MUTSETRESPUESTAProc", "");
       if(this.camposProce.Username == null){
            this.$vs.notify({
                        title:"Informe de Procedimiento Almacenado",
                        time: 6000,
                        text:"Usuario No esta Identificado",
                        color:"warning"});
                          this.$emit('closeSidebar'); 
                        reurn;
          }    
          if(this.camposProce.Credencial== null){
            this.$vs.notify({
                        title:"Informe de Procedimiento Almacenado",
                        time: 6000,
                        text:"No tiene Autorizacion de Ejecucion o Credencial No presente ",
                        color:"warning"});
                          this.$emit('closeSidebar'); 
                        reurn;
          }    
       if(this.camposProce.ObjectId == null){
            this.$vs.notify({
                        title:"Informe de Procedimiento Almacenado",
                        time: 6000,
                        text:"Procedimiento o Funcion no esta Identificado",
                        color:"warning"});
                          this.$emit('closeSidebar'); 
          }    
        else
         {
       var origenUrl = "O";   
        var header = {
            MODO: "E",
            OBJECTID:   this.camposProce.ObjectId,
            CREDENCIAL: this.camposProce.Credencial,
            USERNAME:   this.camposProce.Username,
            REGISTROSXPAGINA: "0",
            PAGINA: "0",
            ORDERBY: ""
        };
      this.headertxt =divilib.GetHeaderString(header);   
      //agrego los parametros 
      var parametros=[]; 
       var parametro1 = { NOMBRE: "", OPERADOR: "=", VALOR1: "", VALOR2: "", CDATA: "0"};
       var xmlParametros="";
       var contador=0; 
       this.camposProce.camposProce.forEach(function callback(item) { 
              if (item.VALOR.length>0)
              { 
              parametro1 = { NOMBRE: item.NOMBRE_INTERNO, OPERADOR: "=" , VALOR1:item.VALOR, VALOR2: "", CDATA: "0"};
              parametros.push(parametro1); 
             contador++;
             }
    // tu iterador
         }); 
       //entrega arreglo de parametros recibe texto de parametros
      this.paramtxt=divilib.paramArraytoStrintg(parametros); 
      // de add parametros  
      this.$store.commit("MUTSETURL", "O");

     this.filastxt="";
      // carga los parametros   
       var petTxt = {
           header: this.headertxt,
           parametros: this.paramtxt,
          filas: this.filastxt
         };

      this.$store.commit("MUTSETURL", "O");
      this.$store.commit("MUTSETPETICIONTXT", petTxt);


      var pedido = {
        dml: "E",
       Credencial: this.camposProce.Credencial,
        formatoenvio: "N",
        formatorecibe: "N",
        indicador: "7", //EXECUTE
        origenUrl: origenUrl
      }; 
      }
       //cambia a acDsoaPrueba  
      this.$store.dispatch("acDsoa", pedido);  
      this.$emit('closeSidebar'); 

    }, // fin de ejecutaProcedimiento
 
  },  // fin de  methods 
  
components: {
    VuePerfectScrollbar,
  }
}
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
