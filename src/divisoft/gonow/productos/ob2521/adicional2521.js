
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_SHOPPRODUCTOS',
                    name: 'GO_SHOPPRODUCTOS',
                    component: () => import('./divisoft/ob2521/wr2521.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_SHOPPRODUCTOS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_SHOPPRODUCTOS" ,
                slug: "GO_SHOPPRODUCTOS",
                name: "GO_SHOPPRODUCTOS",
                icon: "UserIcon",
                i18n: "obj2521",
              },  
               