<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Recuperar contraseña</h4>
                                    <p>Por favor ingrese su correo electrónico, le enviaremos las instrucciones para realizar el cambio de clave.</p>
                                </div>

                                <vs-input type="email" label-placeholder="Correo electrónico" v-model="DIR_EMAIL" class="w-full mb-8" />
                                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Regresar al Login</vs-button>
                                <vs-button class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Recuperar Contraseña</vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value1: ''
    }
  }
}
</script>
