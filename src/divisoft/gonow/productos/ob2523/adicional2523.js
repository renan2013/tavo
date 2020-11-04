
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_SHOPRANGOPRECIOS',
                    name: 'GO_SHOPRANGOPRECIOS',
                    component: () => import('./divisoft/ob2523/wr2523.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_SHOPRANGOPRECIOS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_SHOPRANGOPRECIOS" ,
                slug: "GO_SHOPRANGOPRECIOS",
                name: "GO_SHOPRANGOPRECIOS",
                icon: "UserIcon",
                i18n: "obj2523",
              },  
               