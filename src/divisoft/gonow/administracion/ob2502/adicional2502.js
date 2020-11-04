
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_PAISES',
                    name: 'GO_PAISES',
                    component: () => import('./divisoft/ob2502/wr2502.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_PAISES' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_PAISES" ,
                slug: "GO_PAISES",
                name: "GO_PAISES",
                icon: "UserIcon",
                i18n: "obj2502",
              },  
               