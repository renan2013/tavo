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
        <div class=" shape-container d-flex" id="imagen">
            <simple-carousel-container loop :watch-it="photos"  >
                
                <simple-carousel-item  v-for="(photo, index) in photos" :key="index" v-bind:autoplay="true" v-bind:loop="true">
                    <img :src="photo">
                </simple-carousel-item>
              
            </simple-carousel-container>
          
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>


  </div>
</template>

<script>
    import { SimpleCarouselContainer, SimpleCarouselItem } from 'vue-simple-carousel';
    export default {
      components: {
        SimpleCarouselContainer,
        SimpleCarouselItem
      },
      created()
      {

      },
      data() {
        return {
          photos: [
            'img/slides/slide1.jpg',
            'img/slides/slide2.jpg',
            'img/slides/slide3.jpg',
          ]       
        }
      }
    };
</script> 

<style >
#imagen img{
    width:100%;
    
}

#imagen{
    margin-top: -200px;
}




</style>
