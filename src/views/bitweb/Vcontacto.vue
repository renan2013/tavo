<template>
<div>
  <div class="position-relative">
      <!-- shape Hero -->
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </section>

    <div class="container pt-lg-md" id="contenido6">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <h1 class="display-3 text-white">
            <span>Donde Estamos</span>
          </h1>
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
            
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7862.087202797418!2d-84.3167547738607!3d9.846705192634236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1ab26489ec1b1%3A0x30faffe4290c0ed2!2sSan%20Jos%C3%A9%2C%20Santiago!5e0!3m2!1ses-419!2scr!4v1593974939466!5m2!1ses-419!2scr"
              width="100%"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
            <div class="datos">
              <br>
                <h5>CEFI - Región Caribe - Región Central</h5> <br>
                <strong>8992-9180  -  2416-7031 </strong> -  Gestión Administrativa <strong>8992-8199</strong> <br><br>
                Tu futuro, tu eleción


            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
  <Cbotonwatsapp></Cbotonwatsapp>
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
#contenido6{
  margin-top: -150px;
}

.datos{
  text-align: center;
}
</style>
