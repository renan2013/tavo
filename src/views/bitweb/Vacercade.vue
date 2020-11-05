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
                <vx-card class="mt-base" v-for="(post, index) in userPosts" :key="index">
                    <div>
                        <!-- POST HEADER -->
                        <div class="post-header flex justify-between mb-4">
                            <div class="flex items-center">
                                <div>
                                    <vs-avatar class="m-0" :src="userLatestPhotos[0]" size="45px"></vs-avatar>
                                </div>
                                <div class="ml-4">
                                    <h6>{{ post.author }}</h6>
                                    <small>{{ post.time | date(true) }} at {{ post.time | time }}</small>
                                </div>
                            </div>
                            <div class="flex">
                                <feather-icon class="ml-4" icon="HeartIcon" :svgClasses="{'text-danger fill-current stroke-current': post.isLiked}"></feather-icon>
                            </div>
                        </div>

                        <!-- POST CONTENT -->
                    
                        

                        
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
        require("@/assets/images/profile/user-uploads/user-03.jpg"),
        require("@/assets/images/profile/user-uploads/user-05.jpg"),
      ],
      userPosts: [
        {
          author: "Leeanna Alvord",
          time: "Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)",
          isLiked: true,
          text:
            "I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.",
          media: [{ img: require("@/assets/images/profile/post-media/2.jpg") }],
          
          commentbox: "",
          usersCommented: [
            {
              comment: "orthoplumbate morningtide naphthaline exarteritis",
              author: "Kitty Allanson",
              img: require("@/assets/images/portrait/small/avatar-s-6.jpg"),
              time: "Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)",
            },
            {
              comment: "blockiness pandemy metaxylene speckle coppy",
              author: "Jeanie Bulgrin",
              img: require("@/assets/images/portrait/small/avatar-s-8.jpg"),
              time: "Mon Dec 10 2018 08:55:00 GMT+0000 (GMT)",
            },
          ],
        },
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
