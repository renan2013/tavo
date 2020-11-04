<!-- =========================================================================================
    File Name: Voficinas.vue
    Description: Knowledge Base Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="knowledge-base-page">
    <!-- KNOWLEDGE BASE CARDS  -->
    <div class="vx-row my-8">
      <div
        class="vx-col w-full md:w-1/8 sm:w-1/2 mb-base"
        v-for="item in filteredKB"
        :key="item.id"
        @click="$router.push(item.url).catch(() => {})"
      >
        <vx-card class="text-center cursor-pointer">
          <div class="google-maps">
            <iframe
              :src="item.url"
              width="500"
              height="250"
              frameborder="0"
              style="border: 0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
          <h4 class="mb-2 my-8">{{ item.title.toUpperCase() }}</h4>
          <p>{{ item.description }}</p>
          <p>Horario: {{ item.horario }}</p>
          <p>Teléfono: {{ item.phone }}</p>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      knowledgeBaseSearchQuery: "",
      kb: [
        {
          id: 1,
          title: "Oficina Puriscal",
          description: "Contiguo a la terminal de buses COMTRASULI",
          phone: "2416 4814 / 2416-4365",
          horario: "Lunes a Viernes: 7:00am - 6:30pm",
          graphic: require("@/assets/images/pages/graphic-1.png"),
          url:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.0597627490883!2d-84.31912288528284!3d9.845347978379442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1ab28d12336bb%3A0x95a556e614e0050b!2sServi%20Mensajeria%20Tavo!5e0!3m2!1ses-419!2scr!4v1603921625900!5m2!1ses-419!2scr&zoom=9",
        },
        {
          id: 2,
          title: "Oficina San José",
          description: "Detrás de la terminal de buses COMTRASULI",
          phone: "2256-0105 / 8879-0449",
          horario: "Lunes a Viernes: 7:00am - 5:00pm",
          graphic: require("@/assets/images/pages/graphic-2.png"),
          url:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1652.3514072814037!2d-84.08679648649736!3d9.935946411620789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3591e554d29%3A0x48ed4e3667e5ab73!2sServi%20Mensajer%C3%ADa%20Tavo!5e0!3m2!1ses-419!2scr!4v1603924536385!5m2!1ses-419!2scr&zoom=9",
        },
      ],
    };
  },
  computed: {
    filteredKB() {
      return this.kb.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase())
      );
    },
  },
  methods: {},
  components: {},
};
</script>
<style>
.google-maps {
  position: relative;
  padding-bottom: 50%;
  height: 0;
  overflow: hidden;
}
.google-maps iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>
