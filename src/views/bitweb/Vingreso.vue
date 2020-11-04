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
        <div class="container shape-container d-flex" >
             
          <div class="col px-0" id="contenido3">
            
       
            <div class="row">
          
              <div class="col-lg-6">
                <img src="https://0201.nccdn.net/1_2/000/000/164/e31/Nuevo-ingreso-540x360.png" width="95%">
                 <div class="btn-wrapper">
                  
                </div>
              </div>
              <Cbotonwatsapp></Cbotonwatsapp>

                <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  Prepárate estudiando en CEFI y transforma tu futuro
                  <span>Lo único que necesitas son ganas de superación y la constancia que hará que tus sueños se vuelvan realidad.</span>
                </h1>
                
               
              </div>
            </div>
            <br>

            <h1 class="display-3 text-white">Formulario de Prematrícula</h1>

          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>


  </div>
</template>

<script>
import Cbotonwatsapp from "./components/Cbotonwatsapp.vue";
export default {
  name: "home",
  components: {
    Cbotonwatsapp
  }
};
</script>

<style>
#contenido3{
  margin-top: -170px;
  
}
</style>
