
         // seccion de  PARA AGREGAR EN  ROUTER 
       
          { 

                    path: '/Modulo/GO_ZONAS',
                    name: 'GO_ZONAS',
                    component: () => import('./divisoft/ob2501/wr2501.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/'},
                            { title: 'GO_ZONAS' },
                            { title: 'Principal', active: true },
                        ],
                        pageTitle: 'Principal',
                        rule: 'editor'
                    },
                }, 
                
                /// FIN DE ROUTER
               
        //  SECCION DEL MENU 
           {
                url: "/Modulo/GO_ZONAS" ,
                slug: "GO_ZONAS",
                name: "GO_ZONAS",
                icon: "UserIcon",
                i18n: "obj2501",
              },  
               