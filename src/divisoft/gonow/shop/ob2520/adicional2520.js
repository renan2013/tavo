
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_PATNER',
                    name: 'GO_PATNER',
                    component: () => import('./divisoft/ob2520/wr2520.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_PATNER' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_PATNER" ,
                slug: "GO_PATNER",
                name: "GO_PATNER",
                icon: "UserIcon",
                i18n: "obj2520",
              },  
               