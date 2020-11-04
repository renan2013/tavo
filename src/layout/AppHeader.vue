<template>
  <header class="header-global" id="menucillo">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <div class="logo">
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/logo_cefi.png" alt="logo"  />
      </router-link>
      </div>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="#">
            <img src="img/logo_cefi.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            

            <span class="nav-link-inner--text"><i class="ni ni-badge"></i>&nbsp;Nuevo Ingreso</span>
          </a>
          <div class="dropdown-menu-inner">
            <a
              href="#"
              class="media d-flex align-items-center"
            >
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <router-link to="/vingreso">
                  <h6 class="heading text-primary mb-md-1">Nuevo Ingreso a CEFI</h6>
                </router-link>
                <p class="description d-none d-md-inline-block mb-0">
                  Realiza una prematrícula ya!!
                </p>
              </div>
            </a>
            <a href="#" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-ui-04"></i>
              </div>
              <div class="media-body ml-3">
              <router-link to="/vpreguntas">
                <h5 class="heading text-warning mb-md-1">Preguntas Frecuentes</h5>
              </router-link>
                <p class="description d-none d-md-inline-block mb-0">
                  Despeje sus dudas y tome una decisión
                </p>
              </div>
            </a>
          </div>
        </base-dropdown>
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            
            <span class="nav-link-inner--text"><i class="ni ni-tv-2"></i>&nbsp;Clases</span>
          </a>
          <a href="http://ceficr.com/virtual" target="_blank" class="dropdown-item"><i class="ni ni-cloud-download-95"></i>Clase Virtual</a>
          <router-link to="/vpreregistrovirtual" class="dropdown-item"><i class="ni ni-badge"></i>Pre Registro Virtual</router-link>
          <router-link to="/vclasevirtual" class="dropdown-item"><i class="ni ni-check-bold"></i>Acreditaciones</router-link>

          

          <!-- <router-link to="/register" class="dropdown-item">Register</router-link> -->
        </base-dropdown>

        <router-link to="/vlistacarreras" class="nav-link"><i class="ni ni-check-bold"></i>&nbsp;Carreras Técnicas</router-link>

        <router-link to="/vquienessomos" class="nav-link"><i class="ni ni-single-02"></i>&nbsp;Quienes Somos</router-link>

        <router-link to="/vcontacto" class="nav-link"><i class="ni ni-pin-3"></i>&nbsp;Contacto</router-link>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            href="https://www.facebook.com/437762640108516/photos/d41d8cd9/472530079965105/"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="Visitanos en facebook"
          >
            <h3><i class="fa fa-facebook-square"></i></h3>
            <span class="nav-link-inner--text d-lg-none">Facebook</span>
          </a>
        </li>
        

        <!-- <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a href="https://www.creative-tim.com/product/vue-argon-design-system" target="_blank" rel="noopener"
                       class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                  <i class="fa fa-cloud-download mr-2"></i>
                </span>
                        <span class="nav-link-inner--text">Download</span>
                    </a>
        </li>-->
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>


<style>

.fa-facebook-square{
  color:white;
}

#menucillo{
  
}

</style>
