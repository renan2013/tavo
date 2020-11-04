/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
//import AppHeader from "./layout/AppHeader";
//import AppFooter from "./layout/AppFooter"; 



Vue.use(Router);

const sitioMensajeria = { template: '<div>sitioMensajeria</div>' };

const router = new Router({

    mode: "hash",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [{
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: "",
            component: () =>
                import ("./layouts/main/Main.vue"),

            children: [


                {
                    path: '/',
                    redirect: '/dashboard/analytics'
                },


                {
                    path: '/dashboard/analytics',
                    name: 'dashboard-analytics',
                    component: () =>
                        import ('./views/DashboardAnalytics.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: "/servicios",
                    name: "servicios",
                    component: () =>
                        import ("./views/bitweb/Vservicios.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Páginas" },
                            { title: "Nuestros Servicios", active: true }
                        ],
                        pageTitle: "Nuestros Servicios",
                        rule: "editor"
                    }
                },

                {
                    path: "/oficinas",
                    name: "oficinas",
                    component: () =>
                        import ("./views/bitweb/Voficinas.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Páginas" },
                            { title: "Oficinas", active: true }
                        ],
                        pageTitle: "Nuestras Oficinas",
                        rule: "editor"
                    }
                },

                {
                    path: "/acercade",
                    name: "acercade",
                    component: () =>
                        import ("./views/bitweb/Vacercade.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Páginas" },
                            { title: "Quienes Somos", active: true }
                        ],
                        pageTitle: "Quienes Somos",
                        rule: "editor"
                    }
                },
                {
                    path: "/vdesarrollo/:publicacion",
                    name: "Vdesarrollo",
                    component: () =>
                        import ("./views/bitweb/components/Vdesarrollo.vue"),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: "/admin/moneda/:tipo",
                    name: "administracion-moneda",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2507/wr2507.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Moneda",
                        rule: "editor"
                    }
                },

                //agregar ruta objetos
                {
                    path: "/admin/cantones/:tipo",
                    name: "administracion-cantones",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2504/wr2504.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Cantones", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },

                //agregar ruta objetos
                {
                    path: "/admin/provincias/:tipo",
                    name: "administracion-provincias",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2505/wr2503.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Provincias", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },

                //agregar ruta objetos
                {
                    path: "/admin/provincias/:tipo",
                    name: "administracion-provincias",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2506/wr2503.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Provincias", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos
                {
                    path: "/admin/provincias/:tipo",
                    name: "administracion-provincias",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2510/wr2503.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Provincias", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos
                {
                    //se sustituye “moneda” por el nombre de la vista
                    path: "/admin/personas/:tipo",
                    name: "administracion-personas",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2511/wr2511.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Personas", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos
                {
                    //se sustituye “moneda” por el nombre de la vista
                    path: "/admin/tarjetas/:tipo",
                    name: "administracion-tarjetas",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2514/wr2514.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Tarjetas", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos
                {
                    //se sustituye “moneda” por el nombre de la vista
                    path: "/admin/comisionmensajero/:tipo",
                    name: "administracion-comisionmensajero",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2537/wr2537.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Comisión de Mensajero ", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },

                // =============================================================================
                // GoPuris shop
                // =============================================================================
                {
                    path: "/shop/comisionpatner/:tipo",
                    name: "shop-comisionpatner",
                    component: () =>
                        import ("./divisoft/gonow/shop/ob2512/wr2512.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Shop", active: true }
                        ],
                        pageTitle: "Comision de Patner", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/shop/patner/:tipo",
                    name: "shop-patner",
                    component: () =>
                        import ("./divisoft/gonow/shop/ob2520/wr2520.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Shop", active: true }
                        ],
                        pageTitle: "Patner", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos            
                {
                    path: "/shop/taxes/:tipo",
                    name: "shop-taxes",
                    component: () =>
                        import ("./divisoft/gonow/shop/ob2518/wr2518.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Shop", active: true }
                        ],
                        pageTitle: "Taxes", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/shop/hashtag/:tipo",
                    name: "shop-hashtag",
                    component: () =>
                        import ("./divisoft/gonow/shop/ob2542/wr2542.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Shop", active: true }
                        ],
                        pageTitle: "Hashtag", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //////fin de shop

                //===========================================================================
                // GoPuris Productos
                //===========================================================================

                //agregar ruta objetos  
                {
                    path: "/productos/shopproductos/:tipo",
                    name: "productos-shopproductos",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2521/wr2521.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "Productos", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/productos/shoprangoprecio/:tipo",
                    name: "productos-shoprangoprecio",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2523/wr2523.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "Rango Precio", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/productos/shopmarca/:tipo",
                    name: "productos-shopmarca",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2524/wr2524.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "Marca", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/productos/shopcategoria/:tipo",
                    name: "productos-shopcategoria",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2526/wr2526.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "CategoriaCompra", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/productos/categoriasproductos/:tipo",
                    name: "productos-categoriasproductos",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2544/wr2544.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "CategoriasProductos", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/productos/shopproductohashtag/:tipo",
                    name: "productos-shopproductohashtag",
                    component: () =>
                        import ("./divisoft/gonow/productos/ob2543/wr2543.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Productos", active: true }
                        ],
                        pageTitle: "Hashtag por Productos", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },

                //===========================================================================
                // GoPuris Ubicacion
                //===========================================================================      
                {
                    path: "/ubicacion/zonas/:tipo",
                    name: "ubicacion-zonas",
                    component: () =>
                        import ("./divisoft/gonow/ubicacion/ob2501/wr2501.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Ubicacion", active: true }
                        ],
                        pageTitle: "Zonas",
                        rule: "editor"
                    }
                },
                {
                    path: "/ubicacion/provincias/:tipo",
                    name: "ubicacion-provincias",
                    component: () =>
                        import ("./divisoft/gonow/ubicacion/ob2503/wr2503.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Ubicacion", active: true }
                        ],
                        pageTitle: "Provincias", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/ubicacion/direcciones/:tipo",
                    name: "ubicacion-direcciones",
                    component: () =>
                        import ("./divisoft/gonow/ubicacion/ob2509/wr2509.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Ubicacion", active: true }
                        ],
                        pageTitle: "Direcciones", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/ubicacion/zonadetalle/:tipo",
                    name: "ubicacion-zonadetalle",
                    component: () =>
                        import ("./divisoft/gonow/ubicacion/ob2508/wr2508.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Ubicacion", active: true }
                        ],
                        pageTitle: "Zona de Cobertura", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },

                //===========================================================================
                // GoPuris Transporte
                //===========================================================================  
                {
                    path: "/transporte/transportevolumen/:tipo",
                    name: "transporte-transportevolumen",
                    component: () =>
                        import ("./divisoft/gonow/transporte/ob2533/wr2533.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Transporte", active: true }
                        ],
                        pageTitle: "Volumen de Transporte", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/transporte/tipotransporte/:tipo",
                    name: "transporte-tipotransporte",
                    component: () =>
                        import ("./divisoft/gonow/transporte/ob2532/wr2532.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Transporte", active: true }
                        ],
                        pageTitle: "Tipo de Transporte ", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                //agregar ruta objetos
                {
                    path: "/transporte/rangovolumen/:tipo",
                    name: "transporte-rangovolumen",
                    component: () =>
                        import ("./divisoft/gonow/transporte/ob2534/wr2534.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Transporte", active: true }
                        ],
                        pageTitle: "Rango de Volumen", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                {
                    path: "/transporte/taxi/:tipo",
                    name: "transporte-taxi",
                    component: () =>
                        import ("./divisoft/gonow/transporte/ob2535/wr2535.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Transporte", active: true }
                        ],
                        pageTitle: "Taxi", //Aquí va el nombre del menú
                        rule: "editor"
                    }
                },
                ////////////////////////////////////////////////////// 

                {
                    path: "/admin/dashboard",
                    name: "dashboard",
                    component: () =>
                        import ("./views/DashboardECommerce.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/admin/personas",
                    name: "personas",
                    component: () =>
                        import ("./divisoft/ob6001/wr6001.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Clientes", active: true }
                        ],
                        pageTitle: "Clientes",
                        rule: "editor"
                    }
                },

                {
                    path: "/admin/paises/:tipo",
                    name: "personas",
                    component: () =>
                        import ("./divisoft/ob6005/wr6005.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Paises", active: true }
                        ],
                        pageTitle: "Paises",
                        rule: "editor"
                    }
                },

                {
                    path: "/admin/pais",
                    name: "administracion-pais",
                    component: () =>
                        import ("./divisoft/gonow/administracion/ob2502/wr2502.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Administración", active: true }
                        ],
                        pageTitle: "Pais",
                        rule: "editor"
                    }
                },



                {
                    path: "/dashboard/ecommerce",
                    name: "dashboard-ecommerce",
                    component: () =>
                        import ("./views/DashboardECommerce.vue"),
                    meta: {
                        rule: "admin"
                    }
                },

                // =============================================================================
                // Application Routes
                // =============================================================================

                {
                    path: "/divisoft/notificaChat",
                    component: () =>
                        import ("./divisoft/NotificacionGeneral.vue"),
                    meta: {
                        rule: "editor",
                        parent: "email",
                        no_scroll: true
                    }
                },



                {
                    path: "/apps/chat/:contactId",
                    name: "chat",
                    component: () =>
                        import ("./views/apps/chat/Chat.vue"),
                    beforeEnter(from, to, next) {
                        if (!Vue.prototype.$socket) {
                            require("./plugins/socket-io");
                        }
                        next();
                    },
                    meta: {
                        rule: "editor",
                        no_scroll: true
                    }
                },

                {
                    path: '/sitioMensajeria',
                    beforeEnter() { location.href = 'Mensajeria' },
                    component: sitioMensajeria,

                    meta: {
                        rule: "editor",
                        no_scroll: true
                    }
                },


                {
                    path: "/clasificaPedido",
                    name: "ClasificaPedido",
                    component: () =>
                        import ("./views/apps/eCommerce/ECommerceWishList.vue"),
                    meta: {
                        rule: "editor",
                        no_scroll: true
                    }
                },
                {
                    path: "/apps/eCommerce/shop",
                    name: "ecommerce-shop",
                    component: () =>
                        import ("./views/apps/eCommerce/ECommerceShop.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "eCommerce" },
                            { title: "Shop", active: true }
                        ],
                        pageTitle: "Shop",
                        rule: "editor"
                    }
                },
                {
                    path: "/apps/eCommerce/wish-list",
                    name: "ecommerce-wish-list",
                    component: () =>
                        import ("./views/apps/eCommerce/ECommerceWishList.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "eCommerce", url: "/apps/eCommerce/shop" },
                            { title: "Wish List", active: true }
                        ],
                        pageTitle: "Wish List",
                        rule: "editor"
                    }
                },
                {
                    path: "/apps/eCommerce/checkout",
                    name: "ecommerce-checkout",
                    component: () =>
                        import ("./views/apps/eCommerce/ECommerceCheckout.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "eCommerce", url: "/apps/eCommerce/shop" },
                            { title: "Checkout", active: true }
                        ],
                        pageTitle: "Checkout",
                        rule: "editor"
                    }
                },
                /*
                          Below route is for demo purpose
                          You can use this route in your app
                            {
                                path: '/apps/eCommerce/item/',
                                name: 'ecommerce-item-detail-view',
                                redirect: '/apps/eCommerce/shop',
                            }
                        */
                {
                    path: "/apps/eCommerce/item/",
                    redirect: "/apps/eCommerce/item/-99"
                },
                {
                    path: "/apps/eCommerce/item/:item_id",
                    name: "ecommerce-item-detail-view",
                    component: () =>
                        import ("./views/apps/eCommerce/ECommerceItemDetailView.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "eCommerce" },
                            { title: "Shop", url: { name: "ecommerce-shop" } },
                            { title: "Item Details", active: true }
                        ],
                        parent: "ecommerce-item-detail-view",
                        pageTitle: "Item Details",
                        rule: "editor"
                    }
                },
                {
                    path: "/apps/user/user-list",
                    name: "app-user-list",
                    component: () =>
                        import ("@/views/apps/user/user-list/UserList.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "User" },
                            { title: "List", active: true }
                        ],
                        pageTitle: "User List",
                        rule: "editor"
                    }
                },
                {
                    path: "/apps/user/user-view/:userId",
                    name: "app-user-view",
                    component: () =>
                        import ("@/views/apps/user/UserView.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Inicio", url: "/" },
                            { title: "Usuario" },
                            { title: "Perfil", active: true }
                        ],
                        pageTitle: "Perfil Usuario",
                        rule: "editor"
                    }
                },
                {
                    path: "/apps/user/user-edit/:userId",
                    name: "app-user-edit",
                    component: () =>
                        import ("@/views/apps/user/user-edit/UserEdit.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "User" },
                            { title: "Edit", active: true }
                        ],
                        pageTitle: "User Edit",
                        rule: "editor"
                    }
                },






                // =============================================================================
                // Pages Routes
                // =============================================================================
                {
                    path: "/pages/profile",
                    name: "page-profile",
                    component: () =>
                        import ("@/views/pages/Profile.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Páginas" },
                            { title: "Quienes Somos", active: true }
                        ],
                        pageTitle: "Quienes Somos",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/user-settings",
                    name: "page-user-settings",
                    component: () =>
                        import ("@/views/pages/user-settings/UserSettings.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "User Settings", active: true }
                        ],
                        pageTitle: "Settings",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/faq",
                    name: "page-faq",
                    component: () =>
                        import ("@/views/pages/Faq.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "FAQ", active: true }
                        ],
                        pageTitle: "FAQ",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/knowledge-base",
                    name: "page-knowledge-base",
                    component: () =>
                        import ("@/views/pages/KnowledgeBase.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "KnowledgeBase", active: true }
                        ],
                        pageTitle: "KnowledgeBase",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/knowledge-base/category",
                    name: "page-knowledge-base-category",
                    component: () =>
                        import ("@/views/pages/KnowledgeBaseCategory.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "KnowledgeBase", url: "/pages/knowledge-base" },
                            { title: "Category", active: true }
                        ],
                        parent: "page-knowledge-base",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/knowledge-base/category/question",
                    name: "page-knowledge-base-category-question",
                    component: () =>
                        import ("@/views/pages/KnowledgeBaseCategoryQuestion.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "KnowledgeBase", url: "/pages/knowledge-base" },
                            { title: "Category", url: "/pages/knowledge-base/category" },
                            { title: "Question", active: true }
                        ],
                        parent: "page-knowledge-base",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/procesoExitoso",
                    name: "page-search",
                    component: () =>
                        import ("@/views/pages/procesoExitoso.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "Search", active: true }
                        ],
                        pageTitle: "Search",
                        rule: "editor"
                    }

                },
                {
                    path: "/pages/search",
                    name: "page-search",
                    component: () =>
                        import ("@/views/pages/Search.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "Search", active: true }
                        ],
                        pageTitle: "Search",
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/invoice",
                    name: "page-invoice",
                    component: () =>
                        import ("@/views/pages/Invoice.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Pages" },
                            { title: "Invoice", active: true }
                        ],
                        pageTitle: "Invoice",
                        rule: "editor"
                    }
                },

                // =============================================================================
                // CHARTS & MAPS
                // =============================================================================
                {
                    path: "/charts-and-maps/charts/apex-charts",
                    name: "extra-component-charts-apex-charts",
                    component: () =>
                        import ("@/views/charts-and-maps/charts/apex-charts/ApexCharts.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Charts & Maps" },
                            { title: "Apex Charts", active: true }
                        ],
                        pageTitle: "Apex Charts",
                        rule: "editor"
                    }
                },
                {
                    path: "/charts-and-maps/charts/chartjs",
                    name: "extra-component-charts-chartjs",
                    component: () =>
                        import ("@/views/charts-and-maps/charts/chartjs/Chartjs.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Charts & Maps" },
                            { title: "chartjs", active: true }
                        ],
                        pageTitle: "chartjs",
                        rule: "editor"
                    }
                },
                {
                    path: "/charts-and-maps/charts/echarts",
                    name: "extra-component-charts-echarts",
                    component: () =>
                        import ("@/views/charts-and-maps/charts/echarts/Echarts.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Charts & Maps" },
                            { title: "echarts", active: true }
                        ],
                        pageTitle: "echarts",
                        rule: "editor"
                    }
                },
                {
                    path: "/charts-and-maps/maps/google-map",
                    name: "extra-component-maps-google-map",
                    component: () =>
                        import ("@/views/charts-and-maps/maps/google-map/GoogleMap.vue"),
                    meta: {
                        breadcrumb: [
                            { title: "Home", url: "/" },
                            { title: "Charts & Maps" },
                            { title: "Google Map", active: true }
                        ],
                        pageTitle: "Google Map",
                        rule: "editor"
                    }
                },


            ]
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: "",
            component: () =>
                import ("@/layouts/full-page/FullPage.vue"),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: "/callback",
                    name: "auth-callback",
                    component: () =>
                        import ("@/views/Callback.vue"),
                    meta: {
                        rule: "editor"
                    }
                },





                {
                    path: "/pages/login",
                    name: "page-login",
                    component: () =>
                        import ("@/views/pages/login/Login.vue"),
                    meta: {
                        rule: "editor"
                    }
                },

                {
                    path: "/pages/forgot-password",
                    name: "page-forgot-password",
                    component: () =>
                        import ("@/views/pages/login/OlvidarClave.vue"),
                    meta: {
                        rule: "editor"
                    }
                },

                {
                    path: "/pages/reset-password/:KEY",
                    name: "page-reset-password",
                    component: () =>
                        import ("@/views/pages/ResetPassword.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/lock-screen",
                    name: "page-lock-screen",
                    component: () =>
                        import ("@/views/pages/LockScreen.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/comingsoon",
                    name: "page-coming-soon",
                    component: () =>
                        import ("@/views/pages/ComingSoon.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/error-404",
                    name: "page-error-404",
                    component: () =>
                        import ("@/views/pages/Error404.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/error-500",
                    name: "page-error-500",
                    component: () =>
                        import ("@/views/pages/Error500.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/not-authorized",
                    name: "page-not-authorized",
                    component: () =>
                        import ("@/views/pages/NotAuthorized.vue"),
                    meta: {
                        rule: "editor"
                    }
                },
                {
                    path: "/pages/maintenance",
                    name: "page-maintenance",
                    component: () =>
                        import ("@/views/pages/Maintenance.vue"),
                    meta: {
                        rule: "editor"
                    }
                }
            ]
        },

    ]
});

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

router.beforeEach((to, from, next) => {
    return next();
});

export default router;