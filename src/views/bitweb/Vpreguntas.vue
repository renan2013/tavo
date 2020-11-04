<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section  id="contenido4">
      <div class="container"  >
        <card shadow class="card-profile mt--300"  no-body>
          <div class="px-4">
            <div class="row justify-content-center" >
              <div class="col-lg-3 order-lg-2" >
                <div class="card-profile-image"  >
                  <a href="/">
                    <img
                      v-lazy="'img/logo_cefi_blanco.jpg'"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  	<a href="https://api.whatsapp.com/send?phone=50683790449&text=Tengo%20inter%C3%A9s%20en%20el%20t%C3%A9cnico%20de:" class="whatsapp" target="_blank"> <i class="fa fa-whatsapp whatsapp-icon"></i></a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">120</span>
                    <span class="description">Cursos</span>
                  </div>
                  <div>
                    <span class="heading">10</span>
                    <span class="description">Carreras Técnicas</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <Cbotonwatsapp></Cbotonwatsapp>
              <h3>
                PREGUNTAS FRECUENTES
                
              </h3>
        <div class="preguntas">
              <h5>Primera Pregunta</h5>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fuga magnam sunt, tempore mollitia totam quaerat quisquam omnis officiis est amet eum laboriosam explicabo eaque incidunt cupiditate odio doloremque minus?</span>
              <br><br>

               <h5>Primera Pregunta</h5>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fuga magnam sunt, tempore mollitia totam quaerat quisquam omnis officiis est amet eum laboriosam explicabo eaque incidunt cupiditate odio doloremque minus?</span>
              <br><br>

               <h5>Primera Pregunta</h5>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fuga magnam sunt, tempore mollitia totam quaerat quisquam omnis officiis est amet eum laboriosam explicabo eaque incidunt cupiditate odio doloremque minus?</span>
              <br><br>

               <h5>Primera Pregunta</h5>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fuga magnam sunt, tempore mollitia totam quaerat quisquam omnis officiis est amet eum laboriosam explicabo eaque incidunt cupiditate odio doloremque minus?</span>
              <br><br>
        </div>      

              
            </div>

            
          </div>
        </card>
      </div>
    </section>
  </div>
</template>


<script>
import Cbotonwatsapp from "./components/Cbotonwatsapp";
export default {
  components: {
    
    Cbotonwatsapp
  }
};
</script>
<style>
#contenido4 {
  
  
  margin-top: -430px;
  
}

#logo{
  background-color: white;
  
}

.whatsapp {
  position:fixed;
  width:60px;
  height:60px;
  bottom:40px;
  right:40px;
  background-color:#25d366;
  color:#FFF;
  border-radius:50px;
  text-align:center;
  font-size:30px;
  z-index:100;
}

.whatsapp-icon {
  margin-top:13px;
}

.preguntas{
    text-align: left;
}


</style>
