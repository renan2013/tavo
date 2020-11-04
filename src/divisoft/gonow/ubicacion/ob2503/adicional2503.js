
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_PROVINCIAS',
                    name: 'GO_PROVINCIAS',
                    component: () => import('./divisoft/ob2503/wr2503.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_PROVINCIAS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_PROVINCIAS" ,
                slug: "GO_PROVINCIAS",
                name: "GO_PROVINCIAS",
                icon: "UserIcon",
                i18n: "obj2503",
              },  
               