<template>
    <div id="search-page">
         <h1>El Cambio de Clave se realizo Exitosamente</h1>


         <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                <vs-button type="border" to="/pages/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Ir a Logearse de Nuevo</vs-button>
                                <vs-button
                                 class="w-full sm:w-auto"
                                 @click="realizaCambio()" 
                                   realizaCambio>Regresar</vs-button>
                            </div>
      </div>


       
</template>
 <script>
import router from '@/router'
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";
export default { 
    destroyed() 
         {
           router.push("/pages/login")
           },
      methods: {
  
        realizaCambio: function ()
         {
            router.push("/pages/login")
         }     
     }      

 }
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/search.scss";
</style>
