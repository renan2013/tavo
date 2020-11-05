<template>
  <div id="profile-page">
    <!-- PROFILE HEADER -->
    <div class="profile-header">
      
      <div class="relative">
        <div class="cover-container rounded-t-lg">
          <img
            src="@/assets/images/pages/b1_tavo.jpg"
            alt="user-profile-cover"
            class="responsive block"
          />
        </div>
        <div class="profile-img-container pointer-events-none" >
          <div id="avatar">
            <vs-avatar
              class="user-profile-img"
              src="https://whattype.com/wp-content/uploads/2018/06/steve-jobs-1.jpg"
              size="120px"
              
            />
          </div>
        </div>
      </div>
    </div>
      <!--aqui irian las tres columnas de los datos de quienes somos -->

       <div class="vx-row">
            <!-- COL 1 -->
            <div class="vx-col w-full lg:w-1/4">
                <!-- ABOUT CARD -->
                <vx-card title="" class="mt-base">
                    <!-- ACTION SLOT -->
                    
                    <br>
                    <!-- USER BIO -->
                    <div class="user-bio">
                        <p><strong>Somos el aliado que necesita.</strong> Nuestros servicios se orientan a que sus envios lleguen a tiempo y seguros. Somos Tavo Mensajería</p>
                    </div>

                    <!-- OTEHR DATA -->
                    <div class="mt-5">
                        <h6>Oficinas:</h6>
                        <p>PURISCAL Contiguo a la terminal de buses COMTRASULI</p>
                        <p>SAN JOSÉ Detrás de la terminal de buses COMTRASULI</p>
                    </div>

                    

                    <div class="mt-5">
                        <h6>Email:</h6>
                        <p>info@tavocr.com</p>
                    </div>

                    <div class="mt-5">
                        <h6>Website:</h6>
                        <p>www.tavocr.com</p>
                    </div>

                    <div class="social-links flex mt-4">
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="FacebookIcon"></feather-icon>
                      
                    </div>
                </vx-card>

                
            </div>

            <!-- COL 2 -->
            <div class="vx-col w-full lg:w-1/2">
                <vx-card class="mt-base" >
                    <div>
                        
                            <h3>Misión</h3>
                            <p>jfhsdgdgsfhgdhf hjsdfghgdfhgdhf hdgfhdgf hfghgdfh</p>

                            <h3>Nuestra Visión</h3>
                            <p>jfhsdgdgsfhgdhf hjsdfghgdfhgdhf hdgfhdgf hfghgdfh</p>
                        
                    
                        

                        
                    </div>
                </vx-card>
            </div>

            <!-- COL 3 -->
            <div class="vx-col w-full lg:w-1/4">

                <!-- LATEST PHOTOS -->
                <vx-card title="Nuestro Equipo" class="mt-base">
                    <div class="vx-row pt-2">
                        <div class="vx-col w-1/2 sm:w-1/2 md:w-1/2 xl:1/4" v-for="(img, index) in userLatestPhotos" :key="index">
                            <img :src="img" alt="latest-upload" class="rounded mb-4 user-latest-image responsive">
                        </div>
                    </div>
                </vx-card>

                


            </div>
        </div>



      
    
  </div>
</template>




<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  data() {
    return {
      isNavOpen: false,
      userPoll: "",
      user_info: {
        profile_img: require("@/assets/images/profile/user-uploads/user-13.jpg"),
        cover_img: require("@/assets/images/profile/user-uploads/cover.jpg"),
      },
      mediaExtensions: {
        img: ["jpg", "jpeg", "png", "bmp", "gif", "exif", "tiff"],
        video: ["avi", "flv", "wmv", "mov", "mp4", "3gp"],
      },
      userLatestPhotos: [
        require("@/assets/images/profile/user-uploads/user-01.jpg"),
        require("@/assets/images/profile/user-uploads/user-02.jpg"),
        require("@/assets/images/profile/user-uploads/user-04.jpg"),
        require("@/assets/images/profile/user-uploads/user-03.jpg")
      ],
      
      
     
    
      wasSidebarOpen: null,
    };
  },
  computed: {
    mediaType() {
      return (media) => {
        if (media.img) {
          const ext = media.img.split(".").pop();
          if (this.mediaExtensions.img.includes(ext)) return "image";
        } else if (media.sources && media.poster) {
          // other validations
          return "video";
        }
      };
    },
    playerOptions() {
      return (media) => {
        return {
          height: "360",
          fluid: true,
          autoplay: false,
          muted: true,
          language: "en",
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: media.sources,
          poster: media.poster,
        };
      };
    },
  },
  methods: {
    loadContent() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-load-more-posts",
        scale: 0.45,
      });
      setTimeout(() => {
        this.$vs.loading.close("#button-load-more-posts > .con-vs-loading");
      }, 3000);
    },
  },
  components: {
    videoPlayer,
  },
  mounted() {
    this.wasSidebarOpen = this.$store.state.reduceButton;
    this.$store.commit("TOGGLE_REDUCE_BUTTON", true);
  },
  beforeDestroy() {
    if (!this.wasSidebarOpen) this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";

#avatar{
  
  margin-top:-30px;
  z-index: 1;
}
</style>
