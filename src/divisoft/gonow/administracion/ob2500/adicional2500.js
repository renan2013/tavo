
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_COMPANIA',
                    name: 'GO_COMPANIA',
                    component: () => import('./divisoft/ob2500/wr2500.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_COMPANIA' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_COMPANIA" ,
                slug: "GO_COMPANIA",
                name: "GO_COMPANIA",
                icon: "UserIcon",
                i18n: "obj2500",
              },  
               