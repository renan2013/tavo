<!-- =========================================================================================
  File Name: Vacercade.vue
  Description: Profile Page
========================================================================================== -->
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
        <div class="profile-img-container pointer-events-none">
          <div>
            <vs-avatar
              class="user-profile-img"
              src="@/assets/images/pages/b1_tavo.jpg"
              size="85px"
            />
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end flex-wrap profile-header-nav p-6"
      >
        <div class="block sm:hidden">
          <feather-icon
            @click="isNavOpen = !isNavOpen"
            icon="AlignJustifyIcon"
            v-show="!isNavOpen"
            class="vx-navbar-toggler cursor-pointer"
          />
          <feather-icon
            icon="XIcon"
            v-show="isNavOpen"
            @click="isNavOpen = !isNavOpen"
            class="vx-navbar-toggler cursor-pointer"
          />
        </div>
        <div
          :class="isNavOpen ? 'block' : 'hidden'"
          class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
        >
          <div class="text-sm sm:flex-grow">
            <ul
              class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-3/4"
            >
              <li class="p-2 sm:p-0">
                <router-link to="/vdesarrollo/11">Puntualidad</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/vdesarrollo/12">Responsabilidad</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/vdesarrollo/13">Servicio</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <vx-navbar> -->
      <!-- </vx-navbar> -->
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
      ],
      userPosts: [
        {
          author: "Leeanna Alvord",
          time: "Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)",
          isLiked: true,
          text:
            "I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.",
          media: [{ img: require("@/assets/images/profile/post-media/2.jpg") }],
          likes: 145,
          comments: 77,
          usersLiked: [
            {
              name: "Trina Lynes",
              img: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
            },
          ],
          commentbox: "",
          usersCommented: [
            {
              comment: "orthoplumbate morningtide naphthaline exarteritis",
              author: "Kitty Allanson",
              img: require("@/assets/images/portrait/small/avatar-s-6.jpg"),
              time: "Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)",
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
</style>



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
          likes: 145,
          comments: 77,
          usersLiked: [
            {
              name: "Trina Lynes",
              img: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
            },
            {
              name: "Lilian Nenez",
              img: require("@/assets/images/portrait/small/avatar-s-2.jpg"),
            },
            {
              name: "Alberto Glotzbach",
              img: require("@/assets/images/portrait/small/avatar-s-3.jpg"),
            },
            {
              name: "George Nordick",
              img: require("@/assets/images/portrait/small/avatar-s-4.jpg"),
            },
            {
              name: "Vennie Mostowy",
              img: require("@/assets/images/portrait/small/avatar-s-5.jpg"),
            },
          ],
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
      suggestedPages: [
        {
          img: require("@/assets/images/profile/pages/page-09.jpg"),
          title: "Rockose",
          type: "Company",
        },
        {
          img: require("@/assets/images/profile/pages/page-08.jpg"),
          title: "The Devil's",
          type: "Clothing Store",
        },
        {
          img: require("@/assets/images/profile/pages/page-03.jpg"),
          title: "The Magician",
          type: "Public Figure",
        },
        {
          img: require("@/assets/images/profile/pages/page-02.jpg"),
          title: "AC/DC",
          type: "Music",
        },
        {
          img: require("@/assets/images/profile/pages/page-07.jpg"),
          title: "eat hard",
          type: "restaurant / bar",
        },
        {
          img: require("@/assets/images/profile/pages/page-04.jpg"),
          title: "B4B",
          type: "Beauty Store",
        },
        {
          img: require("@/assets/images/profile/pages/page-05.jpg"),
          title: "Kylie Jenner",
          type: "Public Figure",
        },
        {
          img: require("@/assets/images/profile/pages/page-01.jpg"),
          title: "RDJ",
          type: "Actor",
        },
        {
          img: require("@/assets/images/profile/pages/page-06.jpg"),
          title: "Taylor Swift",
          type: "Music",
        },
      ],
      polls: [
        {
          id: 59,
          title: "Who is the best actor in Marvel Cinematic Universe?",
          options: [
            {
              text: "RDJ",
              value: "rdj",
              voted: 58,
              usersVoted: [
                {
                  name: "Tonia Seabold",
                  avatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
                },
                {
                  name: "Carissa Dolle",
                  avatar: require("@/assets/images/portrait/small/avatar-s-5.jpg"),
                },
                {
                  name: "Kelle Herrick",
                  avatar: require("@/assets/images/portrait/small/avatar-s-9.jpg"),
                },
                {
                  name: "Len Bregantini",
                  avatar: require("@/assets/images/portrait/small/avatar-s-10.jpg"),
                },
                {
                  name: "John Doe",
                  avatar: require("@/assets/images/portrait/small/avatar-s-11.jpg"),
                },
                {
                  name: "Tonia Seabold",
                  avatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
                },
                {
                  name: "Dirk Fornili",
                  avatar: require("@/assets/images/portrait/small/avatar-s-2.jpg"),
                },
              ],
            },
            {
              text: "Chris Hemsworth",
              value: "chris hemsworth",
              voted: 16,
              usersVoted: [
                {
                  name: "Liliana Pecor",
                  avatar: require("@/assets/images/portrait/small/avatar-s-6.jpg"),
                },
                {
                  name: "Kasandra Nalevanko",
                  avatar: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
                },
              ],
            },
            {
              text: "mark ruffalo",
              value: "mark ruffalo",
              voted: 8,
              usersVoted: [
                {
                  name: "Lorelei Lacsamana",
                  avatar: require("@/assets/images/portrait/small/avatar-s-4.jpg"),
                },
              ],
            },
            {
              text: "Chris Evans",
              value: "chris evans",
              voted: 16,
              usersVoted: [
                {
                  name: "Jeanie Bulgrin",
                  avatar: require("@/assets/images/portrait/small/avatar-s-8.jpg"),
                },
                {
                  name: "Graig Muckey",
                  avatar: require("@/assets/images/portrait/small/avatar-s-3.jpg"),
                },
              ],
            },
          ],
        },
      ],
      twitterFeeds: [
        {
          authorAvatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
          authorUsername: "tiana59",
          authorDisplayName: "Tiana Vercetti",
          content:
            "I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups.",
          tags: ["js", "vuejs"],
          time: "Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)",
        },
        {
          authorAvatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
          authorUsername: "tiana59",
          authorDisplayName: "Tiana Vercetti",
          content:
            "Carrot cake cake gummies I love I love tiramisu. Biscuit marzipan cookie lemon drops.",
          tags: ["python"],
          time: "Mon Dec 11 2018 01:05:05 GMT+0000 (GMT)",
        },
        {
          authorAvatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
          authorUsername: "tiana59",
          authorDisplayName: "Tiana Vercetti",
          content:
            "I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups .",
          tags: [],
          time: "Mon Dec 10 2018 03:33:05 GMT+0000 (GMT)",
        },
        {
          authorAvatar: require("@/assets/images/portrait/small/avatar-s-12.jpg"),
          authorUsername: "tiana59",
          authorDisplayName: "Tiana Vercetti",
          content:
            "Muffin candy caramels. I love caramels tiramisu jelly. Pie I love wafer. Chocolate cake lollipop tootsie roll cake.",
          tags: ["django", "vuejs"],
          time: "Mon Dec 9 2018 08:47:05 GMT+0000 (GMT)",
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
</style>
