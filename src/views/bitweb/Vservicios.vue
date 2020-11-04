<!-- =========================================================================================
  File Name: Vservicios.vue
  Description: Dashboard Analytics
========================================================================================== -->
<template>
  <div id="demo-basic-card">
    <div class="vx-row">
      <!-- CARD WITH TABS COMPONENT -->
      <div
        class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base"
        v-for="(item, index) in publicacionesCortas"
        :key="index"
      >
        <vx-card>
          <img
            :src="item.urlImg"
            alt="content-img"
            class="responsive rounded-lg"
          />
          <div class="my-6">
            <h5 class="mb-2">{{ item.titulo }}</h5>
            <p class="text-grey">{{ item.contenido }}</p>
          </div>
          <vs-divider></vs-divider>
          <router-link v-if="item.link" :to="item.link">
            <vs-button
              tag="a"
              type="gradient"
              color="#7367F0"
              gradient-color-secondary="#CE9FFC"
              class="w-full mt-4"
              >{{ item.detalle }}</vs-button
            >
          </router-link>

          <router-link v-else v-show="item.link2" :to="item.link2">
            <vs-button
              tag="a"
              type="gradient"
              color="#7367F0"
              gradient-color-secondary="#CE9FFC"
              class="w-full mt-4"
              >{{ item.detalle }}</vs-button
            >
          </router-link>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    //carga los publicaciones basicas
    let pedido = {
      dml: "JU",
      Credencial: this.getProfile.Credencial,
      ObjectId: "8107E",
      ObjectId2: "8105C", // el de las publicaciones
      formatoenvio: "N",
      formatorecibe: "N",
      indicador: "3",
      categoria: this.catPubCorta, //catPubCorta,
    };

    this.$store.dispatch("BitWeb/acDsoaPublicaciones", pedido);
  },

  computed: {
    getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },

    catPubCorta() {
      return this.$store.state.BitWeb.catPubCorta;
    },

    publicacionesCortas() {
      return this.$store.state.BitWeb.publicacionesCortas;
    },
  },
};
</script>

<style lang="scss">
#demo-basic-card {
  .overlay-card {
    .vx-card__collapsible-content {
      max-height: 485px;
    }
  }
}
</style>
