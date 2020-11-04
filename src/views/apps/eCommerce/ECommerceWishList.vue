<!-- =========================================================================================
  File Name: ECommerceWishList.vue
  Description: eCommerce Wish List Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="ecommerce-wishlist-demo">
  
        <div class="items-grid-view vx-row match-height" v-if="wishListitems.length" appear>
            <div class="vx-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full" v-for="item in wishListitems" :key="item.objectID">

                <item-grid-view :item="item">

                    <!-- SLOT: ACTION BUTTONS -->
                    <template slot="action-buttons">
                        <div class="flex flex-wrap">

                            <!-- PRIMARY BUTTON : REMOVE -->
                            <div
                                class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                                @click="removeItemFromWishList(item)">
                                <feather-icon icon="XIcon" svgClasses="h-4 w-4" />

                                <span class="text-sm font-semibold ml-2">Quitar</span>
                            </div>

                            <!-- SECONDARY BUTTON: MOVE TO CART -->
                            <div
                                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                                @click="cartButtonClicked(item)">
                                <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">ir Carrito</span>
                                <span class="text-sm font-semibold ml-2" v-else>Agrego a Carrito</span>
                            </div>
                        </div>
                    </template>
                </item-grid-view>

            </div>
        </div>

        <!-- IF NO ITEMS IN CART -->
        <vx-card title="You don't have any items in your wish list." v-else>
            <vs-button @click="$router.push('/apps/eCommerce/shop').catch(() => {})">Ver Carrito</vs-button>
        </vx-card>
  </div>
</template>

<script>
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"
const ItemGridView = () => import('./components/ItemGridView.vue')


export default {
  mounted() {
         
      this.traerLocalStorage();
      //this.buscarDatos(1,0)
      if (this.wishListitems.length<1)
      { 
        this.buscarDatos(2,5) 
        this.buscarDatos(3,5) 
      }
 
 
          

    },
  created () {
    // LIMPIO LAS LISTAS
   // this.$store.commit("eCommerce/MUTCLEANSHOP",1);
     
   
  },
  components: {
    ItemGridView
  },
  computed: {
     getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
     
    wishListitems () {
      return this.$store.state.eCommerce.wishList.slice().reverse()
    },
    isInCart () {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    isInWishList () {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    }
  },
  methods: {
  
    
    removeItemFromWishList (item) {
       item['profile'] =this.getProfile;
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    cartButtonClicked (item) {
      if (this.isInCart(item.objectID)) this.$router.push('/apps/eCommerce/checkout').catch(() => {})
      else {
        
        this.additemInCart(item)
         
        this.removeItemFromWishList(item)
      }
    },
    additemInCart (item) {

      item['profile'] =this.getProfile;

      this.$store.dispatch('eCommerce/additemInCart', item)
    },
    buscarDatos: function (indicador,rango) { 
            var origenUrl = "O";
            this.$store.commit("eCommerce/MUTCLEANSHOP",1);

            var header = {
                MODO: "E",
                OBJECTID: "2580",
                CREDENCIAL: this.getProfile.Credencial,
                USERNAME: this.getProfile.Username,
                REGISTROSXPAGINA: "0",
                PAGINA: "0",
                ORDERBY: ""
            };
            this.headertxt = divilib.GetHeaderString(header); 
            this.filastxt = "<Filas/>";


            // RegistroNuevo Gen_CAMPOS_GRID(3)
            var parametros = [];
            var parametro1 = {}; 
            //
            //PN_INDICADOR      IN NUMBER, -- Indicador de tipo de consulta 1 - Lista Productos. 2 - Wish. 3- Cart.
           

            parametro1 = { NOMBRE: "PN_INDICADOR",OPERADOR: "=",VALOR1: indicador,VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);

            parametro1 = { NOMBRE: "PN_CLIENTE",OPERADOR: "=",VALOR1: this.getProfile.num_user,VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);


            parametro1 = { NOMBRE: "PN_PARTNER",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1); 


            parametro1 = { NOMBRE: "PN_CODPRODUCTO",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);
            parametro1 = { NOMBRE: "PN_RANGO",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);
            parametro1 = { NOMBRE: "PN_CATEGORIA",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);
            parametro1 = { NOMBRE: "PN_MARCA",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);
            parametro1 = { NOMBRE: "PN_RATING",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);
            parametro1 = { NOMBRE: "PV_TEXTOENCONTRAR",OPERADOR: "=",VALOR1: '',VALOR2: '',CDATA: '0'};
            parametros.push(parametro1);  

            this.paramtxt = divilib.paramArraytoStrintg(parametros);

            // cargo la peticion texto
            var petTxt = {
                header: this.headertxt,
                parametros: this.paramtxt,
                filas: this.filastxt
            };

 
            this.$store.commit("eCommerce/MUTSETURL", "O");
            this.$store.commit("eCommerce/MUTSETPETICIONTXT", petTxt);

            var pedido = {
                dml: "E", // LLAMA A BUSCAR PRODUCTOS
                Credencial: this.getProfile.Credencial,
                ObjectId: "2580",  
                formatoenvio: "N",
                formatorecibe: "N",
                indicador: indicador, //select
                origenUrl: origenUrl
            };

            //cambia a acDsoaPrueba // acDsoa
            this.$store.dispatch("eCommerce/acDsoa", pedido);
 
        },
    
    /// RECUPERA LACONEXION SI NO EXISTE Y ESTA EN STORAGE
    aesDencrypt(txt) {
            const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(this.key), {
                iv: CryptoJS.enc.Utf8.parse(this.iv),
                mode: CryptoJS.mode.CBC
            })

            return CryptoJS.enc.Utf8.stringify(cipher).toString()
        },  
  traerLocalStorage() 
        {
            //local storage
           
              let profile=divilib.traerLocalStorage();

              
             if ( profile==0)
                this.$router.push('/pages/login').catch(() => {})
             else   
                this.$store.commit("dsoaLogin/MUTSETPROFILE", profile);

  
        },
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-wishlist-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
        min-width: 50%;
    }

    .item-view-secondary-action-btn {
        min-width: 50%;
    }
}
</style>
