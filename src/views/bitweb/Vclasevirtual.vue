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
        <div class="container shape-container d-flex">
          <div class="col px-0" id="contenido6">
            <div class="row">
              
              <div class="col-lg-12">
                <h1 class="display-3 text-white">
                  Acreditaciones de CEFI
                  
                </h1>
                <br />
                <div class="row justify-content-center">
                  <div class="col-lg-12">
                    <div class="row row-grid">
                     
                      
                      <div class="col-lg-3">
                         
                        <card class="border-0" hover shadow body-classes="py-5" >
                          <h5>Afiliado a CEFI</h5>
                          <br>
                          <img
                            src="@/assets/imagenes/canaep.webp"
                            width="100%"
                          />

                        </card>
                      </div>
                      
                      <div class="col-lg-3">
                        <card class="border-0" hover shadow body-classes="py-5">
                          <h5>Afiliado a CEFI</h5>
                          <br>
                          <img
                            src="@/assets/imagenes/fecoprobe.svg"
                            width="100%"
                          />
                        
                        </card>
                      </div>
                      
                  
                   


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cbotonwatsapp></Cbotonwatsapp>
      <!-- 1st Hero Variation -->
    </div>
  </div>
</template>

<script>
import Cbotonwatsapp from "./components/Cbotonwatsapp";
export default {
  name: "home",
  components: {
    Cbotonwatsapp
  }
};
</script>

<style scoped>
#clases {
  border: solid 1px red;
}
.col-lg-3{
  text-align: center;
}

#contenido6{
  margin-top: -180px;
}


</style>
