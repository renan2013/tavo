
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_ZONADETALLE',
                    name: 'GO_ZONADETALLE',
                    component: () => import('./divisoft/ob2508/wr2508.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_ZONADETALLE' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_ZONADETALLE" ,
                slug: "GO_ZONADETALLE",
                name: "GO_ZONADETALLE",
                icon: "UserIcon",
                i18n: "obj2508",
              },  
               