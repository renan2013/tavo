<template>
  <div>
   <div class="logo3"><Carousel></Carousel></div> 
    <div class="presentacion"><Carousel2></Carousel2></div>
    <div class="sintesis_index"><Hero></Hero></div>
    <Cbotonwatsapp></Cbotonwatsapp>
    
  
  </div>
</template>
<script>
import Carousel       from "./views/bitweb/components/Carousel"
import Carousel2      from "./views/bitweb/components/Carousel2"

import Hero    from "./components/Hero";
//import Cbotonwatsapp from "./components/Cbotonwatsapp";

export default {
  name: "components",
  components: {
    Carousel2,
    Hero,
  //  Cbotonwatsapp,
    Carousel
  }
};
</script>

<style>

/* Smartphones (landscape) */
@media only screen 
and (min-width : 321px) {
  .presentacion{
    display: none;
  }


}

/* Ordenadores de sobremesa y portátiles */
@media only screen 
and (min-width : 1224px) {
  .logo3{
    display: none;
  }

   .presentacion{
    display: block;
  }
}



</style>
