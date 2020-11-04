
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_SHOPCATEGORIA',
                    name: 'GO_SHOPCATEGORIA',
                    component: () => import('./divisoft/ob2526/wr2526.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_SHOPCATEGORIA' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_SHOPCATEGORIA" ,
                slug: "GO_SHOPCATEGORIA",
                name: "GO_SHOPCATEGORIA",
                icon: "UserIcon",
                i18n: "obj2526",
              },  
               