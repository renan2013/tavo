<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <p>

        </p>
        <span class="md:flex hidden items-center">
        <p>
          <a href="https://1.envato.market/vuexy_admin" target="_blank" rel="nofollow">Divisoft&copy; </a>
                    <span>{{ new Date().getFullYear() }} </span>
          <span class="hidden sm:inline-block">, Todos los derechos reservados</span>
        </p>
        </span>
    </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
