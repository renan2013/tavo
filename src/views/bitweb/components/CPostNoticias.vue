<template>
  <div class="container" id="post">
    <div class="col-lg-12">
      <div class="card-columns" id="sintesis_index">
        <div class="card" v-for="(item, index) in getSlider" :key="index">
          <img class="card-img-top" :src="item.img" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{item.titulo}}</h5>
            <p class="card-text">{{item.sintesis}}</p>
            <router-link to="/vdesarrollo">
              <base-button tag="a" type="primary" class="mt-4">Ver programa completo</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      prueba: ""
    };
  },
  computed: {
    getSlider() {
      return this.$store.state.sintesis;
    }
  }
};
</script>

<style>
.card-body {
  background-color: #eae8e8;
}
#post {
  /* border: solid 1px red; */
  margin-top: -50px;
}
#sintesis_index {
  font-size: 2rem;
  text-align: center;
}

#sintesis_index a:link {
  color:white;
}
</style>
