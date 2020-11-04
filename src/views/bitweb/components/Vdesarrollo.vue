<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
 
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="container shape-container d-flex" id="contenido">

          <div class="col px-0">
            <h1 class="display-3 text-white"><span>{{getPublica.titulo}}</span></h1>
            <div class="row">
              <div class="col-sm-8">
                <div class="card">

                  <img  v-if="getPublica.documentos.length==1" :src="getPublica.documentos[0].urlImg" alt="Esta es la imagen">
                  <ccarouselPublicacion v-else :imagenes="getPublica.documentos"  ></ccarouselPublicacion>

                  <!-- Card imagen --> 
                  <img  v-show="getPublica.urlImg" :src="getPublica.documentos[0].urlImg" alt="Esta es la imagen">

                  <!-- Card cuerpo -->
                  <div class="card-body" id="fondo_card"> 

                    <small class="text-muted">Por: {{getPublica.autor}}</small>

                    <p class="card-text mt-4">
                       <div v-html="getPublica.contenido"></div> 
                    </p> 

                    <a href="javascript:history.back()" class="btn btn-link px-0">Volver</a>
                  </div>
                </div>
              </div> 
             
               <!-- inicio del panel lateral -->
              <div class="col-sm-4"> 
                  <cdocumentos></cdocumentos>
                  <cvideo></cvideo> 
                  <cformulario></cformulario> 
              </div>
              <!-- fin del panel lateral -->

              
          </div>
         </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cvideo from "./cvideo";
//import cdocumentos from "./components/cdocumentos";
//import cformulario from "./components/cformulario"; 
import ccarouselPublicacion from "./ccarouselPublicacion";

export default {
   components: 
    { 
     cvideo,
     //cdocumentos,
     //cformulario,
     ccarouselPublicacion
   }, 
  
   created() {  
      //busca la publicacion que viene como parametro
      let publicacion=this.$route.params.publicacion;
       
      let pedido= {
                    dml: "JU",
                    Credencial: this.getProfile.Credencial,
                    ObjectId: "8107C",
                    formatoenvio: "N",
                    formatorecibe: "N", 
                    publicacion:publicacion,
                    categoria: 98  //busca la noticia especifica
                };  
        
         this.$store.dispatch("BitWeb/acDsoaPublicaciones", pedido);
 
  }, 
  beforeMount() { 
    
  },

// Cuando se monta la aplicacion
  mounted() {
    
  },

  computed: 
  { 
    getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
    getPublica() {
      return this.$store.state.BitWeb.desarrollo;
    }, 

/*
    getDocumentos() {
      return this.$store.state.desarrollo;
    }, 

    getVideos() {
      return this.$store.state.desarrollo;
    }, 
    */
  },

  data() {
    return { 
      //APP
       activaEdit: false, 
     
    };
  },

  methods: {   
       
    //PARA EDITAR
    onDoubleClicked(event) { 
      //LIMPIA TABLEKEY
       let dinamicKey = []; 
      
    }, 

     

    /////////////////
  } 
} 
  
   
</script>

<style scoped>
#clases {
  border: solid 1px red;
}

#contenido{
  margin-top: -90px;
}

.descarga{
  font-size: 20px;
  text-align: center;
  margin-top: -40px;
  color:white;
  padding-bottom: 10px;
}


#fondo_card{
background-color: white;

}
</style>
