
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_TAXES',
                    name: 'GO_TAXES',
                    component: () => import('./divisoft/ob2518/wr2518.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_TAXES' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_TAXES" ,
                slug: "GO_TAXES",
                name: "GO_TAXES",
                icon: "UserIcon",
                i18n: "obj2518",
              },  
               