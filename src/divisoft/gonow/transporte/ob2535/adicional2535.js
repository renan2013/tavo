
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_TAXI',
                    name: 'GO_TAXI',
                    component: () => import('./divisoft/ob2535/wr2535.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_TAXI' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_TAXI" ,
                slug: "GO_TAXI",
                name: "GO_TAXI",
                icon: "UserIcon",
                i18n: "obj2535",
              },  
               