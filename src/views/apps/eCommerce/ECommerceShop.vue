<!-- =========================================================================================
  File Name: ECommerceShop.vue
  Description: eCommerce Shop Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<div>

    <ais-instant-search :search-client="searchClient" index-name="instant_search" id="algolia-instant-search-demo">

        <!-- AIS CONFIG -->
        <ais-configure :hits-per-page.camel="9" />

        <div class="algolia-header mb-4">
            <div class="flex md:items-end items-center justify-between flex-wrap">
                <!-- TOGGLE SIDEBAR BUTTON -->
                <feather-icon class="inline-flex lg:hidden cursor-pointer mr-4" icon="MenuIcon" @click.stop="toggleFilterSidebar" />

                <p class="lg:inline-flex hidden font-semibold algolia-filters-label">Filters</p>

                <vs-button color="success" type="filled" @click="buscarDatos('1',0)">Nueva busqueda</vs-button>

                <div class="flex justify-between items-end flex-grow">

                    <!-- Stats -->
                    <ais-stats>
                        <p slot-scope="{ hitsPerPage, nbPages, nbHits, page, processingTimeMS, query }" class="font-semibold md:block hidden">
                            {{ datosFiltrados.length }} Resultados encontrados en  {{ processingTimeMS }}ms
                        </p>
                    </ais-stats>

                    <div class="flex flex-wrap">

                        <!-- SORTING -->
                        <ais-sort-by :items="[
                                { value: 'instant_search', label: 'Featured' },
                                { value: 'instant_search_price_asc', label: 'Lowest Price' },
                                { value: 'instant_search_price_desc', label: 'Highest Price' },
                            ]">
                            <vs-select :value="currentRefinement" slot-scope="{ items, currentRefinement, refine }" @input="(val) => refine(val)" class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48">
                                <vs-select-item v-for="item in items" :key="item.value" :value="item.value" :text="item.label" />
                            </vs-select>
                        </ais-sort-by>

                        <!-- ITEM VIEW - GRID/LIST -->
                        <div>
                            <feather-icon icon="GridIcon" @click="currentItemView='item-grid-view'" class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer" :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
                            <feather-icon icon="ListIcon" @click="currentItemView='item-list-view'" class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex" :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="algolia-content-container" class="relative clearfix">
            <vs-sidebar class="items-no-padding vs-sidebar-rounded background-absolute" parent="#algolia-content-container" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isFilterSidebarActive">

                <div class="p-6 filter-container">

                    <!-- MULTI RANGE -->
                    <h6 class="font-bold mb-3">Multi Rango</h6>
                    buscando {{buscarPorTexto}}
                    <ais-numeric-menu attribute="price" :items="numericItems">

                        <ul>
                            <li v-for="item in numericItems" :key="item.codrango" class="flex items-center cursor-pointer py-1" @click="filtraDatos()">

                                <vs-radio v-model="rango" :vs-value="item.codrango">{{ item.label}}</vs-radio>
                            </li>
                        </ul>
                    </ais-numeric-menu>

                    <vs-divider />

                    <!-- CATEGORIES -->
                    <h6 class="font-bold mb-4">Categorias</h6>

                    <ais-hierarchical-menu :attributes="algoliaCategories">

                        <div slot-scope="{
                              items,
                              refine,
                            }">

                            <ul>
                                <li v-for="item in getCategorias" :key="item.value" class="flex items-center cursor-pointer py-1" @click="filtraDatos()">

                                    <vs-radio v-model="categoria" :vs-value="item.value">{{ item.label}}</vs-radio>

                                </li>
                            </ul>

                        </div>
                    </ais-hierarchical-menu>

                    <vs-divider />

                    <!-- Brands -->
                    <h6 class="font-bold mb-4">Marcas {{marca}} </h6>
                    <ais-refinement-list attribute="brand">

                        <div slot-scope="{
                              items,
                              isFromSearch,
                              refine,
                            }">

                            <ul>

                                <li v-for="item in getMarcas" :key="item.value" class="mb-2 flex items-center justify-between" @click="filtraDatos(item.value)">

                                    <vs-radio v-model="marca" :vs-value="item.codMarca">{{ item.label}}</vs-radio>
                                    <span>{{ item.count }}</span>
                                </li>
                            </ul>
                        </div>
                    </ais-refinement-list>
                    <vs-divider />

                    <!-- Rating -->
                    <h6 class="font-bold mb-3">Rating</h6>
                    <ais-rating-menu attribute="rating">
                        <ul slot-scope="{ items, refine, createURL }">
                            <!-- RATING {{getRaiting}}-->
                            <li v-for="item in getRaiting" :key="item.value" class="mb-2">
                                <div @click.prevent="getRating(item.value)" class="flex justify-between items-center">
                                    <div class="flex items-center flex-wrap">
                                        <feather-icon icon="StarIcon" :svgClasses="[{'text-warning': full, 'text-grey': !full, 'ml-1' : index}, 'cursor-pointer stroke-current h-6 w-6']" v-for="(full, index) in item.stars" :key="index" />
                                        <span class="ml-2">&amp; up</span>
                                    </div>
                                    <span>({{ item.count }})</span>
                                </div>
                            </li>
                        </ul>
                    </ais-rating-menu>

                    <vs-divider />

                    <ais-clear-refinements class="flex justify-center">
                        <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Exportar a Excel</vs-button>
                        <vs-button class="w-full" slot-scope="{ canRefine, refine, createURL }" @click="limpiaFiltros()">Limpia Filtros</vs-button>
                    </ais-clear-refinements>
                </div>
            </vs-sidebar>

            <!-- RIGHT COL -->
            <div :class="{'sidebar-spacer-with-margin': clickNotClose}">

                <!-- SEARCH BAR -->
                <ais-search-box>
                    <div slot-scope="{ currentRefinement, isSearchStalled, refine }">

                        <div class="relative mb-8">

                            <!-- SEARCH INPUT -->
                            <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Escriba para Buscar" v-model="buscarPorTexto" @input="refine($event)" @keyup.esc="refine('')" size="large" />

                            <!-- SEARCH LOADING -->
                            <p :hidden="!isSearchStalled" class="mt-4 text-grey">
                                <feather-icon icon="ClockIcon" svgClasses="w-4 h-4" class="mr-2 align-middle" />
                                <span>Loading...</span>
                            </p>

                            <!-- SEARCH ICON -->
                            <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="!currentRefinement">
                                <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                            </div>

                            <!-- CLEAR INPUT ICON -->
                            <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="buscaPorNombre">
                                <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="buscarPorNombre()" />
                            </div>

                        </div>
                    </div>
                </ais-search-box>

                <!-- SEARCH RESULT -->
                <ais-hits>
                    <div slot-scope="{ items }">

                        <!-- GRID VIEW -->

                        <template v-if="currentItemView == 'item-grid-view'">

                            <div class="items-grid-view vx-row match-height">
                                <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" 
                                v-for="item in datosFiltrados" 
                                :key="item.objectID">

                                    <item-grid-view :item="item">

                                        <!-- SLOT: ACTION BUTTONS -->
                                        <template slot="action-buttons">
                                            <div class="flex flex-wrap">

                                                <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                                                <div class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer" @click="toggleItemInWishList(item)">
                                                    <feather-icon icon="HeartIcon" 
                                                    :svgClasses="[{'text-danger fill-current' 
                                                    :isInWishList(item.objectID)}, 'h-4 w-4']" />

                                                    <span class="text-sm font-semibold ml-2">Agregar a Preferidos</span>
                                                </div>

                                                <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                                                <div class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer" @click="cartButtonClicked(item)">
                                                    <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                                    <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">Ver Carrito</span>
                                                    <span class="text-sm font-semibold ml-2" v-else>Agrego a Carrito</span>
                                                </div>
                                            </div>
                                        </template>
                                    </item-grid-view>

                                </div>
                            </div>
                        </template>

                        <!-- LIST VIEW -->
                        <template v-else>
                            <div class="items-list-view mb-base" v-for="item in getDataCliente" :key="item.objectID">

                                <item-list-view :item="item">

                                    <!-- SLOT: ACTION BUTTONS -->
                                    <template slot="action-buttons">
                                        <div class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3" @click="toggleItemInWishList(item)">
                                          
                                           <feather-icon icon="HeartIcon" 
                                                    :svgClasses="[{'text-danger fill-current' 
                                                    :isInWishList(item.objectID)}, 'h-4 w-4']" />
                                            
                                            <span class="text-sm font-semibold ml-2">Agregar a Preferidos</span>
                                        </div>
                                        <div class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer" @click="cartButtonClicked(item)">
                                            <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                            <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">Ver Carrito</span>
                                            <span class="text-sm font-semibold ml-2" v-else>Agrego a Carrito</span>
                                        </div>
                                       
                                    </template>
                                   
                                </item-list-view>

                            </div>
                        </template>
                    </div>
                </ais-hits>

                <!-- PAGINATION -->
                <ais-pagination>
                    <div slot-scope="{
                                currentRefinement,
                                nbPages,
                                pages,
                                isFirstPage,
                                isLastPage,
                                refine,
                                createURL
                            }">

                        <vs-pagination :total="nbPages" :max="7" :value="currentRefinement + 1" @input="(val) => { refine(val - 1) }" />
                    </div>
                </ais-pagination>

                <!-- ALGOLIA LOGO -->
            </div>
        </div>
    </ais-instant-search>
</div>
</template>

<script>
import {
    AisClearRefinements,
    AisConfigure,
    AisHierarchicalMenu,
    AisHits,
    AisInstantSearch,
    AisNumericMenu,
    AisPagination,
    AisRangeInput,
    AisRatingMenu,
    AisRefinementList,
    AisSearchBox,
    AisSortBy,
    AisStats
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'

import * as diviEmmerce from "./js/ecommerce.js";
import * as divilib from "@/divisoftlibs/utilDivisoftJS.js";

export default {
    components: {
        ItemGridView: () => import('./components/ItemGridView.vue'),
        ItemListView: () => import('./components/ItemListView.vue'),
        AisClearRefinements,
        AisConfigure,
        AisHierarchicalMenu,
        AisHits,
        AisInstantSearch,
        AisNumericMenu,
        AisPagination,
        AisRangeInput,
        AisRatingMenu,
        AisRefinementList,
        AisSearchBox,
        AisSortBy,
        AisStats
    },
    mounted() {

        this.traerLocalStorage();
        this.buscarDatos(1, 0)
        this.buscarDatos(2, 5)
        this.buscarDatos(3, 5)


        try { 
       
             this.$socket.connect();  
            
        } catch (error) {
            console.log("Error al Conectar al Socket "+error);
        } 
        

    },
    created() {
        // LIMPIO LAS LISTAS
        this.$store.commit("eCommerce/MUTCLEANSHOP", 1);
        this.setSidebarWidth();

    },
    data() {
        return {
            searchClient: algoliasearch(
                'latency',
                '6be0576ff61c053d5f9a3225e2a90f76'
            ),
            rango: 0,
            categoria: "all",
            rating: "0",
            marca: "0",
            buscarPorTexto: "",
            //DIVISPOFT
            datosFiltrados: this.getDataCliente,

            divisoftisInCart: this.isInCart,
            // Filter Sidebar
            isFilterSidebarActive: true,
            clickNotClose: true,
            currentItemView: 'item-grid-view',
            numericItems: diviEmmerce.RangoPrecios,

            algoliaCategories: [
                'hierarchicalCategories.lvl0',
                'hierarchicalCategories.lvl1',
                'hierarchicalCategories.lvl2',
                'hierarchicalCategories.lvl3'
            ]

        }
    },

    computed: {
        getProfile() {
            return this.$store.state.dsoaLogin.profile[0];
        },
        getCategorias() {

            return diviEmmerce.Categorias
        },
        getMarcas() {

            return diviEmmerce.Marcas

        },
        getRaiting() {

            return diviEmmerce.Raiting

        },

        toValue() {
            return (value, range) => [
                value.min !== null ? value.min : range.min,
                value.max !== null ? value.max : range.max
            ]
        },
        getDataCliente() {
            return this.$store.state.eCommerce.catalogoProducts

        },

        getRegistrosEncontrados() {
            return this.$store.getters['eCommerce/getRegistrosEncontrados']
        },

        // GRID VIEW
        isInCart() {
            return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
        },
        isInWishList() {
            return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
        },
        windowWidth() {
            return this.$store.state.windowWidth
        }
    },

    watch: {
        windowWidth() {
            this.setSidebarWidth();

        },
        getDataCliente() {
            this.datosFiltrados = this.getDataCliente
            this.filtraDatos()

        },

        buscarPorTexto() {
            if (this.buscarPorTexto.length > 3) {

                var buscar = this.buscarPorTexto.toLowerCase();

                let String1 = buscar;
                let String2 = buscar;
                let String3 = buscar;
                let String4 = buscar;
                let String5 = buscar;
                let String6 = buscar;

                let posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String1 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String1 + " ", "")
                }

                posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String2 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String2 + " ", "")
                } else if (buscar.length > 2) String2 = buscar;

                posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String3 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String3 + " ", "")
                } else if (buscar.length > 2) String3 = buscar;

                posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String4 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String4 + " ", "")
                } else if (buscar.length > 2) String4 = buscar;

                posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String5 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String5 + " ", "")
                } else if (buscar.length > 2) String5 = buscar;

                posicion = buscar.indexOf(" ");
                if (posicion > -1) {
                    String6 = buscar.substring(0, posicion)
                    buscar = buscar.replace(String6 + " ", "")
                } else if (buscar.length > 2) String6 = buscar;

                String6 = String6.replace(" ", "")
                String5 = String5.replace(" ", "")
                String4 = String4.replace(" ", "")
                String3 = String3.replace(" ", "")
                String2 = String2.replace(" ", "")
                String1 = String1.replace(" ", "")

                //alert("buscando"+(String1+String2+String3+String4+String5+String6));
                //  if  ((String1+String2+String3+String4+String5+String6).length>0)
                // hacder un arraglo de los blacos
                this.datosFiltrados = this.getDataCliente.filter(p => {
                    // if IE support is required and not pre-compiling,
                    // use indexOf instead of includes
                    return p.name.toLowerCase().includes(String1) ||
                        p.description.toLowerCase().includes(String1) ||
                        p.name.toLowerCase().includes(String2) ||
                        p.description.toLowerCase().includes(String2) ||
                        p.name.toLowerCase().includes(String3) ||
                        p.description.toLowerCase().includes(String3) ||
                        p.name.toLowerCase().includes(String4) ||
                        p.description.toLowerCase().includes(String4) ||
                        p.name.toLowerCase().includes(String5) ||
                        p.description.toLowerCase().includes(String5) ||
                        p.name.toLowerCase().includes(String6) ||
                        p.description.toLowerCase().includes(String6) ||

                        JSON.stringify(p.categories).toLowerCase().includes(String1) ||
                        JSON.stringify(p.categories).toLowerCase().includes(String2) ||
                        JSON.stringify(p.categories).toLowerCase().includes(String3) ||
                        JSON.stringify(p.categories).toLowerCase().includes(String4) ||
                        JSON.stringify(p.categories).toLowerCase().includes(String5) ||
                        JSON.stringify(p.categories).toLowerCase().includes(String6)
                })

            } else
                this.datosFiltrados = this.getDataCliente
        }

    },
    methods: {
  
        //Chaca por chat 
        traerLocalStorage() 
        { 
           
        let x=1
        }, 
        buscaPorNombre() {

        },
        limpiaFiltros() {
            this.rango = 0
            this.categoria = "all"
            this.rating = "0"
            this.marca = "0"
            this.datosFiltrados = this.getDataCliente
        },
        filtraDatos() {

            let datos = this.getDataCliente

            if (this.categoria != "all")
                datos = datos.filter((item) => item.categories.includes(this.categoria))

            if (this.rango > 0)
                datos = datos.filter((item) => item.codrangoprecio === this.rango)

            if (this.rating > "0")
                datos = datos.filter((item) => item.rating === this.rating)

            if (this.marca > "0")
                datos = datos.filter((item) => item.codbrand === this.marca)

            this.datosFiltrados = datos
        },

        getRating(valor) {

            this.rating = valor;
            this.filtraDatos();
        },

        setSidebarWidth() {
            //alert("setSidebarWidth acomoda la pantalla segun tamaña");    

            if (this.windowWidth < 992) {
                this.isFilterSidebarActive = this.clickNotClose = false
            } else {
                this.isFilterSidebarActive = this.clickNotClose = true
            }
        },

        // GRID VIEW - ACTIONS
        toggleFilterSidebar() {

            if (this.clickNotClose) return
            this.isFilterSidebarActive = !this.isFilterSidebarActive
        },
        toggleItemInWishList(item) {

            item['profile'] = this.getProfile;
            // cargando  
            // alert("cargando ITEM a WISTH ");    
            this.$store.dispatch('eCommerce/toggleItemInWishList', item)
        },
        additemInCart(item) {

            item['profile'] = this.getProfile;
            this.$store.dispatch('eCommerce/additemInCart', item)
            // AQUI LLAMA A GUARDARLO EN O HASTA QUE TERMINE

        },
        cartButtonClicked(item) {

            //alert("cartButtonClicked 1  LO LLEVA A VER EL CARRITO SI ESTA EN EL CARRITO "+this.isInCart(item.objectID));  
            console.log("Carrito ADICIONAL ", JSON.stringify(item));

            // SI ESTA EN EL CARRITO LO LLEVA A PAGAR SI NO  LO MANDA A ADICIONAR AL CARRITO
            this.isInCart(item.objectID) ? this.$router.push('/apps/eCommerce/checkout').catch(() => {}) : this.additemInCart(item)
        },

        buscarDatos: function (indicador, rango) {
            var origenUrl = "O";
            this.$store.commit("eCommerce/MUTCLEANSHOP", 1);

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

            /*
       this.rating="0"
       this.marca="0"
      */
            parametro1 = {
                NOMBRE: "PN_INDICADOR",
                OPERADOR: "=",
                VALOR1: indicador,
                VALOR2: '',
                CDATA: '0'
            };
            parametros.push(parametro1);

            parametro1 = {
                NOMBRE: "PN_CLIENTE",
                OPERADOR: "=",
                VALOR1: this.getProfile.num_user,
                VALOR2: '',
                CDATA: '0'
            };
            parametros.push(parametro1);

            parametro1 = {
                NOMBRE: "PN_PARTNER",
                OPERADOR: "=",
                VALOR1: '',
                VALOR2: '',
                CDATA: '0'
            };
            parametros.push(parametro1);

            parametro1 = {
                NOMBRE: "PN_CODPRODUCTO",
                OPERADOR: "=",
                VALOR1: '',
                VALOR2: '',
                CDATA: '0'
            };
            parametros.push(parametro1);
            ////////////// RANO
            if (this.rango == 0)
                parametro1 = {
                    NOMBRE: "PN_RANGO",
                    OPERADOR: "=",
                    VALOR1: '',
                    VALOR2: '',
                    CDATA: '0'
                };
            else
                parametro1 = {
                    NOMBRE: "PN_RANGO",
                    OPERADOR: "=",
                    VALOR1: this.rango,
                    VALOR2: '',
                    CDATA: '0'
                };
            //agrego rango
            parametros.push(parametro1);

            //////////////////
            if (this.categoria == "all")
                parametro1 = {
                    NOMBRE: "PN_CATEGORIA",
                    OPERADOR: "=",
                    VALOR1: '',
                    VALOR2: '',
                    CDATA: '0'
                };
            else
                parametro1 = {
                    NOMBRE: "PN_CATEGORIA",
                    OPERADOR: "=",
                    VALOR1: this.categoria,
                    VALOR2: '',
                    CDATA: '0'
                };
            parametros.push(parametro1);

            ///////// MARCA
            if (this.marca == "0")
                parametro1 = {
                    NOMBRE: "PN_MARCA",
                    OPERADOR: "=",
                    VALOR1: '',
                    VALOR2: '',
                    CDATA: '0'
                };
            else
                parametro1 = {
                    NOMBRE: "PN_MARCA",
                    OPERADOR: "=",
                    VALOR1: this.marca,
                    VALOR2: '',
                    CDATA: '0'
                };
            //agrego marca
            parametros.push(parametro1);

            parametro1 = {
                NOMBRE: "PN_RATING",
                OPERADOR: "=",
                VALOR1: '',
                VALOR2: '',
                CDATA: '0'
            };
            parametros.push(parametro1);
            parametro1 = {
                NOMBRE: "PV_TEXTOENCONTRAR",
                OPERADOR: "=",
                VALOR1:this.buscarPorTexto,
                VALOR2: '',
                CDATA: '0'
            }; 
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
            
             // reperar STORE TOKEN 
        },

    },

}
</script>

<style lang="scss">
#algolia-instant-search-demo {
    .algolia-header {
        .algolia-filters-label {
            width: calc(260px + 2.4rem);
        }
    }

    #algolia-content-container {

        .vs-sidebar {
            position: relative;
            float: left;
        }
    }

    .algolia-search-input-right-aligned-icon {
        padding: 1rem 1.5rem;
    }

    .algolia-price-slider {
        min-width: unset;
    }

    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
        min-width: 50%;
    }

    .item-view-secondary-action-btn {
        min-width: 50%;
    }
}

.theme-dark {
    #algolia-instant-search-demo {
        #algolia-content-container {
            .vs-sidebar {
                background-color: #10163a;
            }
        }
    }
}

@media (min-width: 992px) {
    .vs-sidebar-rounded {
        .vs-sidebar {
            border-radius: .5rem;
        }

        .vs-sidebar--items {
            border-radius: .5rem;
        }
    }
}

@media (max-width: 992px) {
    #algolia-content-container {
        .vs-sidebar {
            position: absolute !important;
            float: none !important;
        }
    }
}
</style>
