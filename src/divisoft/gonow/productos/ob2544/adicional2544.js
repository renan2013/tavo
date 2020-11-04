
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_CATEGORIAPRODUCTOS',
                    name: 'GO_CATEGORIAPRODUCTOS',
                    component: () => import('./divisoft/ob2544/wr2544.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_CATEGORIAPRODUCTOS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_CATEGORIAPRODUCTOS" ,
                slug: "GO_CATEGORIAPRODUCTOS",
                name: "GO_CATEGORIAPRODUCTOS",
                icon: "UserIcon",
                i18n: "obj2544",
              },  
               