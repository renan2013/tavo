
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_TARJETAS',
                    name: 'GO_TARJETAS',
                    component: () => import('./divisoft/ob2514/wr2514.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_TARJETAS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_TARJETAS" ,
                slug: "GO_TARJETAS",
                name: "GO_TARJETAS",
                icon: "UserIcon",
                i18n: "obj2514",
              },  
               