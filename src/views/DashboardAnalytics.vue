<template>
  <div>
    <div class="logo3"><Carousel></Carousel></div>
    <div class="presentacion"><Carousel2></Carousel2></div>
    <p></p>
    <p></p>
    <p></p>
    <div class="sintesis_index"><Servicios /></div>
  </div>
</template>
<script>
import Carousel from "@/views/bitweb/components/Carousel.vue";
import Carousel2 from "@/views/bitweb/components/Carousel2.vue";
import Servicios from "@/views/bitweb/Vservicios.vue";

//import Hero    from "./components/Hero";

export default {
  name: "components",
  components: {
    Carousel2,
    //  Hero,
    Servicios,
    Carousel,
  },
};
</script>

<style>
/* Smartphones (landscape) */
@media only screen and (min-width: 321px) {
  .presentacion {
    display: none;
  }
}

/* Ordenadores de sobremesa y portátiles */
@media only screen and (min-width: 1224px) {
  .logo3 {
    display: none;
  }

  .presentacion {
    display: block;
  }
}
</style>
