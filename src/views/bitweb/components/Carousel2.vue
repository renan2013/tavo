 <template>
  <section
    class="section section-lg section-shaped overflow-hidden my-0"
    id="carousel3"
  >
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>
      <div class="alinear">
        <b-carousel
          id="carousel-no-animation"
          style="text-shadow: 0px 0px 2px #000"
          no-animation
          indicators
          img-width="1024"
          img-height="480"
        >
          <!--
       
 publicacionesMulti{{publicacionesMulti}}
        {{catSlider }}
      {{slider}}
       {{publicacionesMulti }}
       -->

          <b-carousel-slide
            v-for="(item, index) in publicacionesMulti"
            :key="index"
            :img-src="item.urlImg"
          >
            <div class="leyenda">
              <!-- poner estos divs -->
              <div id="titulo">
                <div id="subir">{{ item.titulo }}</div>
              </div>
              <h4>{{ item.contenido }}</h4>

              <router-link v-if="item.link" :to="item.link">
                <base-button tag="a" type="primary" class="mt-4">{{
                  item.detalle
                }}</base-button>
              </router-link>

              <router-link v-else v-show="item.link2" :to="item.link2">
                <base-button tag="a" type="primary" class="mt-4">{{
                  item.detalle
                }}</base-button>
              </router-link>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </section>
</template>

<script>
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";
import { mapState } from "vuex";

export default {
  components: {
    BCarousel,
    BCarouselSlide,
  },
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
      categoria: this.catSlider,
    };
    //if (this.getSlider[0].titulo=="0")
    this.$store.dispatch("BitWeb/acDsoaPublicaciones", pedido);
  },
  data() {
    return {
      prueba: "",
    };
  },
  computed: {
    getProfile() {
      return this.$store.state.dsoaLogin.profile[0];
    },

    catSlider() {
      return this.$store.state.BitWeb.catSlider;
    },
    slider() {
      return this.$store.state.BitWeb.slider;
    },
    publicacionesMulti() {
      return this.$store.state.BitWeb.publicacionesMulti;
    },
  },
  updated() {},

  beforeDestroy() {},
};
</script>
<style>
.texto {
  /* border: solid 1px red; */
  width: 100%;
  text-align: left;
}
.alinear {
  margin-top: px;
}
.leyenda {
  text-align: left;
}

.alinear a:link {
  color: white;
}

#subir {
  font-size: 24px;
  padding-left: 10px;
  color: white;
  margin-top: -20px;
}

#titulo {
  background-color: black;
  opacity: 0.9;
  width: 50%;
}

#carousel3 {
  /* border:solid 1px red; */
}
</style>

 