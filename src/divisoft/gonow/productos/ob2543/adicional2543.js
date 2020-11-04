
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_SHOPRODUCTOHASHTAG',
                    name: 'GO_SHOPRODUCTOHASHTAG',
                    component: () => import('./divisoft/ob2543/wr2543.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_SHOPRODUCTOHASHTAG' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_SHOPRODUCTOHASHTAG" ,
                slug: "GO_SHOPRODUCTOHASHTAG",
                name: "GO_SHOPRODUCTOHASHTAG",
                icon: "UserIcon",
                i18n: "obj2543",
              },  
               