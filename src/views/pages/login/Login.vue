

<template>
  <div
    class="h-screen flex w-full full-page-bg-color vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4" id="login2">
      
        
          <div class="vx-row no-gutter justify-center items-center">
            
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4" >
                  
                  <img
                    src="@/assets/images/logo/logo_tavo_rojo.svg"
                    alt="login"
                    class="mx-auto"
                  />
                  <vs-divider><h5>Login</h5></vs-divider>
                </div>
                <div class="desoa">
                <LoginDsoa></LoginDsoa>
                </div>
              </div>
            
          </div>
          <br>
        
      
    </div>
    
  </div>
</template>


<script>
import LoginDsoa from "./LoginDsoa.vue";

export default {
  components: {
    LoginDsoa,
  },
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
img{
  width:270px;
  display:block;
  margin:auto;
 

}

#caja{
  border:solid 1px red;
  background-color:red;
}

.desoa{
  
  margin-top:-40px;
}

#login2{
  
}



</style>
