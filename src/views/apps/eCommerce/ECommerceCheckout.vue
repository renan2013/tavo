<!-- =========================================================================================
  File Name: ECommerceCheckout.vue
  Description: eCommerce Checkout page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="ecommerce-checkout-demo">
        <form-wizard
            ref="checkoutWizard"
            color="rgba(var(--vs-primary), 1)"
            :title="null"
            :subtitle="null"
            :hide-buttons="true">

            <!-- tab 1 content -->
            <tab-content title="Cart" icon="feather icon-shopping-cart" class="mb-5">
 
                <!-- IF CART HAVE ITEMS -->
                <div class="vx-row" v-if="cartItems.length">

                    <!-- LEFT COL -->
                    <div class="vx-col lg:w-2/3 w-full relative">
                        <div class="items-list-view" v-for="(item, index) in cartItems" :key="item.objectID">
                            <item-list-view :item="item" class="mb-base">

                                <!-- SLOT: ITEM META -->
                                <template slot="item-meta">
                                    <h6
                                      class="item-name font-semibold mb-1 cursor-pointer hover:text-primary"
                                      @click="$router.push({name: 'ecommerce-item-detail-view', params: {item_id: item.objectID }}).catch(() => {})">{{ item.name }}</h6>
                                    <p class="text-sm mb-2">By <span class="font-semibold cursor-pointer">{{ item.brand }}</span></p>
                                    <p class="text-success text-sm">In Stock</p>

                                    <p class="mt-4 font-bold text-sm">Quantity</p>
                                    <vs-input-number min="1" max="10" :value="item.quantity" @input="updateItemQuantity($event, index)" class="inline-flex" />

                                    <p class="font-medium text-grey mt-4">Delivery by, {{ item.delivery_date }}</p>
                                    <p class="text-success font-medium">{{ item.discount_in_percentage }}% off {{ item.offers_count }} offers Available</p>
                                </template>

                                <!-- SLOT: ACTION BUTTONS -->
                                <template slot="action-buttons">

                                    <!-- PRIMARY BUTTON: REMOVE -->
                                    <div class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3" @click="removeItemFromCart(item)">
                                        <feather-icon icon="XIcon" svgClasses="h-4 w-4" />
                                        <span class="text-sm font-semibold ml-2">REMOVE</span>
                                    </div>

                                    <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN WISHLIST -->
                                    <div class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer" @click="wishListButtonClicked(item)">
                                        <feather-icon icon="HeartIcon" :svgClasses="[{'text-white fill-current': isInWishList(item.objectID)}, 'h-4 w-4']" />
                                        <span class="text-sm font-semibold ml-2" v-if="isInWishList(item.objectID)">WISHLIST</span>
                                        <span class="text-sm font-semibold ml-2" v-else>WISHLIST</span>
                                    </div>
                                </template>
                            </item-list-view>
                        </div>
                    </div>

                    <!-- RIGHT COL -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card>
                            <p class="text-grey mb-3">Options</p>
                            <div class="flex justify-between">
                                <span class="font-semibold">Coupons</span>
                                <span class="font-medium text-primary cursor-pointer">Apply</span>
                            </div>

                            <vs-divider />

                            <p class="font-semibold mb-3">Price Details</p>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Total MRP</span>
                                <span>$598</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Bag Discount</span>
                                <span class="text-success">-25$</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Estimated Tax</span>
                                <span>$1.3</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">EMI Eligibility</span>
                                <a href="#" class="text-primary">Details</a>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Delivery Charges</span>
                                <span class="text-success">Free</span>
                            </div>

                            <vs-divider />

                            <div class="flex justify-between font-semibold mb-3">
                                <span>Total</span>
                                <span>$574.3</span>
                            </div>

                            <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">PLACE ORDER</vs-button>
                        </vx-card>
                    </div>
                </div>

                <!-- IF NO ITEMS IN CART -->
                <vx-card title="You don't have any items in your cart." v-else>
                    <vs-button @click="$router.push('/apps/eCommerce/shop').catch(() => {})">Browse Shop</vs-button>
                </vx-card>

            </tab-content>

            <!-- tab 2 content -->
            <tab-content title="Address" icon="feather icon-home" class="mb-5">

                <div class="vx-row">

                    <!-- LEFT COL: NEW ADDRESS -->
                    <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Add New Address" subtitle="Be sure to check &quot;Deliver to this address&quot; when you have finished" class="mb-base">

                            <form data-vv-scope="add-new-address">
                                <div class="vx-row">
                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required|alpha_spaces'"
                                            data-vv-as="field"
                                            name="fullName"
                                            label="Full Name:"
                                            v-model="fullName"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.fullName')" class="text-danger">{{ errors.first('add-new-address.fullName') }}</span>

                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required|digits:10'"
                                            name="mobileNum"
                                            label="Mobile Number:"
                                            v-model="mobileNum"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.mobileNum')" class="text-danger">{{ errors.first('add-new-address.mobileNum') }}</span>
                                    </div>

                                </div>

                                <div class="vx-row">


                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="houseNum"
                                            label="Flat, House No:"
                                            v-model="houseNum"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.houseNum')" class="text-danger">{{ errors.first('add-new-address.houseNum') }}</span>
                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            name="landmark"
                                            label="Landmark e.g. near apollo hospital:"
                                            v-model="landmark"
                                            class="w-full mt-5" />
                                    </div>

                                </div>

                                <div class="vx-row">

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="city"
                                            label="Town/City:"
                                            v-model="city"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.city')" class="text-danger">{{ errors.first('add-new-address.city') }}</span>
                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">
                                        <vs-input
                                            v-validate="'required|min:3|max:6|numeric'"
                                            name="pincode"
                                            label="Pincode:"
                                            v-model="pincode"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.pincode')" class="text-danger">{{ errors.first('add-new-address.pincode') }}</span>
                                    </div>
                                </div>

                                <div class="vx-row">


                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-input
                                            v-validate="'required'"
                                            name="state"
                                            label="State:"
                                            v-model="state"
                                            class="w-full mt-5" />
                                        <span v-show="errors.has('add-new-address.state')" class="text-danger">{{ errors.first('add-new-address.state') }}</span>
                                    </div>

                                    <div class="vx-col sm:w-1/2 w-full">

                                        <vs-select label="Address Type:" v-model="addressType" class="w-full mt-5">
                                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in addressTypeOptions" />
                                        </vs-select>
                                    </div>

                                </div>
                                      <vs-button class="mt-6 ml-auto flex" @click.prevent="submitNewAddressForm">SAVE AND DELIVER HERE</vs-button>
                            </form>
                        </vx-card>
                    </div>

                    <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card title="John Doe">
                            <div>
                                <p>9447 Glen Eagles Drive</p>
                                <p>Lewis Center, OH 43035</p>
                                <p class="my-4">UTC-5: Eastern Standard Time (EST)</p>
                                <p>202-555-0140</p>
                            </div>

                            <vs-divider />

                            <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">DELIVER TO THIS ADDRESS</vs-button>
                        </vx-card>
                    </div>

                </div>
            </tab-content>

            <!-- tab 3 content -->
            <tab-content title="Payment" icon="feather icon-credit-card" class="mb-5">

                <div class="vx-row">

                    <!-- LEFT COL: PAYMENT OPTIONS -->
                    <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Payment Options" subtitle="Be sure to click on correct payment option" class="mb-base">

                            <div class="mt-3">
                                <ul>
                                  <!-- OPTION 1 -->
                                  <li>
                                    <!-- CARD DETAILS -->
                                    <div class="flex flex-wrap justify-between items-center">
                                        <vs-radio v-model="paymentMethod" vs-value="debit-card">
                                            <div class="flex items-center">
                                                <img src="@/assets/images/pages/eCommerce/bank.png" alt="bank-logo" height="40" width="50" class="inline-flex">
                                                <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                                            </div>
                                        </vs-radio>
                                        <span>John Doe</span>
                                        <span>11/2020</span>
                                    </div>

                                    <!-- CVV BLOCK -->
                                    <form data-vv-scope="cvv-form">
                                        <div class="flex items-center flex-wrap">
                                            <span class="mt-4">Enter CVV: </span>
                                            <vs-input
                                                v-validate="'required|digits:3'"
                                                name="cvv"
                                                v-model="cvv"
                                                class="mr-3 ml-2 mt-4" />
                                            <vs-button class="mt-4" @click.prevent="makePayment" :disabled="false">CONTINUE</vs-button>
                                        </div>
                                        <span v-show="errors.has('cvv-form.cvv')" class="text-danger ml-24">{{ errors.first('cvv-form.cvv') }}</span>
                                    </form>
                                  </li>

                                  <vs-divider class="my-6" />

                                  <!-- OPTION 2 -->
                                  <li>
                                    <vs-radio v-model="paymentMethod" vs-value="credit-debit-atmCard">Credit / Debit / ATM Card</vs-radio>
                                  </li>

                                  <!-- OPTION 3 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="netBanking">Net Banking</vs-radio>
                                  </li>

                                  <!-- OPTION 4 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="emi">EMI (Easy Installment)</vs-radio>
                                  </li>

                                  <!-- OPTION 5 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="cashOnDelivery">Cash On Delivery</vs-radio>
                                  </li>
                                </ul>

                                <vs-divider />

                                <!-- GIFT CARD -->
                                <div class="inline-flex items-center cursor-pointer">
                                    <feather-icon icon="PlusSquareIcon" class="mr-2" svgClasses="h-6 w-6" />
                                    <span>Add Gift Card</span>
                                </div>
                            </div>
                        </vx-card>
                    </div>

                    <!-- RIGHT COL: PRICE -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card title="Price Details">

                            <div class="flex justify-between mb-2">
                                <span>Price 3 Items</span>
                                <span class="font-semibold">$699.30</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Delivery Charges</span>
                                <span class="text-success">Free</span>
                            </div>

                            <vs-divider />

                            <div class="flex justify-between">
                                <span>Amount Payable</span>
                                <span class="font-semibold">$699.30</span>
                            </div>
                        </vx-card>
                    </div>
                </div>
            </tab-content>

        </form-wizard>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js"
const ItemListView = () => import('./components/ItemListView.vue')

export default {

   mounted() {
         
      this.traerLocalStorage();
      //this.buscarDatos(1,0)
      if (this.cartItems.length<1)
      { 
        this.buscarDatos(2,5)
        this.buscarDatos(3,5)
      }

    },
  created () {
    // LIMPIO LAS LISTAS
   // this.$store.commit("eCommerce/MUTCLEANSHOP",1);
     
   
  },
  data () {
    return {

      // TAB 2
      fullName: '',
      mobileNum: '',
      pincode: '',
      houseNum: '',
      area: '',
      landmark: '',
      city: '',
      state: '',
      addressType: 1,
      addressTypeOptions: [
        { text: 'Home', value: 1 },
        { text: 'Office', value: 2 }
      ],

      // TAB 3
      paymentMethod: 'debit-card',
      cvv: ''
    }
  },
  computed: {
    getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
     
    cartItems () {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },
    isInWishList () {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    }
  },
  methods: {

    // TAB 1
    removeItemFromCart (item) {
      item['profile'] =this.getProfile;
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    },
    wishListButtonClicked (item) {
      // Toggle in Wish List

      if (this.isInWishList(item.objectID)) 
          // si yaesta en lista de deseo lo lleva a verlo 
          this.$router.push('/apps/eCommerce/wish-list').catch(() => {})

      else {
         // lo agrega a lista de desos
        this.toggleItemInWishList(item)
       // ADEMAR NO LO QUITA DE CARRITO 
        // this.removeItemFromCart(item)
      }

    },
    toggleItemInWishList (item) {
      // Si no esta en deseos lo pone  
     item['profile'] =this.getProfile;
     this.$store.dispatch('eCommerce/toggleItemInWishList', item)
      

    },

    updateItemQuantity (event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length)
      this.$store.dispatch('eCommerce/updateItemQuantity', { quantity: event, index: itemIndex })
    },

    // TAB 2
    submitNewAddressForm () {
      return new Promise(() => {
        this.$validator.validateAll('add-new-address').then(result => {
          if (result) {
            // if form have no errors
            this.$refs.checkoutWizard.nextTab()
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Please enter valid details',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
    },

    // TAB 3
    makePayment () {
      return new Promise(() => {
        this.$validator.validateAll('cvv-form').then(result => {
          if (result) {
            // if form have no errors
            this.$vs.notify({
              title: 'Success',
              text: 'Payment received successfully',
              color: 'success',
              iconPack: 'feather',
              icon: 'icon-check'
            })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Please enter valid details',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
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
            this.profile=divilib. traerLocalStorage();
            if (this.profile==0)
                this.$router.push('/pages/login').catch(() => {})
             else    
               this.$store.commit("dsoaLogin/MUTSETPROFILE", this.profile);

             

        },
  },
  components: {
    ItemListView,
    FormWizard,
    TabContent
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
    }

    .item-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

    .vue-form-wizard {
        padding-bottom: 0;

        ::v-deep .wizard-header {
            padding: 0;
        }

        ::v-deep .wizard-tab-content {
            padding-right: 0;
            padding-left: 0;
            padding-bottom: 0;

            .wizard-tab-container{
              margin-bottom: 0 !important;
            }
        }
    }
}
</style>
