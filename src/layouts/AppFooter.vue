<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-primary font-weight-light mb-2">
            "Somos el aliado que necesita, Nuestros servicios se orientan a que
            Sus envios lleguen a tiempo y seguros, Somos Tavo Mensajeria"
          </h3>
          <h4 class="mb-0 font-weight-light">
            <a
              href="http://ceficr.com/#/vcontacto"
              class="nav-link"
              target="_blank"
              rel="noopener"
              >Contacto</a
            >
          </h4>
        </div>

        <div class="col-lg-6 text-lg-center btn-wrapper">
          <a
            target="_blank"
            rel="noopener"
            href="https://www.facebook.com/437762640108516/photos/d41d8cd9/472530079965105/"
            class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
            data-toggle="tooltip"
            data-original-title="Like us"
            title="Ir a Facebook de CEFI"
          >
            <i class="fa fa-facebook-square"></i>
          </a>
        </div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a
              href="https://www.grupodivisoft.com"
              target="_blank"
              rel="noopener"
              >developed by grupodivisoft</a
            >
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a
                href="http://ceficr.com/#/vlistacarreras"
                rel="noopener"
                class="nav-link"
                >Quienes Somos</a
              >
            </li>

            <li class="nav-item">
              <a
                href="http://ceficr.com/#/vingreso"
                rel="noopener"
                class="nav-link"
                >Oficinas</a
              >
            </li>

            <li class="nav-item">
              <a
                href="http://ceficr.com/#/vquienessomos"
                class="nav-link"
                rel="noopener"
                >Servicios</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
