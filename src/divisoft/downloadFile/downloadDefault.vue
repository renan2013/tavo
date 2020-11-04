  <!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
  <div>

    <div class="demo-alignment" v-show="cargando" type="gradient" color="success" >
     Cargando imagen....
  </div>
      <br />
      <iframe v-show="imageType==1" :src="textBase64" type="application/pdf"></iframe>
      <div>
        <vs-avatar v-show="imageType==2" size="large" :src="textBase64" />
      </div>
    </div>
  </div>
</template> 

<script>
// lector basico de documentos o imagenes
import { eventBus } from "@/main"; // para que se hablen los componentes
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
export default {
  created() {
    //	 cuando se createReadStream
 

    eventBus.$on("cargaDoc", PROPSDataCMS => {
     // alert("carga DOC ")
      //console.log("para Cargar el ARchivo DOWN ",PROPSDataCMS);
      this.Referencia = PROPSDataCMS[0].Referencia;
      this.LlaveExterna = PROPSDataCMS[0].LlaveExterna;
      this.NumNivel = PROPSDataCMS[0].NumNivel;
      this.NumDoc = PROPSDataCMS[0].NumDoc;

      if (
        this.LlaveExterna > "0" &&
        this.NumNivel > "0" &&
        this.NumDoc > "0" &&
        this.Referencia > "0"
      ) {
        this.downloadFile();
      } else {
        this.textBase64 = "";
        this.$store.dispatch("CMSacDsoaLimpia", divilib.DataCMS[0]);
      }
    });
  },
  reDestroy: function() {
    //Crea un bus  OYENTE
    // SI HAY PROMPT
    eventBus.$off("cargaDoc");   
  },

  data() {
    return {
      colorLoading: '#ff8000',
      cargando:true,
      Referencia: "0",
      LlaveExterna: "",
      NumNivel: "",
      NumDoc: "",

      PROPSDataCMS: divilib.DataCMS,
      mensajeBd: "",
      textBase64: "",
      DataCMS: divilib.DataCMS,
      bdCMS: divilib.BdCMS,
      CMSpeticion: divilib.CMSpeticion,
      ManipulacionCMS: divilib.ManipulacionCMS,
      imageType: 0,
      subeArchivo: false,
      editKey: 0
    };
  },

  computed: {
    getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },
    CMSDataRespuesta() {
      return this.$store.state.DataCMS;
    }
  },
  watch: {
    CMSDataRespuesta: function() {

  // alert("respondiendo "+JSON.stringify(this.CMSDataRespuesta).length)
      if (JSON.stringify(this.CMSDataRespuesta).length>2000)
      { 
        this.cargando=false;
      let data=this.CMSDataRespuesta;
      if (data.Referencia==null)
          data=JSON.parse(this.CMSDataRespuesta); 
     
      if (data.Referencia > "0") {
        //    console.log('Documento Recupera do ',this.textBase64);

        if (
          data.DocumentoMimeType.indexOf("PDF") > 0 ||
          data.DocumentoMimeType.indexOf("pdf") > 0
        ) {
          this.imageType = 1;
          this.textBase64 =
            "data:image/png;base64," + dataRutaDestino;
        }

        if (
          data.DocumentoMimeType.indexOf("mage") > 0 ||
          data.DocumentoMimeType.indexOf("MAGE") > 0
        ) {
          this.imageType = 2;
          this.textBase64 =
            "data:image/png;base64," + data.RutaDestino;
        }
      } else this.mensajeBd = "Problemas para subir Archivo";

      // console.log("tipo imagen",this.CMSDataRespuesta.DocumentoMimeType+"   y  "+ this.imageType);
    }
    }
  },
  methods: {
    //Metodo para recibir  Los datos del componente
 
    downloadFile() {
      this.DataCMS[0].CodCia = this.PROPSDataCMS[0].CodCia;
      this.DataCMS[0].CodigoPeticion = "6"; // recupera imagen
      this.DataCMS[0].Repositorio = this.PROPSDataCMS[0].Repositorio;
      this.DataCMS[0].GuardaArchivo = "B";
      this.DataCMS[0].RutaOrigen = "";
      this.DataCMS[0].ExtensionFinal = this.PROPSDataCMS[0].ExtensionFinal;
      this.DataCMS[0].RutaDestino = "";
      this.DataCMS[0].EntidadCodigo = this.PROPSDataCMS[0].EntidadCodigo;
      this.DataCMS[0].LlaveExterna = this.LlaveExterna;
      this.DataCMS[0].NumNivel = this.NumNivel;
      this.DataCMS[0].NumDoc = this.NumDoc;
      this.DataCMS[0].ReferenciaPadre = this.PROPSDataCMS[0].ReferenciaPadre;
      this.DataCMS[0].Referencia = this.Referencia;
      this.DataCMS[0].ReferenciaPersonalizada = this.PROPSDataCMS[0].ReferenciaPersonalizada;
      this.DataCMS[0].IndicadorAtiendeWs = "";
      this.DataCMS[0].FormatoImagen = this.PROPSDataCMS[0].FormatoImagen;
      this.DataCMS[0].DirectorioCrear = "";
      this.DataCMS[0].DestinoFisico = "";
      this.DataCMS[0].DirectorioSeparatorOrigen = this.PROPSDataCMS[0].DirectorioSeparatorOrigen;
      this.DataCMS[0].InsertarBd = "";
      this.DataCMS[0].DocumentoMimeType = this.PROPSDataCMS[0].DocumentoMimeType;
      this.DataCMS[0].NombreObjeto = this.PROPSDataCMS[0].NombreObjeto;
      this.DataCMS[0].Descripcion = this.PROPSDataCMS[0].Descripcion;
       
       this.DataCMS[0].Extension = divilib.getValueExtension(
        divilib.CMSMimeToExtension,
        this.PROPSDataCMS[0].DocumentoMimeType
      );
      this.DataCMS[0].NuevoNombre = this.PROPSDataCMS[0].NuevoNombre;
      this.DataCMS[0].Thumb = "";
      this.DataCMS[0].Lote = "";
      this.DataCMS[0].FormatoArchivoDestino = this.PROPSDataCMS[0].FormatoArchivoDestino;
      this.DataCMS[0].HashDoc = this.PROPSDataCMS[0].HashDoc;
      this.DataCMS[0].Credencial = this.getProfile.Credencial;


      this.bdCMS[0].Encriptado = "N";
      this.bdCMS[0].TipoGuardado = "";
      this.bdCMS[0].EntidadCodigo = "";
      this.bdCMS[0].InformacionBusqueda = "";
      this.bdCMS[0].TipoRespuesta = "";
      this.bdCMS[0].DirectorioSeparadorOrigen = this.PROPSDataCMS[0].DirectorioSeparatorOrigen;
      this.bdCMS[0].GuardarImagenDestino = "";
      this.bdCMS[0].Directorio = "";
      this.bdCMS[0].IndMultipleEntidad = "";
      this.bdCMS[0].Size = "";

      // console.log("data antes de peticion ",this.DataCMS[0]);
      //Peticion Minuscula

      this.CMSpeticion[0].dml = "";
      this.CMSpeticion[0].datos = divilib.dataCMSToXml(this.DataCMS[0]);
      this.CMSpeticion[0].manipula = divilib.manipulaCMSToXml(
        this.ManipulacionCMS[0]
      );

      this.CMSpeticion[0].bd = divilib.bdCMSToXml(this.bdCMS[0]);

      this.CMSpeticion[0].formatoRequest = "N"; 
      this.CMSpeticion[0].tecnologia="J";
      this.CMSpeticion[0].deserror = "";
      this.CMSpeticion[0].codigoerror = "0";
      this.CMSpeticion[0].Credencial = this.getProfile.Credencial;

      //console.log("recuperando archivo ", JSON.stringify(this.CMSpeticion[0]));
      //cambia a acDsoaPrueba // acDsoa

 
      if (this.DataCMS[0].LlaveExterna > "0")
          { 
            this.$store.dispatch("CMSacDsoa", this.CMSpeticion[0]);
            this.DataCMS[0].LlaveExterna=0;
          }

      else this.mensajeBd = "No hay datos correctos para Guardar ";
    }
  },

  
};
</script>


<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 70%;
    max-width: 90vw;
  }
}
</style>



       