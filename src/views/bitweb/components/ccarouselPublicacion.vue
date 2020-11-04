<template>
    <div >
        <b-carousel 
          id="carousel-no-animation"
          style="text-shadow: 0px 0px 2px #000"
          no-animation
          indicators
          img-width="1024"
          img-height="480"
        >
        <b-carousel-slide v-for="(item, index) in imagenes" :key="index" :img-src="item.urlImg">

        </b-carousel-slide>
        </b-carousel>
      
    </div>
  
</template>
<script>
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";
  import { mapState } from "vuex";

export default {
  components: {
    BCarousel,
    BCarouselSlide
  },
   props: {
    imagenes: {
      type: Array
    },
  },


   data() {
        return { 
             prueba:""
            } 
   }, 
}
</script>


<style>

</style>
